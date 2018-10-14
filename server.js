const express = require('express');
const app = express();
// TODO separate DB logic into its own file / interface / service
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yelgat"
});
connection.connect((err)=>{
  if (err) {
    console.error('Could not connect to database.', err);
  } else {
    console.log('Connected to database.');
  }
});

// given a name_city_number e.g. blue-bottle-sunnyvale get all reviews

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// e.g. http://localhost:8080/r/blue-bottle-sunnyvale?page=2
app.get('/r/:ncn', (req, res) => {
  const p = (req.query.page) ? req.query.page : 1;
  // TODO move pagination implementation to SQL request
  let q = `SELECT * FROM reviews WHERE id_restaurants = (SELECT id FROM restaurants WHERE name_city_number = '${req.params.ncn}');`;
  connection.query(q, (err, rows)=>{
    if (err) {
      res.statusCode(501).send();
      throw err;
    }
    // get user info and extend reviews
    // add error handling e.g. .catch()
    const pageOfRows = rows.slice((p - 1) * 5, p * 5);
    let promises = [];
    for (let i = 0; i < pageOfRows.length; i++) {
      q = `SELECT * FROM users WHERE id = ${pageOfRows[i]['id_users']};`
      promises.push(query(connection, q));
    }
    Promise.all(promises).then((users) => {
      for (let i = 0; i < pageOfRows.length; i++) {
        pageOfRows[i].reviewer = users[i][0];
      }
      const body = {
        'page': p,
        'page-count': Math.ceil(rows.length/5),
        'reviews': pageOfRows
      }
      res.send(body);
    });
  });
});

app.listen(8080, ()=>{
  console.log(`Listening on port 8080`);
});

const query = (connection, str) => new Promise((resolve, reject) => {
  connection.query(str, (err, rows) => {
    if (err) {
      reject(err);
    } else {
      resolve(rows);
    }
  });
});
