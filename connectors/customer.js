/*******************************************************
 * service: bigco customer management
 * module: customer connector
 * Mike Amundsen (@mamund)
 *******************************************************/

// handles HTTP resource operations 
var customer = require('./../components/customer.js');
var utils = require('./utils.js');
var wstl = require('./../wstl.js');

var gTitle = "BigCo Customers";
var pathMatch = new RegExp('^\/customers\/.*','i');

var name = "customer";
var props = [
    "id",
    "givenName",
    "familyName",
    "emailAddress",
    "phoneNumber"
];
var reqd = [
    "givenName",
    "familyName",
    "emailAddress"
];

var conn = {name:name, props:props, reqd:reqd};

var actions = [
  {name:"dashboard",href:"/",rel:["home", "dashboard"]},
  {name:"listCustomers",href:"/customers/",rel:["list", "customer", "collection","listCustomer"]},
  {name:"filterCustomers",href:"/customers/",rel:["list", "customer", "collection", "filterCustomer"]},
  {name:"createCustomer",href:"/customers/",rel:["create", "customer","createCustomer"]}
];

exports.path = pathMatch;
exports.run = main;
exports.name = name;
exports.props = props;
exports.reqd = reqd;

function main(req, res, parts, respond) {

  console.log("customer");

  switch (req.method) {
  case 'GET':
    sendPage(req, res, respond);
    break;
  case 'POST':
    acceptEntry(req, res, respond);
    break;  
  default:
    respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
    break;
  }
}

function acceptEntry(req, res, respond) {
  var body, doc, msg;

  console.log("acceptEntry");

  body = '';
  
  // collect body
  req.on('data', function(chunk) {
    body += chunk;
  });

  // process body
  req.on('end', function() {
    try {
      console.log("body: "+body);
      console.log("headers: " + req.headers["content-type"]);
      console.log("conn: " + conn);
      msg = utils.parseBody(body, req.headers["content-type"]);
      //doc = customer('add', msg);
      doc = customer({conn:conn,action:"add",item:msg});
      if(doc && doc.type==='error') {
        doc = utils.errorResponse(req, res, doc.message, doc.code);
      }
    } 
    catch (ex) {
      doc = utils.errorResponse(req, res, 'Server Error', 500);
    }

    if (!doc) {
      respond(req, res, {code:301, doc:"", 
        headers:{'location':'//'+req.headers.host+"/"}
      });
    } 
    else {
      respond(req, res, {code:301, doc:doc, 
        headers:{'location':'//'+req.headers.host+"/find/?id="+doc.id}
      });
    }
  });
}

function sendPage(req, res, respond) {
  var doc, coll, root, data, related, content;

  root = 'http://'+req.headers.host;
  coll = [];
  data = [];
  related = {};
  content = "";

  // append current root and load actions
  for(var i=0,x=actions.length;i<x;i++) {
    actions[i].root = root;
    coll = wstl.append(actions[i],coll);
  }  

  content =  "";
 
  data = customer({conn:conn,action:"list"});
 
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
      customer : doc
    }
  });
  
}

// EOF

