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
    target : "link page",
    prompt : "Customers"
  },
  {
    name : "listCustomers",
    type : "safe",
    action : "read",
    kind : "customer",
    target : "link page item",
    prompt : "Customer List"
  }
]; 

module.exports = wstl;
