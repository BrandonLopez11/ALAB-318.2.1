const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

app.post('/submit-form', (req, res) => {
    console.log('Form data:', req.body);  // Log form data
    res.send('Form submission successful!');
});

app.get('/about/:name', (req, res) => {
    const name = req.params.name;
    res.render('about', { title: 'About Page', name });
});

app.get('/download-image', (req, res) => {
    const file = path.join(__dirname, 'public/sample.jpg');
    res.download(file, 'downloaded-sample.jpg', (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('File download failed');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
