const QiwiToken = 'here toke for OAuth qiwi';
const qiwi = new require('node-qiwi-api').callbackApi(QiwiToken);
let searchUser = require('./binaryTree').searchUser;
const mysql = require('mysql2');
    const con = mysql.createConnection({
        host: "127.0.0.1",
        user: "il",
        database: "users",
        password: "il"
    });
    con.connect(function(err){
        if (err) {
            return console.error("Ошибка: " + err.message);
        }
        else{
            console.log("Подключение к серверу MySQL успешно установлено");
        }
    });
let addMoney = async (con, telegramId, amountMoney) => {
    
    let user = await searchUser(con, telegramId);
    
}