const fs = require('fs');
// Goal is to generate some CSVs to import into MySQL database `yelgat`
// One CSV for each table, `users`, `restaurants`, `reviews`

// restaurants
// name-city-number [tab] Name
cities = [
  'new-york','san-francisco','boston',
  'trenton','philadelphia','new-orleans',
  'sacramento','austin','nashville',
  'newark','los-angeles','oakland',
  'charlotte','sunnyvale','san-jose'
];
restaurants = [
  'Blue Bottle','Stumptown','Starbucks',
  'La Colombe','Coffee Bean','Intelligentia',
  'Panera','Smash Burger','In n Out',
  'Burger King','McDonalds','Peets Coffee',
  'KFC','Chipotle','Wendys'
];
let output = '';
for (let c = 0; c < cities.length; c++) {
  for (let r = 0; r < restaurants.length; r++) {
    output += restaurants[r].toLowerCase().replace(/\s+/g, '-') + '-' + cities[c] + '\t';
    output += restaurants[r];
    output += '\n';
  }
}
fs.writeFile('./restaurants.csv',output,(err)=>{
  if (err) {
    console.error(err);
  } else {
    console.log('Wrote to file.');
  }
});

// users
// name location reviews friends thumbnail
output = '';
for (let i = 0; i < 225; i++) {
  output += getWord() + '\t';
  output += `${getWord()}, ${getWord().substring(0,2).toUpperCase()}\t`;
  output += Math.floor(Math.random() * 100) + '\t';
  output += Math.floor(Math.random() * 100) + '\t';
  output += `https://api.adorable.io/avatars/90/${getWord()}.png\n`;
}
fs.writeFile('./users.csv',output,(err)=>{
  if (err) {
    console.error(err);
  } else {
    console.log('Wrote to file.');
  }
});


// reviews
// id_users id_restaurant text createdAt stars
output = '';
for (let i = 0; i < 3000; i++) {
  output += Math.floor(Math.random() * 225 + 1) + '\t';
  output += Math.floor(Math.random() * 225 + 1) + '\t';
  output += getParagraph() + '\t';
  // TODO all dates are ending up same in SQL DB (2147483647), SQL clipped max INT ?
  output += 1539380261176 - Math.floor(Math.random() * 31536000000) + '\t';
  output += Math.floor(Math.random() * 50) / 10 + '\n';
}
fs.writeFile('./reviews.csv',output,(err)=>{
  if (err) {
    console.error(err);
  } else {
    console.log('Wrote to file.');
  }
});

// helpers
function getWord(len = 5) {
  const vowels = 'aeiouy';
  const consonants = 'bcdfghjklmnpqrstvwxz';
  let output = '';
  let useVowel = (Math.random() < 0.5);
  for (let i = 0; i < len; i++) {
    letters = useVowel ? vowels : consonants;
    let randIdx = Math.floor(letters.length * Math.random());
    output += letters[randIdx];
    useVowel = !useVowel;
  }
  return output;
}

function getParagraph(wc) {
  let words = [];
  if (wc == undefined) {
    wc = Math.floor(Math.random() * 140) + 10;
  }
  for (let i = 0; i < wc; i++) {
    words.push(getWord(Math.random() * 8));
  }
  return words.join(' ');
}