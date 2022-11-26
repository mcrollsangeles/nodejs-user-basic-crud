const User = require("../models/users.model.js");

exports.testPage = (req, res) => {
    res
        .status(200)
        .send({
            message: "Welcome to Test API"
        })
};

/* Creating new Users */
exports.create = async (req, res) => {
    //Check if there's a user data
    if (!req.body || !req.body.fname || !req.body.lname 
        || !req.body.username  || !req.body.password) {
        res.status(400).send({
            message: "Required field/s: fname, lname, username, password."
        });
    }
    //Create a user
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        postcode: req.body.postcode,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    //Save user in the db
    User.create(newUser, (err, data) => {
        if (err) {
            if (err.kind == "not_unique") {
                res.status(404).send({
                    message: 'Username "'+req.body.username+'" is not available.'
                });
            } else{
                res.status(500).send({
                    message: err.message || "An error occured while trying to create the user."
                });
            }
        } else {
            res.status(200).send(data);
        }
    });
};

/* Retrieving one or all user */ 
exports.retrieve = async (req, res) => {
    let userId = req.query.id;
    if(!userId){ //request with no id params will return all users
        userId = "all";
    }
    User.retrieve(userId, (err, data) => {
        if (err) {
            res.status(500).send({
                    message: err.message || "An error occured while retrieving users."
                });
        }
        else{
            if(data && data.length > 0){
                res.status(200).send(data);
            }else{
                res.status(200).send({
                        message: "No user found."
                    });
            }
            
        } 
    });
};

exports.update = async (req, res) => {
    //Validate Request
    if (!req.body || !req.body.fname || !req.body.lname) {
        res.status(400).send({
                message: "Required field/s: fname and lname."
            });
    }
    //Create a user
    const newUserData = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        postcode: req.body.postcode,
        phone: req.body.phone,
        email: req.body.email
    });
    User.updateById(req.params.id, newUserData, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: 'User with id '+req.params.id+' not found.'
                    });
                } else {
                    res.status(500).send({
                        message: "An error occured while updating the user with id " + req.params.id
                    });
                }
            } else {
                res.status(200).send(data);
            }
        }
    );
};

/* Delete a user */ 
exports.delete = async (req, res) => {
    User.deleteById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: 'User with id '+req.params.id+' not found.'
                    });
                } else {
                    res.status(500).send({
                        message: "An error occured while deleting the user with id " + req.params.id
                    });
                }
            } else {
                res.status(200).send(data);
            }
        }
    );
};

/* Delete multiple users */ 
exports.deleteMultiple = async (req, res) => {
    User.deleteByMultipleIds(req.params.ids, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: 'User/s with id '+req.params.ids+' not found.'
                    });
                } else {
                    res.status(500).send({
                        message: "An error occured while deleting the user/s with id " + req.params.ids
                    });
                }
            } else {
                res.status(200).send(data);
            }
        }
    );
};