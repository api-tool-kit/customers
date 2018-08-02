/*******************************************************
 * service: bigco customer records
 * module: home connector
 * Mike Amundsen (@mamund)
 *******************************************************/

// handles HTTP resource operations 
var wstl = require('./../wstl.js');
var utils = require('./utils.js');
var component = require('./../components/customers.js');

var gTitle = "BigCo Customer Management";
var pathMatch = new RegExp('^\/$','i');

var actions = [];

[
  {name:"dashboard",href:"/",rel:["home", "dashboard", "collection"]},
  {name:"customer",href:"/cusomers/",rel:["collection", "customer"]}
];

exports.path = pathMatch;
exports.run = main;


function main(req, res, parts, respond) {

  switch (req.method) {
  case 'GET':
    sendPage(req, res, respond);
    break;
  default:
    respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
    break;
  }
}

function sendPage(req, res, respond) {
  var doc, coll, root, data, related, content;

  root = 'http://'+req.headers.host;
  coll = [];
  data = [];
  related = {};
  content = "";

  // load dynamic data
  data = component('list');
  
  // append current root and load actions
  for(var i=0,x=actions.length;i<x;i++) {
    actions[i].root = root;
    coll = wstl.append(actions[i],coll);
  }
  
  // load static content
  content =  "";
  
  // compose graph 
  doc = {};
  doc.title = gTitle;
  doc.data =  data;
  doc.actions = coll;
  doc.content = content;
  doc.related = related;

  // send the graph
  respond(req, res, {
    code : 200,
    doc : {
      home : doc
    }
  });
  
}

// EOF

