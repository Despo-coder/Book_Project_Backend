// Create Empty User Array
// Create isValid Function to check if user exists
// Export isValid Function and users Array as a module to be used in other files.

let users = [];

const isValid = (username)=>{ 
    const userExist = users.filter(user => user.username === username)
    if(userExist.length>0){
        return true
    }else{
        return false
    }
}
module.exports.isValid = isValid;
module.exports.users = users;