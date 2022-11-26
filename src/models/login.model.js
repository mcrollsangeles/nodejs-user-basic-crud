const Connection = require('../database/connection')

//Constructor
const Login = function(login) {
    this.username = login.username;
    this.password = login.password;
};

Login.authenticate = async (data, result) => {
    const date = require('date-and-time')
    const dateNow = date.format(new Date(),'YYYY/MM/DD HH:mm:ss');
    try{
        try{
            const queryVerifyUser = `SELECT id,fname FROM users` +
                                    ` WHERE username='${data.username}' and password=md5('${data.password}')`;
            queryDetails = await Connection(queryVerifyUser);
            if(queryDetails.length > 0){
                const queryLastLogin = `UPDATE users SET last_login='${dateNow}'` +
                                       ` WHERE id=${queryDetails[0].id}`;
                await Connection(queryLastLogin);
                result(false, { message: 'Welcome '+queryDetails[0].fname+'!', last_login: dateNow });
                return;
            }else{
                result({ kind: "not_match" }, null);
                return;
            }
        }catch(ex){
            console.log(ex);
            return true;
        }
    }catch(ex){
        console.log(ex);
        return true;
    }
};

module.exports = Login;