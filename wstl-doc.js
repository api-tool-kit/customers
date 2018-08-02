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
  },
  {
    name : "filterCustomers",
    type : "safe",
    action : "read",
    kind : "customer",
    target : "link page item",
    prompt : "Filter Customers",
    inputs : [
      {name: "familyName", prompt: "Last Name", value: ""},
      {name: "emailAddress", prompt: "Email", value:""}
    ]
  },
  {
    name : "readCustomer",
    type : "safe",
    action : "read",
    kind : "customer",
    target : "link item",
    prompt : "Read Customer",
    inputs : [
      {name: "id", prompt: "ID", value:"",required:true}
    ]
  },
  {
    name : "createCustomer",
    type : "unsafe",
    action : "add",
    kind : "customer",
    target : "link page",
    prompt : "Create Customer",
    inputs : [
      {name: "givenName", prompt: "First Name", value:"", required:true},
      {name: "familyName", prompt: "Last Name", value:"", required:true},
      {name: "emailAddress", prompt: "Email", value:"",required:true},
      {name: "phoneNumber", prompt:"Phone", value:""}
    ]
  },
  {
    name : "modifyCustomer",
    type : "idempotent",
    action : "update"",
    kind : "customer",
    target : "link item",
    prompt : "Update Customer",
    inputs: [
      {name: "id", prompt: "ID", value:"", required:true},
      {name: "givenName", prompt:"First Name", value:"", required:true},
      {name: "familyName", prompt:"Last Name", value:"", required:true},
      {name: "emailAddress", prompt:"Email", value:"", required:true},
      {name: "phoneNumber", prompt:"Phone", value:""}
    ]
  },
  {
    name : "removeCustomer",
    type : "idempotent",
    action : "remove",
    kind : "customer",
    target : "link item",
    prompt : "Remove Customer",
    inputs : [
      {name: "id", prompt: "ID", value:"", required:true}
    ]
  }
]; 

module.exports = wstl;
