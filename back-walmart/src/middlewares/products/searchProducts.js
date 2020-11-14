const products = require('../../models/products');
const { get } = require('lodash');

const longestAlgorithm = (s) => {
  const str = `@${s.split("").join('@')}@`;
  let center = 1;
  let window = 0;
  const palindromes = [];

  for (let i = 1; i < str.length; i++) {
    let skip = 1;
    endOfWindow = center + window;
    if (i < endOfWindow) {
      skip = Math.min(palindromes[2 * center - i], (endOfWindow - i));
    }

    const palindromesLength = getPalindromeLength(str, i, skip);
    palindromes[i] = palindromesLength;
    
    const endOfNewWindow = i + palindromesLength;

    if(endOfNewWindow > endOfWindow) {
      center = i;
      window = palindromesLength;
    }
  }

  const longest = {
    start: 0,
    length: 1
  }

  palindromes.forEach((length, index) => {
    if(length > longest.length) {
      longest.start = ((index - length) / 2);
      longest.length = length;
    }
  });

  return s.substr(longest.start, longest.length);
}

const getPalindromeLength = (str, center, skip) => {
  let index = skip;
  while(
    center - index >= 0
    && center + index < str.length
    && str[center + index] === str[center - index]
  ) {
    index +=1;
  }

  return index -1;
}

const findOther = (req, res, next, filter) => {
  products.find({ $or:[
    {
      brand:{
        "$regex": filter,
        "$options": "i"
      }
    },
    {
      description:{
        "$regex": filter,
        "$options": "i"
      }
    }
    ]}, (error, product) => {
    if (error) {
      res.sendStatus(500);
    }
    
    res.locals.result = product;
    next();
  })
}

const find = ((req, res, next, filter) => {
  products.findOne({ id: filter }, (error, product) => {
    if (error) {
      findOther(req, res, next, filter);
    } else {
      res.locals.result = product;
      next();
    }
  })
});

const searchProducts = (req, res, next) => {
  try {
    const { filter } = get(req, 'params');
    if (!filter) {
      res.sendStatus(400);
    }
    const palindromic = longestAlgorithm(filter);
    console.log('palindromic', palindromic);
    res.locals.isPalindromic = palindromic.length > 2 ? true : false;
    find(req, res, next, filter);
  } catch (e) {
    res.sendStatus(500);
  }
}

module.exports = searchProducts;