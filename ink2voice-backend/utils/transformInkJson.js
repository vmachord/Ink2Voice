const fs = require('fs');

function transformInkJson(filePath) {
  let rawData = fs.readFileSync(filePath, 'utf8');
  rawData = rawData.replace(/^\uFEFF/, '').trim();

  let source;
  try {
    source = JSON.parse(rawData);
  } catch (e) {
    console.error('❌ Error al parsear JSON original:', e.message);
    throw new Error('JSON inválido generado por inklecate');
  }

  const output = {};
  const root = source.root;

  // 1. Procesar nodo inicial ("root")
  const introNode = Array.isArray(root[0][0]) ? root[0].flat() : root[0];
  const introText = findText(introNode);
  const introOptions = extractChoices(introNode);
  output["root"] = { text: introText, options: introOptions };

  // 2. Procesar nodos nombrados
  const namedNodes = root[root.length - 1];
  for (const key in namedNodes) {
    const nodeContent = namedNodes[key];
    const flatContent = Array.isArray(nodeContent[0]) ? nodeContent.flat() : nodeContent;
    const text = findText(flatContent);
    const options = extractChoices(flatContent);
    output[key] = { text, options };
  }

  return output;
}

function findText(content) {
  if (!Array.isArray(content)) return '';
  let result = '';

  for (const item of content) {
    if (typeof item === 'string' && item.startsWith('^')) {
      result += item.slice(1).trim() + ' ';
    } else if (Array.isArray(item)) {
      result += findText(item) + ' ';
    } else if (typeof item === 'object' && item !== null && item.s) {
      for (const sItem of item.s) {
        if (typeof sItem === 'string' && sItem.startsWith('^')) {
          result += sItem.slice(1).trim() + ' ';
        }
      }
    }
  }

  return result.trim();
}

function extractChoices(content) {
  const options = {};
  if (!Array.isArray(content)) return options;

  // Buscar bloque de opciones tipo c-0, c-1, ...
  const choiceBlock = content.find(
    el => typeof el === 'object' && el !== null && Object.keys(el).some(k => k.startsWith('c-'))
  );

  if (choiceBlock) {
    // Recoger los textos de las elecciones (ordenados)
    const labels = [];

    for (const section of content) {
      if (Array.isArray(section)) {
        for (const item of section) {
          if (item && typeof item === 'object' && item.s && Array.isArray(item.s)) {
            const labelRaw = item.s.find(x => typeof x === 'string' && x.startsWith('^'));
            if (labelRaw) {
              labels.push(labelRaw.slice(1).trim().toLowerCase());
            }
          }
        }
      }
    }

    const keys = Object.keys(choiceBlock).filter(k => k.startsWith('c-'));

    keys.forEach((key, idx) => {
      const choiceArray = choiceBlock[key];
      if (!Array.isArray(choiceArray)) return;

      const destObj = choiceArray.find(
        el => el &&
          typeof el === 'object' &&
          typeof el['->'] === 'string' &&
          !el['->'].startsWith('0.') &&
          !el['->'].includes('.')
      );

      const label = labels[idx];
      const target = destObj?.['->'];

      if (label && target) {
        options[label] = target;
      }
    });

  } else {
    // No hay opciones explícitas, buscar transición directa tipo {"->": "XYZ"}
    const directGoto = content.find(
      el => el && typeof el === 'object' && typeof el['->'] === 'string'
    );
    if (directGoto && directGoto['->']) {
      options["continue"] = directGoto['->'];
    }
  }

  return options;
}


module.exports = { transformInkJson };
