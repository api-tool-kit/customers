/*******************************************************
 * json  with links representor (server)
 * Mike Amundsen (@mamund)
 *******************************************************/

// json representor with naked links
// include any data plus any named links
module.exports = json;

function json(object) {
  var i, x;
  var response = {};
  
  for (var p in object) {
    if(p==="error") {
       response = object;
    }
    else {
      response[p] = {};
      if(object.title) {
        response[p].title = object.title;
      }
      if(object.content) {
        response[p].content = object.content;
      }
      if(object[p].actions) {
        response[p].actions = processActions(object[p].actions);
      }
      if(object[p].data) {
        response[p].data = object[p].data;
      }
    }
  }

  return JSON.stringify(response, null, 2);
}

// process any action link
function processActions(obj) {
  var rtn = [];
  var i, x, tmp;
  
  for(i=0,x = obj.length;i<x;i++) {
    tmp = {
      name:obj[i].name||"link"+i, 
      prompt:obj[i].prompt||obj[i].name, 
      href:obj[i].href||"#", 
      rel:obj[i].rel||[]
    };
    rtn.push(tmp);
  }
  return rtn;
}

