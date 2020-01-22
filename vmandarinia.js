var express = require('express');
var http = require('http');

var vmandarinia = express();

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({

  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: process.env["ASSISTANT_APIKEY"],
  }),
  url: process.env["ASSISTANT_URL"],
});

//  authenticator: new IamAuthenticator({
//    apikey: process.env["ASSISTANT_APIKEY"],
//    url: process.env["ASSISTANT_URL"],
//    version: '2019-02-28'
//  })
//});

vmandarinia.get('/', function (req, res){
  http.res("ciao!")
  assistant.message(
  {
    input: { text: "What's the weather?" },
    assistantId: '<assistant id>',
    sessionId: '<session id>',
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  });
});

vmandarinia.listen(3000)
console.log(process.env["ASSISTANT_APIKEY"])
