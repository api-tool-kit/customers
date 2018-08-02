/*******************************************************
 * service: bigco customer management
 * module: representor router
 * Mike Amundsen (@mamund)
 *******************************************************/

// handles internal representation routing (based on conneg)

// load representors
var json = require('./representors/json.js');
var html = require('./representors/html.js');
var wstljson = require('./representors/wstljson.js');

var defaultFormat = "text/html";

module.exports = main;

function main(object, mimeType, root) {
  var doc;

  if (!mimeType) {
    mimeType = defaultFormat;
  }
  
  // dispatch to requested representor (or default)
  switch (mimeType.toLowerCase()) {
    case "application/vnd.wstl+json":
      doc = wstljson(object, root);
      break;
    case "application/json":
      doc = json(object, root);
      break;
    default:
      doc = json(object, root);  
      break;
  }

  return doc;
}

// EOF

