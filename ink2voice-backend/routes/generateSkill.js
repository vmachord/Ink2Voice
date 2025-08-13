const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { generateAlexaSkillProject } = require('../utils/skillBuilder');

router.post('/', async (req, res) => {
  const { storyJson, skillName, invocationName, languageCode } = req.body;

  if (!storyJson || !skillName || !invocationName || !languageCode) {
    return res.status(400).json({ error: 'Missing story JSON, skill name, invocation name, or language code' });
  }

  try {
    const skillPath = await generateAlexaSkillProject(storyJson, skillName, invocationName, languageCode);
    return res.json({ message: 'Skill generated successfully', skillPath });
  } catch (err) {
    console.error('Error generating skill:', err.message);
    return res.status(500).json({ error: 'Failed to generate skill' });
  }
});

module.exports = router;

