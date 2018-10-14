const fs = require('fs');

const data = [];

const REVIEW_COUNT = 42;

for (let i = 0; i < REVIEW_COUNT; i++) {
  const reviewer = {
    id: i,
    name: getWord(),
    location: `${getWord()}, ${getWord().substring(0,2).toUpperCase()}`,
    reviews: Math.floor(Math.random() * 100),
    friends: Math.floor(Math.random() * 100),
    thumbnail: `https://api.adorable.io/avatars/90/${getWord()}.png`
  };
  const review = {
    reviewer: reviewer,
    'review-date': 1539380261176 - Math.floor(Math.random() * 31536000000),
    stars: Math.floor(Math.random() * 50) / 10,
    'review-text': getParagraph()
  };
  data.push(review);
}

fs.writeFile('./dummyReviewData.json', JSON.stringify(data), (err) => {
  if (err) {
    console.error(err);
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
