/*******************************************************
 * json  with forms representor (server)
 * Mike Amundsen (@mamund)
 *******************************************************/

var utils = require('./../connectors/utils.js');

// json representor with naked links
// include any data plus any named links
module.exports = json;

function json(object, root) {
  var i, x;
  var response = {};
  
  for (var p in object) {
    if(p==="error") {
      response = object;
    }
    else {
      response[p] = {};
      response.self = root;
      if(object.title) {
        response[p].title = object.title;
      }
      if(object.error) {
        response[p].error = object.error;
      }
      if(object.content) {
        response[p].content = object.content;
      }
      if(object[p].actions) {
        response[p].actions = processActions(object[p].actions);
      }
      if(object[p].data) {
        response[p].data = processData(object[p].data, root, p);
      }
    }
  }

  return JSON.stringify(response, null, 2);
}

// process any action link
function processActions(obj) {
  var rtn = [];
  var i, x, tmp;
  var j, y, prop;
  
  for(i=0,x = obj.length;i<x;i++) {
    tmp = {
      name:obj[i].name||"link"+i, 
      href:obj[i].href||"#", 
      rel:obj[i].rel||[],
      method:utils.actionMethod(obj[i].action)
    };
    // strip unwanted properties for inputs
    if(obj[i].inputs) {
      tmp.inputs = [];
      for(j=0,y=obj[i].inputs.length;j<y;j++) {
        prop = {};
        for(var name in obj[i].inputs[j]) {
          if(name!=="prompt") {
            prop[name] = obj[i].inputs[j][name];
          }
        }
        tmp.inputs.push(prop);
      } 
    }
    rtn.push(tmp);
  }
  return rtn;
}

// process any data elements
function processData(obj, root, p) {
  var rtn = [];
  var i, x, tmp;

  for(i=0,x=obj.length;i<x;i++) {
    tmp = {}
    tmp.href = root+"/"+p+"/"+obj[i].id;
    for(var name in obj[i]) {
      tmp[name] = obj[i][name];
    }
    rtn.push(tmp);
  }
  
  return rtn;
}
