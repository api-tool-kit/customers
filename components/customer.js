/*`******************************************************
 * registry middleware component (server)
 * Mike Amundsen (@mamund)
 *******************************************************/

var storage = require('./../simple-storage.js');
var utils = require('./../connectors/utils.js');
//var conn = require('./../connectors/customer.js');

module.exports = main;

// app-level actions for tasks
// args: conn, action, id, filter, item
//function main(action, args1, args2, args3) {
function main(args) {
  var name, rtn, props;
  var conn, action, id, filter, item;

  conn = args.conn||{};
  action = args.action||"list";
  id = args.id||"";
  filter = args.filter||"";
  item = args.item||{};

  console.log("conn: "+args.conn);
  
  elm = conn.name; //'customer';    
  props = conn.props; 
  /*
  [
    "id",
    "givenName",
    "familyName",
    "emailAddress",
    "phoneNumber"
  ];
  */
  reqd = conn.reqd;
  /*
  reqd = [
    "givenName",
    "familyName",
    "emailAddress"
  ];
  */

  switch (action) {
    case 'exists':
      rtn = (storage({object:elm, action:'item', id:id})===null?false:true);
      break;
    case 'props' :
      rtn = utils.setProps(item,props);
      break;  
    case 'profile':
      rtn = profile;
      break;
    case 'list':
      rtn = utils.cleanList(storage({object:elm, action:'list'}));
      break;
    case 'read':
      rtn = utils.cleanList(storage({object:elm, action:'item', id:id}));
      break;
    case 'filter':
      rtn = utils.cleanList(storage({object:elm, action:'filter', filter:filter}));
      break
    case 'add':
      rtn = addEntry(elm, item, props);
      break;
    case 'update':
      rtn = updateEntry(elm, id, item, props);
      break;
    case 'remove':
      rtn = removeEntry(elm, id);
      break;
    default:
      rtn = null;
      break;
  }
  return rtn;
}

function addEntry(elm, entry, props) {
  var rtn, item, error;
  
  item = {}
  for(i=0,x=props.length;i<x;i++) {
    if(props[i]!=="id") {
      item[props[i]] = (entry[props[i]]||"");
    }
  }

  error = "";
  for(i=0,x=reqd.length;i<x;i++) {
    if(item[reqd[i]]==="") {
      error += "Missing "+ reqd[i] + " ";
    }
  }

  if(error.length!==0) {
    rtn = utils.exception(error);
  }
  else {
    rtn = storage(
      {
        object:elm, 
        action:'add', 
        item:utils.setProps(item,props)
      }
    );
  }
  
  return rtn;
}

function updateEntry(elm, id, entry, props) {
  var rtn, check, item, error;

  check = storage({object:elm, action:'item', id:id});  
  if(check===null) {
    rtn = utils.exception("File Not Found", "No record on file", 404);
  }
  else {
    item = check;
    for(i=0,x=props.length; i<x; i++) {
      if(props[i]!=="id") {
        item[props[i]] = (entry[props[i]]===undefined?check[props[i]]:entry[props[i]]);
      }
    }
   
    error = "";
    for(i=0,x=reqd.length;i<x;i++) {
      if(item[reqd[i]]==="") {
        error += "Missing "+ reqd[i] + " ";
      }
    }
     
    if(error!=="") {
      rtn = utils.exception(error);
    } 
    else {
      rtn = storage(
        {
          object:elm, 
          action:'update', 
          id:id, 
          item:utils.setProps(item, props)
        }
      );
    }
  }
  
  return rtn;
}

function removeEntry(elm, id) {
  var rtn, check;
  
  check = storage({object:elm, action:'item', id:id});
  if(check===null) {
    rtn = utils.exception("File Not Found", "No record on file", 404);
  }
  else {
    storage({object:elm, action:'remove', id:id});
  }
  
  return rtn;
  
}
// EOF

