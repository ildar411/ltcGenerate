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
let end = (con) => {
    con.end(function(err) {
        if (err) {
        return console.log("Ошибка: " + err.message);
        }
        console.log("Подключение закрыто");
    });
};


let getWalet = async (con, telegramId) => {
    let walet =0;
    await con.promise().query('SELECT walet FROM user WHERE telegram_id = ?', telegramId)
    .then(([res, field]) => {
        walet = res[0].walet;
    })
    console.log(walet);
    return walet;
};
let getChild = async (con, telegramId) => {
    let result = [];
    let arr = [];  
    let ret = []; 
    await con.promise().query('SELECT * FROM user')
    .then(([res, field]) => {
        return res;
    })
    .then(async res => {
        let father = await res.find(item => item.telegram_id == telegramId)
        if(father)
        { 
            await result.push(father);
            //console.log(result);
            let child = await res.filter(item => item.pid == father.id);
            if(child.length) {
                await arr.push(child);
                child.forEach(async element => {
                    let child2 = await res.filter(item => item.pid == element.id);
                    if(child2.length) {
                        await arr.push(child2);
                        child2.forEach(async el => {
                            let child3 = await res.filter(item => item.pid == el.id);
                            if(child3.length) {
                                await arr.push(child3);
                                child3.forEach(async el => {
                                    let child4 = await res.filter(item => item.pid == el.id);
                                    if(child4.length) {
                                        await arr.push(child4);
                                        child4.forEach(async el => {
                                            let child5 = await res.filter(item => item.pid == el.id);
                                            if(child5.length) {
                                                await arr.push(child5);
                                                child5.forEach(async el => {
                                                    let child6 = await res.filter(item => item.pid == el.id);
                                                    if(child6.length) {
                                                        await arr.push(child6);
                                                        child6.forEach(async el => {
                                                            let child7 = await res.filter(item => item.pid == el.id);
                                                            if(child7.length) {
                                                                await arr.push(child7);
                                                            } else {
                                                                console.log('нет 7 уровня');
                                                            }
                                                        })
                                                    } else {
                                                        console.log('нет 6 уровня');
                                                    } 
                                                })
                                            } else {
                                                console.log('нет 5 уровня');
                                            }
                                        })
                                        
                                    } else {
                                        console.log('нет 4 уровня');
                                    }
                                })
                                
                            } else {
                                console.log('нет 3 уровня');
                            }
                        })
                    } else {
                        console.log('нет 2 уровня') 
                    }
                });
                ret = arr;
            } else {
                console.log('нет 1 уровня');
            } 
            
            
        } else {
            console.log('не найден отец');
            
        }
    })
    .catch(console.log);
    //end(con);
    return ret[0];
};
let getFather = async (con, telegramId) => {
    let result = [];
    let arr = [];  
    let ret =[]; 
    await con.promise().query('SELECT * FROM user')
    .then(([res, field]) => {
        return res;
    })
    .then(async res => {
        let child = await res.find(item => item.telegram_id == telegramId)
        if(child)
        { 
            result.push(child);
            //console.log(result);
            let father = await res.find(item => item.id == child.pid);
            if(father) {
                await arr.push(father);
                let father2 = await res.find(item => item.id == father.pid);
                    if(father2) {
                        await arr.push(father2);
                        let father3 =await res.find(item => item.id == father2.pid);
                            if(father3) {
                                await arr.push(father3);
                                let father4 =await res.find(item => item.id == father3.pid);
                                if(father4) {
                                    await arr.push(father4);
                                    let father5 = await res.find(item => item.id == father4.pid);
                                    if(father5) {
                                        await arr.push(father5);
                                        let father6 = await res.find(item => item.id == father5.pid);
                                            if(father6) {
                                                await arr.push(father6);
                                                let father7 = await res.find(item => item.id == father6.pid);
                                                if(father7) {
                                                await arr.push(father7);
                                                    
                                                } else {
                                                    console.log('нет 7 уровня');
                                                }                        
                                            } else {
                                                console.log('нет 6 уровня');
                                            } 
                                            } else {
                                                console.log('нет 5 уровня');
                                            }
                                        
                                        
                                    } else {
                                        console.log('нет 4 уровня');
                                    }
                                
                            } else {
                                console.log('нет 3 уровня');
                            }
                    } else {
                        console.log('нет 2 уровня') 
                    }
                    ret = arr;
                
            } else {
                console.log('нет 1 уровня');
            } 
        } else {
            console.log('не найден отец');
        }
    })
    .catch(console.log);
    //end(con);
    return ret;
};
let searchUserBool = async (con , telegramId) => {
    let ret = false;
    await con.promise().query('SELECT * FROM user')
    .then(async ([res, field]) => {
        if(await res.find(item => item.telegram_id == telegramId)) {
            //end(con);
            ret = true;
        } else {
            //end(con);
            ret = false;
        }
    })
    .catch(console.log);
    return ret;
};
let searchUser = async (con, telegramId) => {
    let me = {};
    await con.promise().query('SELECT * FROM user WHERE telegram_id = ?', telegramId)
    .then(([res, field]) => {
        me = res[0];
    })
    .catch(console.log);
    return me;
};
let searchUserByPid = async (con, pid) => {/*возрашает либо объект типа 
    TextRow {
    id: 7,
    pid: 3,
    walet_number: 7,
    walet: 0,
    telegram_id: 7,
    level: 1 }*/
    //либо undefined
    let father = {};
    await con.promise().query('SELECT * FROM user WHERE id = ?', pid)
    .then(([res, field]) => {
        father = res[0];
    })
    .catch(console.log);
    return father;
};

//(async () => {pid1 = await searchUser(con, 5); console.log(pid1.id)
  //  pid = await searchUser(con, 5); console.log(pid)})();

//addUser(con, 0, 0, 0, 598673338);
//(async () => {let father = await getFather(con, 7)
  //  father.map(async x => {await console.log(x)})})(); //примеры запуска (асинхрон)
//(async () => {console.log(await searchUserByPid(con, 2))})(); //примеры запуска (асинхрон)

module.exports.getChild = getChild;
module.exports.getFather = getFather;
module.exports.getWalet = getWalet;
module.exports.searchUserBool = searchUserBool;
module.exports.searchUser = searchUser;
module.exports.searchUserByPid = searchUserByPid;