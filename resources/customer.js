/******************************
 customers.js resrouce file
*******************************/

var title = "BigCo Customers";
var pathMatch = new RegExp('^\/customer\/.*','i');

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
var methods = "GET POST PUT DELETE";

var pageActions = [
  {name:"dashboard",href:"/",rel:["home", "dashboard"]},
  {name:"listCustomers",href:"/customer/",rel:["list", "customer", "collection","listCustomer"]},
  {name:"filterCustomers",href:"/customer/",rel:["list", "customer", "collection", "filterCustomer"]},
  {name:"createCustomer",href:"/customer/",rel:["create", "customer","createCustomer"]}
];

var itemActions = [
  {name:"readCustomer",href:"/customer/{id}",rel:["read", "customer", "item","readCustomer"]},
  {name:"modifyCustomer",href:"/customer/{id}",rel:["update","customer","item","updateCustomer"]},
  {name:"removeCustomer",href:"/customer/{id}",rel:["remove","customer","item","removeCustomer"]}
];

exports.name = name;
exports.title = title;
exports.path = pathMatch;
exports.props = props;
exports.reqd = reqd;
exports.methods = methods;
exports.pageActions = pageActions;
exports.itemActions = itemActions;


