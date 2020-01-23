var express = require('express');
var http = require('http');

var vmandarinia = express();

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
var IDSession="";

const assistant = new AssistantV2({

  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: process.env["ASSISTANT_APIKEY"],
  }),
  url: process.env["ASSISTANT_URL"],
});

assistant.createSession({
  assistantId: process.env["ASSISTANT_ID"]
})
  .then(res => {
   // IDSession= JSON.stringify(res, null, 2);
    console .log("**********************************");
    console.log(JSON.stringify(res, null, 2));
    console .log("**********************************");
    IDSession=JSON.stringify(res.result.session_id, null, 2);
    assistant.message({
      assistantId: process.env["ASSISTANT_ID"],
      sessionId: (IDSession.split('"'))[1],
      input: {
        'message_type': 'text',
        'text': 'Ciao'
        }
      })
      .then(res => {
        console.log(JSON.stringify(res, null, 2));
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });