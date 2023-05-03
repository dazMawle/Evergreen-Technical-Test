var express = require('express');
var bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config();

const {createOrListNewCustomer, signUpUser, logInUser} = require('./databaseFunctions');

var app = express();
var port = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes

app.get('/', (req, res) => { 
    app.locals.isLoggedIn = false;
    res.render('login');
});

app.post('/login', async (req, res) => { 

    const user = {
        userName: req.body.userName,
        password: req.body.password
    }

    app.locals.userName = user.userName; 
    app.locals.isLoggedIn = await logInUser(user);

    if(app.locals.isLoggedIn){
        res.redirect('form');
    }else{
        res.render('login', {
            notFoundMessage: `User ${user.userName} not found.`,
            notFoundMessage2: 'Please try again or sign up.'
        });

    }
});

app.get('/form', (req, res) => { 

    if(app.locals.isLoggedIn){
        res.render('form');
    }else{
        res.render('login')
    }
});

app.get('/signup', (req, res) => { 
    
    res.render('signup');
});

app.post('/signup', async (req, res) => { 

    if(await signUpUser({
        userName: req.body.userName,
        password: req.body.password
    })){
        res.render('signup', {
            signedUpMessage: 'Signed up. You can now log in.'
        });
    }else{
        res.render('signup', {
            notSignedUpMessage: 'User already exists. Try again.'
        });
    }
});

app.post('/addcustomer', (req, res) => {

    let newCustomer = req.body;
    newCustomer.user = app.locals.userName;
    createOrListNewCustomer(newCustomer, null); 
    res.render('form', {
        newCustomerMessage: `Customer ${newCustomer.firstName} added to the list.`
    });
});

app.get('/customerlist', async (req, res) => {

    if(app.locals.isLoggedIn){
        const userToList = app.locals.userName;
        const allUserCustomers = await createOrListNewCustomer(null, userToList);

        res.render('customerlist', {
            allUserCustomersToList: allUserCustomers,
            googleMapApiKey: process.env.MAPS_API_KEY
        });
    }else{
       res.render('login'); 
    }
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});