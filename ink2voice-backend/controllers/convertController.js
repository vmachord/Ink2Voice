const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { transformInkJson } = require('../utils/transformInkJson'); 

exports.convertInk = (req, res) => {
  const inkFile = req.file;

  if (!inkFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const outputPath = path.join(
    __dirname,
    '../uploads',
    `${path.parse(inkFile.originalname).name}.json`
  );

  console.log('Ejecutando inklecate con --export-json...');
  const command = `inklecate --export-json -o "${outputPath}" "${inkFile.path}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error al ejecutar inklecate:', stderr);
      return res.status(500).json({ error: 'Error al convertir el archivo Ink.' });
    }

    try {
      console.log('✅ Ejecutado inklecate, procesando JSON...');
      const transformed = transformInkJson(outputPath);

      return res.json({
        message: 'Conversión exitosa',
        data: transformed,
      });
    } catch (parseErr) {
      console.error('❌ Error al procesar JSON:', parseErr.message);
      return res.status(500).json({ error: 'El archivo generado no es un JSON válido.' });
    }
  });
};

