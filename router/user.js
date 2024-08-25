const router = require("express").Router();
const userController = require("../controllers/usercontrollers.js")

router.post('/users/register', (req, res) => userController.registUser(req, res));
router.post('/users/login', (req, res) => userController.login(req, res));
module.exports = router;