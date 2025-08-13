const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).json({ error: 'No data provided' });
    }

    let dot = 'digraph Historia {\n';

    for (const [key, value] of Object.entries(data)) {
        dot += `    ${key} [label="${key}"];\n`;

        for (const [optionText, target] of Object.entries(value.options || {})) {
            dot += `    ${key} -> ${target} [label="${optionText}"];\n`;
        }
    }

    dot += '}';

    return res.json({ dot });
});

module.exports = router;

