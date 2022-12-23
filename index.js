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
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {

    app.get('/send-message', async (req, res) => {
        const errors = validationResult(req).formatWith(({
                                                             msg
                                                         }) => {
            return msg;
        });

        if (!errors.isEmpty()) {
            return res.status(422).json({
                status : false,
                message: errors.mapped()
            });
        }

        const number = "977"+req.query['number']+"@c.us";
        const message = req.query['message'];

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
    })
}

server.listen(port, function() {
    console.log('App running on *: ' + port);
});