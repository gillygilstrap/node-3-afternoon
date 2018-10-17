const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
require ('dotenv').config();

const checkForSession = require('./middlewares/checkForSession');
const swag_controller = require('./controllers/swag_controllers');
const auth_controller = require('./controllers/auth.controller');



const app = express();
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use( checkForSession )

app.get('/api/swag', swag_controller.read )

app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser)


const PORT = process.env.SERVER_PORT || 4005
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// require('dotenv').config();

// const app = express();
// app.use( bodyParser.json() );
// app.use( session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }));

// const port = process.env.SERVER_PORT || 3000;
// app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );