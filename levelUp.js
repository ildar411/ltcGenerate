const mysql = require('mysql2');
let getFather = require('./binaryTree').getFather;
let search = require('./binaryTree').searchUserBool;
let me = require('./binaryTree').searchUser;
let getChild = require('./binaryTree').getChild;
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
const entry = 700; //сумма входа в пирамиду
const levelUp2 = 1200;//сумма платежа на второй уровень
const levelUp3 = 4100;//сумма платежа на третий уровень
const levelUp4 = 28200;//сумма платежа на 4 уровень
const levelUp5 = 251000;//сумма платежа на 5 уровень
const levelUp6 = 6832000;
const levelUpArr = [1200, 4100, 28200, 251000, 6832000];
const waletLevel1 = 0;
const waletLevel2 = 200;
const waletLevel3 = 700;
const waletLevel4 = 4600;
const waletLevel5 = 200000;
const waletLevel6 = 1200000;
const waletLevel7 = 437248000;


let end = (con) => {
    con.end(function(err) {
        if (err) {
        return console.log("Ошибка: " + err.message);
        }
        console.log("Подключение закрыто");
    });
};
let levelUp = async (con, telegramId) => {
    let father = await getFather(con, telegramId);
    let level = 1;
    let walet = 0;
    let waletNominal = 0;
    let bool = await search(con, telegramId);
    let i = await me(con, telegramId);
    let sql1 = 'select * from user where pid=' + i.id;
    let length = 0;
    await con.promise().query(sql1)
    .then(([res, field]) => {
      length = res.length;
    });
    console.log('huilevelUP1');
    if(length == 2){
      level = 2;
      walet = waletLevel2;
      waletNominal = waletLevel2;
      father[0].walet_nominal = 2*entry;
      father[0].walet = 0;
      //father[0].walet = father[0].walet + levelUp2;
      await con.promise().query('UPDATE user walet, walet_nominal=? WHERE id=?',[father[0].walet, father[0].walet_nominal, father[0].id]);
      await father.map(async x => {
        console.log('huiLevelUp2')
        if(x != father[0]){
          let count = x.level;
          father[x.level+1].walet_nominal = father[x.level+1].walet_nominal + levelUpArr[x.level-1];
        //father[x.level+1].walet = father[x.level+1].walet + levelUpArr[x.level-1];
          let sql2 = 'UPDATE user SET walet_nominal=? WHERE id=?';
          let data = [x.walet_nominal, x.id];
          await con.promise().query(sql2, data);
        }
        
      });
    } 
    await father.map(async x => 
      {
          if(x.walet_nominal == 2*entry){
            x.level = 2;
            x.walet = waletLevel2;
          } else if (x.walet_nominal == 2*entry + 4*levelUp2){
            x.level = 3;
            x.walet = waletLevel3;
          } else if (x.walet_nominal == 2*entry + 4*levelUp2 + 8*levelUp3){
            x.level = 4;
            x.walet = waletLevel4;
          } else if (x.walet_nominal == 2*entry + 4*levelUp2 + 8*levelUp3 + 16*levelUp4){
            x.level = 5;
            x.walet = waletLevel5;
          } else if (x.walet_nominal == 2*entry + 4*levelUp2 + 8*levelUp3 + 16*levelUp4 + 32*levelUp5){
            x.level = 6;
            x.walet = waletLevel6;
          } else if (x.walet_nominal == 2*entry + 4*levelUp2 + 8*levelUp3 + 16*levelUp4 + 32*levelUp5 + 64*levelUp6){
            x.level = 7;
            x.walet = waletNominal7;
          }
          await con.promise().query('UPDATE user SET level=?, walet=? WHERE id=?', [x.level, x.walet, x.id]);
      }
    ); 
    console.log('huiLevelUp3');
    return 'https://t.me/node0210bot?start='+i.id;//здесь укажи акктуальное имя бота на данный момент это node0210
};
//(async () => {console.log(await levelUp(con, 32))})();
module.exports.levelUp = levelUp;
