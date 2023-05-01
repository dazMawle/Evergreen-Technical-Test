var express = require('express');
var bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config();

const {createAndListNewCustomer} = require('./createAndList.js')

var app = express();
var port = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes

app.get('/', (req, res) => {
    res.render('form');
});

app.post('/addcustomer', (req, res) => {
    
    createAndListNewCustomer(req.body).catch(console.dir); 
    res.redirect('/');
});

app.get('/customerlist', async (req, res) => {

    const allCustomers = await createAndListNewCustomer();
    const mapApiKey = process.env.MAPS_API_KEY;

    res.render('customerlist',{
        allCustomersToList: allCustomers,
        googleMapApiKey: mapApiKey
    });
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});