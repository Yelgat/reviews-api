# reviews-server

Node/Express server that replies with paginated reviews dummy data.

## MySQL

Run the setup script:

```
$ cd sql-db
$ ./genDropSeed.sh
```

This will generate the CSV files for each table, drop the database `yelgat` if it already exists in MySQL on localhost, then seed the database with the new data.

To start the server, `$ npm start`


## JSON - no longer works, use MySQL instead

To generate the dummy data: `$ node dummyDataGenerator.js`

To start: `$ npm start`

To access: `$ curl http://localhost:8080` will reply with JSON for the first page of reviews. Use the `page` paramater to specify a page: `$ curl http://localhost:8080?page=2`