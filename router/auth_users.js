const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
let authenticatedUsers = require("../utils/authenticatedUser.js").authenticatedUsers;
const regd_users = express.Router();


//only registered users can login
regd_users.post("/login", (req,res) => {
 const username = req.body.username;
 const password = req.body.password;
if(!username ||!password){
    return res.status(400).json({message: "Please provide username and password"});
}

if (authenticatedUsers(username,password)) {
  let accessToken = jwt.sign({
    data: password
  }, 'access', { expiresIn: 60 * 60});

  req.session.authorization = {
    accessToken,username
}


return res.status(200).send("User successfully logged in");
} else {
  return res.status(208).json({message: "Invalid Login. Check username and password"});
}

});

//only registered users can add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let session = req.session;
  if(!session?.authorization){
    return res.status(400).json({message: "Please login first and try again"});
  }else{

    let isbn = req.params.isbn;
    const { review } = req.body;
    const username = req.session.authorization.username;
    if (!isbn || !review) {
      return res.status(400).json({ message: "ISBN and review are required" });
    }else {
      let book = books.find(book => book.isbn === isbn);
      if(book){
        const existingReview = book.reviews.find(book_review => book_review.username === username);
        if (existingReview) {
          // Update the existing review
          existingReview.review = review;
        } else {
          // Add a new review
          book.reviews.push({ username, review });
        }
      
        return res.status(200).json({ message: 'Review added/updated successfully', reviews: book.reviews });
      }
      else{
          return res.status(404).json({message: "No book found with ISBN: " + isbn});
      }
    }
  
}
   
});

// Registered users Can only delete their reviews
regd_users.delete("/auth/review/:isbn", (req, res) => {
  let session = req.session;
  if(!session?.authorization){
    return res.status(400).json({message: "Please login first and try again"});
  }else{
    let isbn = req.params.isbn;
    const username = req.session.authorization.username;
    if (!isbn) {
      return res.status(400).json({ message: "ISBN is required" });
    }else {
      let book = books.find(book => book.isbn === isbn);
      if(book){
        const existingReviewIndex = book.reviews.findIndex(book_review => book_review.username === username);
        if (existingReviewIndex > -1) {
          // Delete the existing review
          book.reviews.splice(existingReviewIndex, 1);
          return res.status(200).json({ message: 'Review deleted successfully', reviews: book.reviews });
        } else {
          return res.status(404).json({ message: 'No review found for user' });
        }
      }
      else{
          return res.status(404).json({message: "No book found with ISBN: " + isbn});
      }
    }
  }

});

module.exports.authenticated = regd_users;