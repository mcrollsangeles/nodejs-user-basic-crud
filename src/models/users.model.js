const Connection = require('../database/connection')

//Constructor
const User = function(user) {
    this.fname = user.fname;
    this.lname = user.lname;
    this.address = user.address;
    this.postcode = user.postcode;
    this.phone = user.phone;
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
};

User.create = async (newUser, result) => {
    try{
        const verifyUsername = `SELECT id FROM users WHERE username='${newUser.username}'`;
        vrfy = await Connection(verifyUsername);
        if(vrfy.length > 0){
            result({ kind: "not_unique" }, null);
            return;
        }
        const query = `INSERT INTO users (fname, lname, address, postcode, phone, email, username, password)` + 
                      ` VALUES` +
                      `('${newUser.fname}', '${newUser.lname}', '${newUser.address}', '${newUser.postcode}', '${newUser.phone}', '${newUser.email}', '${newUser.username}', md5('${newUser.password}'))`;
        queryDetails = await Connection(query);
        newUser['user_id'] = queryDetails.insertId;
        result(false, { ...newUser });
        return;
    }catch(ex){
        console.log(ex);
        return true
    }
};

User.retrieve = async (id, result) => {
    try{
        let query = `SELECT * FROM users WHERE is_draft=0`;
        if(id != "all"){
            query += ` AND id='${id}'`;
        }
        result(false, await Connection(query));
        return;
    }catch(ex){
        console.log(ex);
        return true;
    }
};

User.updateById = async (id, user, result) => {
    const date = require('date-and-time')
    const dateNow = date.format(new Date(),'YYYY/MM/DD HH:mm:ss');
    try{
        const query = `UPDATE users SET fname='${user.fname}', lname='${user.lname}', address='${user.address}', postcode='${user.postcode}', phone='${user.phone}', email='${user.email}', last_updated='${dateNow}'` +
                      ` WHERE is_draft=0 AND id=${id}`;
        queryDetails = await Connection(query);
        if(queryDetails.affectedRows == 0){
            result({ kind: "not_found" }, null);
            return;
        }else{
            result(false, { user_id: id, ...user, last_updated: dateNow });
            return;
        }
    }catch(ex){
        console.log(ex);
        return true;
    }
};

User.deleteById = async (id, result) => {
    const date = require('date-and-time')
    const dateNow = date.format(new Date(),'YYYY/MM/DD HH:mm:ss');
    try{
        const query = `UPDATE users SET is_draft=1, last_updated='${dateNow}'` +
                      ` WHERE is_draft=0 AND id=${id}`;
        queryDetails = await Connection(query);
        if(queryDetails.affectedRows == 0){//can use changedRows as alternative
            result({ kind: "not_found" }, null);
            return;
        }else{
            result(false, { user_id: id, is_draft: 1, last_updated: dateNow });
            return;
        }
    }catch(ex){
        console.log(ex);
        return true;
    }
};

User.deleteByMultipleIds = async (ids, result) => {
    const date = require('date-and-time')
    const dateNow = date.format(new Date(),'YYYY/MM/DD HH:mm:ss');
    try{
        const query = `UPDATE users SET is_draft=1, last_updated='${dateNow}'` +
                      ` WHERE is_draft=0 AND id in (${ids})`;
        queryDetails = await Connection(query);
        if(queryDetails.affectedRows == 0){//can use changedRows as alternative
            result({ kind: "not_found" }, null);
            return;
        }else{
            result(false, { user_id: ids, is_draft: 1, last_updated: dateNow });
            return;
        }
    }catch(ex){
        console.log(ex);
        return true;
    }
};

module.exports = User;