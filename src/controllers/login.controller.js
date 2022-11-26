const Login = require("../models/login.model.js");

exports.testPage = (req, res) => {
    res
        .status(200)
        .send({
            message: "Welcome to Test API"
        })
};

/* Authenticate Users */
exports.login = async (req, res) => {
    // check if there's data
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Missing username and/or password."
        });
    }
    const newLogin = new Login({
        username: req.body.username,
        password: req.body.password
    });
    //Save user in the db
    Login.authenticate(newLogin, (err, data) => {
        if (err) {
            if (err.kind == "not_match") {
                res.status(404).send({
                    message: 'Incorrect username or password.'
                });
            } else {
                res.status(500).send({
                    message: "An error occured while trying to login."
                });
            }
        } else {
            res.status(200).send(data);
        }
    });
};