const mysql = require("mysql");

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs_users",
    port: 3306
}

module.exports = (query) => {
    const db = mysql.createConnection(dbConfig)

    return new Promise((resolve, reject) => {
        db.connect((connError) => {
            if (connError) {
                console.log("Database error: ", connError)
                reject(connError)
            } else {
                db.query(query, (queryError, results, fields) => {
                    if(queryError){
                        console.log("Query error: ", queryError)
                        reject(queryError)
                    } else{ 
                        resolve(results)
                        return results
                    }
                })
            }
        })
    })
}

//alternative to createConnection
// module.exports = (query) => {
//     const db = mysql.createPool(dbConfig)

//     return new Promise((resolve, reject) => {
//         db.getConnection((connError, sqlConn) => {
//             if (connError) {
//                 console.log("Database error: ", connError)
//                 reject(connError)
//             } else {
//                 sqlConn.query(query, (queryError, results, fields) => {
//                     if(queryError){
//                         console.log("Query error: ", queryError)
//                         reject(queryError)
//                     } else{ 
//                         resolve(results)
//                         return results
//                     }
//                 })
//                 sqlConn.release();
//             }
//         })
//     })
// }