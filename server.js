const express = require('express');
const app = express();
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
  
  //req is the request object, res is the response object
  app.get('/greetings/:username', (req, res) => { 
    const username = req.params.username; //req.params.username is a string
    res.send(`<h1>Hello there, ${username}! What a delight it is to see you once more.</h1>`); //res.send() sends a response back to the client
});

//res.send() sends a response back to the client
app.get('/', (req, res) => {
    res.send('<h1>Homepage</h1>'); //
});

//handles GET requests to a specific endpoint using the Express.js framework. The endpoint in question is the '/roll/:number', which represents a placeholder for a specific number.
app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number);
    if (isNaN(number)) {
        res.send('You must specify a number.');
    } else {
        const roll = Math.floor(Math.random() * (number + 1));
        res.send(`You rolled a ${roll}.`);
    }
});

//handles GET requests to a specific endpoint using the Express.js framework. The endpoint in question is the '/collectibles/:index', which represents a placeholder for a specific index of a collectible item.

// When a GET request is made to this endpoint, the callback function (req, res) => {...} takes over. This function needs two arguments: req (the request object) and res (the response object).

// The function has a line that retrieves the 'index' parameter from the request URL and converts it to an integer using the code, const index = parseInt(req.params.index);. The 'index' parameter is the position of a specific collectible item in the 'collectibles' array.

// The function then checks if the 'index' is a valid number. If it's not a number, less than 0, or greater than or equal to the length of the 'collectibles' array, the requested item does not exist. In this case, the server responds with the message 'This item is not yet in stock. Check back soon!'.

// If the 'index' is valid, the server retrieves the item from the 'collectibles' array using the 'index'. The server responds with a message that includes the name and price of the item, indicating that it's available for purchase.
app.get('/collectibles/:index', (req, res) => {
    const {index} = req.params;
    const items = parseInt(index);
    if (isNaN(items) || items < 0 || index >= collectibles.length) {
        res.send('This item is not yet in stock. Check back soon!');
    } else {
        const item = collectibles[items];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
});


// app.get('/shoes', 
//  Handles GET requests to a specific endpoint to filter shoes based on query parameters.
// @param {Object} req - The request object containing the query parameters.
// @param {Object} res - The response object to send the filtered shoes data.
app.get('/shoes', (req, res) => {
    function generateShoeHTML(shoe) {
        return `
            <div>
                <h3>${shoe.name}</h3>
                <p>Type: ${shoe.type}</p>
                <p>Price: $${shoe.price}</p>
            </div>
        `;
    }

    function filterShoes(shoes, query) {
        let filteredShoes = shoes;

        if (query['min-price']) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price >= query['min-price']);
        }

        if (query['max-price']) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price <= query['max-price']);
        }

        if (query.type) {
            filteredShoes = filteredShoes.filter(shoe => shoe.type === query.type);
        }

        return filteredShoes;
    }

    let filteredShoes = filterShoes(shoes, req.query);
    let shoeHTML = filteredShoes.map(shoe => generateShoeHTML(shoe)).join('');

    res.send(shoeHTML);
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});