/*******************************************************
 * service: bigco customer management
 * module: customer connector
 * Mike Amundsen (@mamund)
 *******************************************************/

var qs = require('querystring');

// handles HTTP resource operations 
var resource = require('./../resources/customer.js');
var component = require('./../simple-component.js');
var utils = require('./utils.js');
var wstl = require('./../wstl.js');

var title = resource.title||"BigCo Customers";
var pathMatch = resource.path; //new RegExp('^\/customers\/.*','i');

var name = resource.name;
var props = resource.props||[];
var reqd = resource.reqd||[];
var methods = resource.methods||"";
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
  var filter, id;

  switch (req.method) {
  case 'GET':
    if(methods.indexOf("GET")!==-1) {
      if(parts.length>1) {
        if(parts[1].indexOf('?')!==-1) {
          filter = qs.parse(parts[1].substring(1));
          sendPage(req, res, respond, filter);
        }
        else {
          id = parts[1];
          sendItem(req, res, respond, id);
        }
      }
      else {
        if(parts.length===1) {  
          sendPage(req, res, respond);
        }
        else {
          respond(req, res, utils.errorResponse(req, res, 'File Not Found', 404));
        }
      }
    } else {
      respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
    }
    break;
  case 'POST':
    if(methods.indexOf("POST")!==-1) {
      acceptEntry(req, res, respond);
    } else {
      respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
    }
    break;  
  case "PUT":
    if(methods.indexOf("PUT")!==-1) {
      updateEntry(req, res, respond);
    } else {
      respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
    }
    break; 
  case "DELETE":
    if(methods.indexOf("DELETE")!==-1) {
      removeEntry(req, res, respond);
    } else {
      respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
    }
    break; 
  default:
    respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
    break;
  }
}

function acceptEntry(req, res, respond) {
  var body, doc, msg;

  body = '';
  
  // collect body
  req.on('data', function(chunk) {
    body += chunk;
  });

  // process body
  req.on('end', function() {
    try {
      msg = utils.parseBody(body, req.headers["content-type"]);
      doc = component({conn:conn, action:"add", item:msg});
      if(doc && doc.type==='error') {
        doc = utils.errorResponse(req, res, doc.message, doc.code);
      }
    } 
    catch (ex) {
      doc = utils.errorResponse(req, res, 'Server Error', 500);
    }

    console.log(doc);

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

function updateEntry(req, res, respond) {
  var body, doc, msg;

  body = '';
  
  // collect body
  req.on('data', function(chunk) {
    body += chunk;
  });

  // process body
  req.on('end', function() {
    try {
      msg = utils.parseBody(body, req.headers["content-type"]);
      doc = component({conn:conn, action:"update", id, item:msg});
      if(doc && doc.type==='error') {
        doc = utils.errorResponse(req, res, doc.message, doc.code);
      }
    } 
    catch (ex) {
      doc = utils.errorResponse(req, res, 'Server Error', 500);
    }

    console.log(doc);

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

function sendItem(req, res, respond, id) {
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

  data = component({conn:conn,action:"list"});
 
  // compose graph 
  doc = {};
  doc.title = title;
  doc.data =  data;
  doc.actions = coll;
  doc.content = content;
  doc.related = related;

  // send the graph
  respond(req, res, {
    code : 200,
    doc : {
      [resource.name] : doc
    }
  });
}

function sendPage(req, res, respond, filter) {
  var doc, coll, root, data, related, content;
  var cmd;

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

  if(filter) {
    cmd = "filter";
  } else {
    cmd = "list";
  }
  data = component({conn:conn,action:cmd, filter:filter});
 
  // compose graph 
  doc = {};
  doc.title = title;
  doc.data =  data;
  doc.actions = coll;
  doc.content = content;
  doc.related = related;

  // send the graph
  respond(req, res, {
    code : 200,
    doc : {
      [resource.name] : doc
    }
  });
  
}

// EOF

