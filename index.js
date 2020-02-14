/** Autor: Victor Santiago;     Portfólio github: https://avictorsn.github.io */

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

//   Rotas de exemplo da API;

app.get('/api', (req, res)=>{
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res)=>{
    jwt.verify(req.token, 'privateKey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'Post created',
                authData
            });
        }
    });

});

app.post('/api/login', (req, res)=>{
    let user = {
        id: 1,
        username: 'Victor123',
        email: 'antoniovictor@outlook.com'
    }
    
    jwt.sign({user}, 'privateKey', (err, token)=>{
        res.json({
            token
        });
    });
});


//  Definição da função de verificação 'verifyToken';
function verifyToken(req, res, next){
    //  Obter valor do cabeçalho de autenticação
    const bearerHeader = req.headers['authorization'];
    //  Checar se bearer está indefinido
    if(typeof bearerHeader !== "undefined"){
        //  Considerando que o cabeçalho virá na forma: 'Header <token_de_acesso>', é necessário separar essa string para obter o token;
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        //  Setar o token;
        req.token = bearerToken;

        next();
    }
    else{
        //  Permissão negada
        res.sendStatus(403);
    }
}

//  Abrir a API na porta 3002;
app.listen(3002);

console.log('Rodando');
