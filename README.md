# reviews-server

Node/Express server that replies with paginated reviews dummy data.

To generate the dummy data: `$ node dummyDataGenerator.js`

To start: `$ npm start`

To access: `$ curl http://localhost:8080` will reply with JSON for the first page of reviews. Use the `page` paramater to specify a page: `$ curl http://localhost:8080?page=2`