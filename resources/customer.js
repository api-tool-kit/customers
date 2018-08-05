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
var methods = "GET POST";

exports.name = name;
exports.title = title;
exports.path = pathMatch;
exports.props = props;
exports.reqd = reqd;
exports.methods = methods;


