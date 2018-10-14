const express = require('express');
const app = express();

const data = require('./dummyReviewData');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  const p = (req.query.page) ? req.query.page : 1;
  const body = {
    'page': p,
    'page-count': Math.ceil(data.length/5),
    'reviews': data.slice((p - 1) * 5, p * 5)
  }
  res.send(body);
});

app.listen(8080, ()=>{
  console.log(`Listening on port 8080`);
});

/*
42 reviews
5 per page

*/