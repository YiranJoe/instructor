// A express server, which will handle api requests coming in and respond back with a json object, it will use body parser as well as cors
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-nysYocEzsu4uA0e798cMCS1F",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const {message} = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are a medical instructor and answer the following question or giving suggestion to the statement from a patient with detailed advices.
        instructor: Hello, how can I help you today?
        patient: ${message}?
        instructor:`
        ,
        max_tokens: 500,
        temperature: 0.8,
     });
     console.log(response.data)
     if(response.data.choices[0].text){
        res.json({
            message: response.data.choices[0].text
        });
     }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);