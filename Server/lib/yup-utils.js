 const {object, string, number, date, InferType } = require('yup');


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const allowedChar = /^[A-Za-z\d@$!%*?&]*$/;
const noSpecialCharsUnicodeRegex = /^[\p{L}\p{N}]+$/u;



let loginSchema = object({
    email: string().email("Invalid Email").required('Email is required'),
    password: string().matches(allowedChar,'Invalid Username or Password').required('Password is required')
  });

let registerSchema = object({
    firstname: string().matches(noSpecialCharsUnicodeRegex,'First Name must contains no special characters').required('First Name is required'),
    lastname: string().matches(noSpecialCharsUnicodeRegex,'Last Name must contains no special characters').required('Last Name is required'),
    email: string().email("Invalid Email").required('Email is required'),
    username: string().min(5,'Username must be more than 5 characters').max(30,'Username must be less than 30 characters').matches(allowedChar,'Special characters not allowed').required('Username is required'),
    password:string().matches(passwordRegex,'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.').required('Password is required') ,
  });



  

module.exports ={
    registerSchema,
    loginSchema,
}























//   model User {
//     id    Int     @id @default(autoincrement()) 
//     email String  @unique
//     username String  @unique 
//     firstname  String
//     lastname  String
//     friends   User[]   @relation("UserFriends")
//     friendsOf User[]   @relation("UserFriends")
//     description String?
//     password String
//   }