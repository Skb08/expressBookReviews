const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // {
  //   "username":"skb",
  //   "password":"1234"

  // }

  if (username && password) {
      if (!isValid(username)) {
          users.push({ "username": username, "password": password });
          return res.status(200).json({ message: "customer successfully registred. Now you can login" });
      } else {
          return res.status(404).json({ message: "customer already exists!" });
      }
  }
  return res.status(403).json({ message: "Unable to register customer." });
});


// Get the book list available in the shop
public_users.get("/",(req,res)=>{
  res.send(JSON.stringify(books,null,4));

});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  res.send(books[isbn])
 });
 

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  for(var k in books){
    if(books[k].author == author){
      res.send(books[k])
    }
  }
});
  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  for(var k in books){
    if(books[k].title == title){
      res.send(books[k])
    }
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  res.send(books[isbn].reviews)
 });
 
module.exports.general = public_users;
