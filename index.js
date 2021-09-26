require('dotenv').config()
const express = require('express');
const querystring = require('querystring');
const app = express();
const port = 8888;

// console.log(process.env.CLIENT_ID);

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
    const data = {
        name: "Samarth",
        isAwesome: true,
    };

    res.json(data);
});

const generateRandomString = length => {
    let text = '';
    const possible = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890';
    
    for (let i=0; i<length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/login', (req, res) => {
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: code,
        redirect_uri: REDIRECT_URI,
    });
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}) 

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
}); 