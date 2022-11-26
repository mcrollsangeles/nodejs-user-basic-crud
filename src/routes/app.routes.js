module.exports = app => {
  const loginsr = require("../controllers/login.controller.js");
  const usersr = require("../controllers/users.controller.js");
  var router = require("express").Router();
  
  // Test API
  router.get("/", usersr.testPage);
  router.post("/login", loginsr.login);
  router.post("/user/create", usersr.create);
  router.get("/user/retrieve", usersr.retrieve);
  router.put("/user/update/:id", usersr.update);
  router.put("/user/delete/:id", usersr.delete);
  router.put("/user/deleteMultiple/:ids", usersr.deleteMultiple);
  
  app.use('/nodejs', router);
};