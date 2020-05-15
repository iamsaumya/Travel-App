let projectData = {};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('dist'));

app.get('/',function (req,res) {
    res.status(200).sendFile('dist/index.html');
});

app.post('/postData',function (req,res){
    projectData['to'] = req.body.to;
    projectData['from'] = req.body.from;
    projectData['temperature'] = req.body.temperature;
    projectData['weather_condition'] = req.body.weather_condition;
    projectData['daystogo'] = req.body.daystogo;
    projectData['cityImage']  = req.body.cityImage;
    projectData['date'] = req.body.date;

    res.send(projectData);
});

module.exports = app;