
const functions = require('@google-cloud/functions-framework');

const path = require('path');
const cors = require('cors');

const corsMiddleware = cors({ origin: true });

const { insertToken } = require('./insertToken'); 
const { getTokenSignature } = require('./certillion/getTokenSignature'); 

functions.http('otpcallback', async (req, res) => {
    corsMiddleware(req, res, async () => {

        let tokenSignature = await getTokenSignature(req.query)        

        let params  = { ...req.query, access_token: tokenSignature.access_token } 

        let json = await insertToken(params)

        res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Autenticação OTP</title>
            </head>
            <body>
                <div class="container">
                    <h1>OTP Atualizado com sucesso</h1>
                    <p>Esta página irá fechar em alguns segundos</p>
                </div>
                <script>                   

                    setTimeout(function() {
                        window.close();
                    }, 5000);
                    
                </script>
            </body>
            </html>
        `);
    });
});
