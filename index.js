const venom = require('venom-bot');

const express = require('express');
const http = require('http');
const app = express();
const port =  65535;
const server = http.createServer(app);
const { body, validationResult } = require('express-validator');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

venom
    .create({
        headless: "new",
        session: 'jadabot',
        browserArgs: ['--no-sandbox'],
        
    })
    .then((client) => {
        console.log("start");
        start(client)
    })
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {
    // function sharedHandler(req, res)
    // {

    //     const { number1, message1 } = req.body;


    //    console.log("-------------");

    //     console.log(number);
    //     console.log("-------------");

    //     console.log(req.query.message);





    //     const number = "977"+req.query.number+"@c.us";
    //     const message = req.query.message;
    //     console.log('To' + number + "with:"+message.toString());
    //     //client.sendText(number, message);

    //     client.sendText(number, message).then(response => {
    //         res.status(200).json({
    //             status: true,
    //             message: message,
    //             response: response
    //         });
    //     }).catch(err => {
    //                 console.log(req.query.number);

    //         res.status(500).json({
    //             status: false,
    //             message: 'Mensagem nao enviada',  
    //             response: err.text
    //         });
    //     });
    //     //rer.send('Mensagem enviada');
    // }


   function  s (req, res) {
        const { number, message } = req.body;
    
        if (!number || !message) {
            res.status(200).json({
                status: false,
                message: 'Both "number" and "message" are required in the request body.',
            });
        } else {
            const formattedNumber = "977" + number + "@c.us";
    
            client.sendText(formattedNumber, message).then(response => {
                res.status(200).json({
                    status: true,
                    message: message,
                    response: response
                });
            }).catch(err => {
                        console.log(req.query.number);
    
                res.status(500).json({
                    status: false,
                    message: 'Mensagem nao enviada',  
                    response: err.text
                });
            });
    
            // The rest of your code to send the WhatsApp message
        }
    }
    app.get('/send-message', s);  
    app.post('/send-message', s);
    app.post('/send-message1', s);
    

    app.get("/exit",async (req, res) => {
        res.send('closing..');
        app.close();
        server.close();
        const httpTerminator = createHttpTerminator({
            server,
        });

        await httpTerminator.terminate();
    })
}

server.listen(port, function() {
    console.log('App running on *: ' + port);
});