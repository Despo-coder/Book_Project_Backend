// This function is to simulate a delay in order to faciliate the testing 
// of the code using Promises.


let books = require("../router/booksdb.js");

const getBooks = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 500); 
    });
  };

  module.exports = {
    getBooks
  };