import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());





app.get('/', (req, res) => {
    res.send("Welcome to Happy Tails Shop");
})

// Success status: 200 OK if req succeeds
// Non-existent route status: 404 Not Found if req not succeeds
app.get('/products', (req, res) => {
    res.status(200).json({
        dogstore: "My first dogstore",
        products: {
            collars: ['Rounded', 'Leather', 'Martingale', 'Neopren'],
            harnesses: ['Julius-k9', 'Leather', 'Y-harness', 'No-pull'],
            leashes: ['Textile', 'Leather', 'Flexi', 'Multi'],
            light: ['Red', 'Blue', 'Green', 'Orange', 'Purple'],
        },
        lastUpdated: new Date().toISOString().split("T")[0],
    });
});

// Success status: 200 OK if req succeeds
// Non-existent route status: 404 Not Found if req not succeeds
app.get('/about', (req, res) => {
    res.json({
        title: "Happy Tails Shop",
        description: "Your one-stop shop for high-quality dog gear and accessories",
        foundet: 2026,
        funFact: "Every order includes a pawsome dog treat!",
    })
});


// I chose res.send instead of res.json because the response 
// consists of only clear text intended directly for the user. 
// There is no data to be parsed by a frontend or API client, 
// only text for a human user to read.

// Success status: 200 OK if req succeeds
// Non-existent route status: 404 Not Found if req not succeeds
app.get('/contact', (req, res) => {
    res.send("Contact us at support@happytailsshop.com or call 444-DOGS!");
});

app.get('/maintenance', (req, res) => {
    res.status(503).send("We're down for maintenance, check back soon!");
});







app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});