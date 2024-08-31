const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    const { FName, LName,Phone, Email, Message } = req.body;
    const formData = `FName: ${FName}\n LName: ${LName}\n Phone: ${Phone}\nEmail: ${Email}\nMessage: ${Message}\n\n`;

    fs.appendFile(path.join(__dirname, 'contact.txt'), formData, (err) => {
        if (err) {
            console.error('Failed to save form data:', err);
            res.status(500).send('Failed to save form data.');
        } else {
            res.send('Form data saved successfully!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
