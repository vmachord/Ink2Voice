const express = require('express');
const cors = require('cors');
const convertRoute = require('./routes/convert');
const generateSkillRoute = require('./routes/generateSkill'); 
const generateGraphRoute = require('./routes/graphRoute');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); 

app.use('/convert', convertRoute);
app.use('/generate-skill', generateSkillRoute); 
app.use('/generate-graph', generateGraphRoute);

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
