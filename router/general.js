const express = require('express');
let userExist = require("../utils/userExists.js").isValid;
let users = require("../utils/userExists.js").users;
let getBooks = require("../utils/getBooks.js").getBooks;
const public_users = express.Router();


//  Register Users to the App
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

//Check if user exists
if(username && password){
    if(userExist(username)){
        return res.status(400).json({message: "User already exists"});
    }
    else{
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User registered successfully"});
    }
}
   return res.status(404).json({message: "Please supply username and password and try again"});
  
});



// Get the book list available in the shop
public_users.get('/', async (req, res) => {
  //Return all Books
  try {

    let allBooks = await getBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving books' });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async (req, res) => {
  //Return all books based on ISBN numbers
  try {
    let books = await getBooks();
    let isbn = req.params.isbn;
    if(isbn){
        let book = books.filter(book => book.isbn === isbn);
        if(book){
            return res.status(200).json(book);
        }
        else{
            return res.status(404).json({message: "No book found with ISBN: " + isbn});
        }
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving book with ISBN:'+ isbn });
  }
   
 });
  
// Get book details based on author
public_users.get('/author/:author',async (req, res) => {
 try {
    let books = await getBooks();
    let author = req.params.author;
    if(author){
        let book = books.filter(book => book.author === author);
        if(book){
            return res.status(200).json(book);
        }
        else{
            return res.status(404).json({message: "No book found with ISBN: " + isbn});
        }
    }
    
 } catch (error) {
    return res.status(500).json({ message: 'Error retrieving book By:'+ author });
 }

  
});

// Get all books based on title
public_users.get('/title/:title',async (req, res)=> {

try {
    let books = await getBooks();
    let title = req.params.title;
    if(title){
        let book = books.filter(book => book.title === title);
        if(book){
            return res.status(200).json(book);
        }
        else{
            return res.status(404).json({message: "No book found with ISBN: " + isbn});
        }
    }
    
} catch (error) {
    return res.status(500).json({ message: 'Error retrieving book with title:'+ title });
}

  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
    if(isbn){
        let book = books.filter(book => book.isbn === isbn);
        if(book){
            const reviews = book[0].reviews;
            return res.status(200).json(reviews);
        }
        else{
            return res.status(404).json({message: "No book found with ISBN: " + isbn});
        }
    }
});

module.exports.general = public_users;
