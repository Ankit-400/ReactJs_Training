
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// app.use()

// Enable CORS for all routes
app.use(cors({
    origin: '*',
    // Additional CORS options can be specified here if needed
}));

// Your route handlers go here
app.post('/events', (req, res) => {
    // const { eventName } = req.body; // Access form data
    // console.log(eventName);
    // Process the form data as needed
    // Send response
    // console.log(req.body);
    const jsonData = {};

    for (const key in req.body) {
        jsonData[key] = req.body[key];
    }
    console.log(jsonData);
    res.send('Form submitted successfully');
});

app.get('/events', (req, res) => {
    console.log("Got GET req");
    res.send('I do not have anything to send!!');
})

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
