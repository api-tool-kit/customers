/***********************************
 customer service westl document
 ***********************************/

var wstl = [
  {
    name : "dashboard",
    type : "safe",
    action : "read",
    kind : "customer",
    target : "link page",
    prompt : "Home"
  },
  {
    name : "customer",
    type : "safe",
    action : "read",
    kind : "customer",
    prompt : "Customers"
  }
]; 

module.exports = wstl;
