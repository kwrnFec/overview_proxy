const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const axios = require("axios");
const apiUrl = 'http://52.26.193.201:3000/';
const ovUrl = 'http://ec2-35-165-217-158.us-west-2.compute.amazonaws.com';
// const ovUrl = 'http://localhost:3333';

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use('/ov', createProxyMiddleware({ target: ovUrl, changeOrigin: true }));
app.use('/rpModule', createProxyMiddleware({ target: "http://ec2-3-12-148-239.us-east-2.compute.amazonaws.com", changeOrigin: true }));
app.use('/qa', createProxyMiddleware({ target: "http://ec2-18-224-182-50.us-east-2.compute.amazonaws.com", changeOrigin: true }));
app.use('/rrmodule', createProxyMiddleware({ target: "http://ec2-54-172-55-163.compute-1.amazonaws.com", changeOrigin: true }));

const port = 5555;

app.listen(port, () => console.log(`listening on port ${port}`));