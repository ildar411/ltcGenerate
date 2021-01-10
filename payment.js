const QiwiBillPaymentsAPI= require('@qiwi/bill-payments-node-js-sdk');
const SECRET_KEY = 'eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6InBmY3FlaC0wMCIsInVzZXJfaWQiOiI0NDc4MjM5Nzc1NDgiLCJzZWNyZXQiOiI0YWU5NGM1OTUxMzAzOTkxZWZlZTc2YzA2NTY0MGJhZTE3YTU0NjEzMWNlNTMxZWY0NTQyY2E2MDQ2ZjQ1ZTkwIn19';
const public_key = '48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPvwBU8cT8tobic85Q1MzQYMgimRVCBZPyfu3iqQyDcJkiTuRhMmZcH6LxHuD6X4L9dxJpprQpPKAxj8bWn2QQuiiYnEuM7pZsA3xsuyaHP';
const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);
const entry = 1.00; //сумма входа в пирамиду
 
let pay = (telegramId, sum) => {
    let random = Math.floor(Math.random() * 100) + 1 + telegramId
    const params = {
        public_key,
        amount: sum,
        billId: random,
        successUrl: 'https://merchant.com/payment/success?billId='+(telegramId + random) 
    };
    const link = qiwiApi.createPaymentForm(params);
    return {link: link, random: random};
}

module.exports.pay = pay;
/*
    const fields = 
    {
        amount: 1.00,
        currency: 'RUB',
        comment: '1',
        expirationDateTime: Date.now(),
        email: 'example@mail.org',
        account : 'client4563',
        successUrl: 'http://test.ru/'
    };*/
/*
    //возврат средств
    var callbackQiwi = require('node-qiwi-api').callbackApi;
    var Wallet = new callbackQiwi('a8c883c9713435fdc9b55cc678e1fc04');
    
    Wallet.toWallet({ amount: '0.9', comment: 'test', account: '+79991338166'}, (err, data) =>{
        if(err){
            console.log(err);
        }
        console.log(data);
    } );
    */