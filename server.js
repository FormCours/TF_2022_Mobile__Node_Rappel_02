'use strict'; // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode

// Utilisation du module "http"
const http = require('http');

// Création du Web server 
const server = http.createServer((request, response) => {

    // Récuperation des infos pour le routing
    console.log(request.url, request.method);

    const url = request.url.toLocaleLowerCase();
    const method = request.method;

    const productRegex = /(?<=^\/product\/)[0-9]+$/;

    // Routing
    if (method === 'GET' && url === '/') {
        response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Demo</title>
        </head>
        <body>
            <h1>Hello World</h1>
        </body>
        </html>
        `);
    }
    else if (method === 'GET' && productRegex.test(url)) {
        const productId = productRegex.exec(url)
        response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Demo</title>
        </head>
        <body>
            <h1>Product Id : ${productId}</h1>
        </body>
        </html>
        `);
    }
    else {
        response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Demo</title>
        </head>
        <body>
            <h1>Error 404 (╯°□°）╯︵ ┻━┻</h1>
        </body>
        </html>
        `);
    }
});

// Demarrage du Web server
server.listen(8080, () => {
    console.log('Server up on port 8080');
});