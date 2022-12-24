const venom = require('venom-bot');

const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 65535;
const server = http.createServer(app);
const { body, validationResult } = require('express-validator');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

venom
    .create({
        headless: true,
        session: 'jadabot',
        browserArgs: ['--no-sandbox']
    })
    .then((client) => {
        console.log("start");
        start(client)
    })
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {
    function sharedHandler(req, res)
    {

        console.log(req.body["message"]);
        console.log(req.body["number"]);




        const number = "977"+req.body["number"]+"@c.us";
        const message = req.body["message"];
        console.log('To' + number + "with:"+message);
        //client.sendText(number, message);

        client.sendText(number, message).then(response => {
            res.status(200).json({
                status: true,
                message: message,
                response: response
            });
        }).catch(err => {
            res.status(500).json({
                status: false,
                message: 'Mensagem nao enviada',
                response: err.text
            });
        });
        //rer.send('Mensagem enviada');
    }

    app.get('/send-message', sharedHandler);
    app.post('/send-message', sharedHandler);

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