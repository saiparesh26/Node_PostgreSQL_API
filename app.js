const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', routes);


app.get('/', (req,res) => {
    res.send('check');
})


app.use((err, req, res, next) => {
    res.json(err);
});

app.listen(PORT, (req,res) => {
    console.log(`listening on ${PORT}`);
})