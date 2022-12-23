const {
    Client,
    LegacySessionAuth, LocalAuth
}       = require('whatsapp-web.js');
const express = require('express');
const app     = express();
const qrcode    = require('qr-image');
const fs      = require('fs');
const qrcode_ter = require('qrcode-terminal');

global.sessions = [];

app.get('/', function (req, res){
    res.send('Merhaba Express');
});

app.get('/qr', function (req, res){





        try{

            const client = new Client({
                authStrategy: new LocalAuth({
                    clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
                })
            })

            client.initialize();

            client.on('authenticated', (session) => {

            });


            client.on(`auth_failure`, (msg) => {
                console.log(`auth_failure`, msg);
            });

            client.on(`ready`, () => {
                console.log(`ready`);
            });

            client.on(`message`, async msg => {
                console.log('message', msg)
            });

            client.on(`disconnected`, (reason) => {
                console.log(`disconnected`, reason);
            });

            // client.getState().then((data) => {
            //     if (data){
            //         res.write("<html><body><h2>Already Authenticated</h2></body></html>");
            //         res.end();
            //     }
            // })

            client.on('qr', (qr) => {
                console.log("generate")
                res.send(qr);

                // if (output === 'json'){
                //     console.log("json")
                //     res.json({qr});
                // }
                // else if (output === 'image'){
                //     console.log("image")
                //     var code = qrcode.image(qr.toString(), {type: 'svg'});
                //     res.type('svg');
                //     code.pipe(res);
                // }
                // else{
                //     console.log("else")
                //
                // }

            });

            client.on('ready', function (){

            })
        }
        catch (err){
            res.send(res);
        }




});

app.get('/send_message', function (req, res){
    console.log('ready to send');




    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
        })
    })
    client.on("qr", qr => {
        console.log('qr');

        qrcode_ter.generate(qr, {small: true} );
    })

// Save session values to the file upon successful auth
    client.on('ready', (session) => {

        client.sendMessage("9779864429888" + '@c.us', "hello").then(r => print(r));s
    });
    client.on("",(s)=>{})






})

app.listen(48186, function (){
    console.log('loading...');
});