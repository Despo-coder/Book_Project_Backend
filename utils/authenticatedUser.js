// AUthenticate username and Password

// Grab User Array from memory
let users = require("../utils/userExists.js").users;

// Check if user exists with correct uname/pwd.
// Return true if user exists with correct uname/pwd, else false
const authenticatedUsers = (username, password)=> {
    const userExist = users.filter(user => user.username === username && user.password === password)
    if(userExist.length>0){
        return true
    }else{
        return false
    }
}

module.exports.authenticatedUsers = authenticatedUsers;