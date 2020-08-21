const express = require("express");
const proxy = require('express-http-proxy');
const cors = require('cors');
const axios = require("axios");
const apiUrl = 'http://52.26.193.201:3000/';
const ovUrl = 'http://ec2-35-165-217-158.us-west-2.compute.amazonaws.com/';

const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());


app.get('/ov/*', (req, res) => {
  let url = ovUrl + req.path;
  axios.get(url, { params: req.query })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('ProxyServer: ', err);
    })
});

app.post('/ov/*', (req, res) => {
  let url = ovUrl + req.path;
  axios.post(url, req.body)
    .then((response) => {
      res.send(response.data);
    })
});

app.put('/ov/*', (req, res) => {
  let url = ovUrl + req.path;
  axios.put(url, req.body)
    .then((response) => {
      res.send(response.data);
    })
});

const port = 5555;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});