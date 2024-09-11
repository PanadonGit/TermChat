const prisma = require('../../lib/prisma-utils')
const express = require('express')
const argon2 = require('argon2');

const LoginRouter = express.Router()
const { loginSchema, registerSchema } = require('../../lib/yup-utils')

LoginRouter.post('/login', async (req, res) => {
  //login logic goes here ===================================
  const { user, password } = req.body;

  await loginSchema.validate({ email: user, password: password })
    .then(async () => {

      const userResult = await prisma.user.findUnique({
        where: {
          email: user,
        },
      });

      //To Avoid Time based attack, I need to call await argon2.verify(HashedPassword, password) wheter there's a username or not.
      if (!userResult) {
        await argon2.verify("$argon2id$v=19$m=65536,t=3,p=4$Mmk9iroJLVy0/mp4IMQY5w$Z4KmKN/7PGLuC7wB1XDwkH+2pfEOyO+xSCHkk3yUS3c", "1");
        return res.status(403).json({ "msg": "Invalid Email or Password" });
      }

      if (await argon2.verify(userResult.password, password)) return res.sendStatus(200);
      return res.status(403).json({ "msg": "Invalid Email or Password" });

    })


    .catch((err) => {
      console.error(err);
      return res.status(403).json({ "msg": err.errors[0] });
    })
    .catch(
      (err) => {
        console.error(err);
        return res.status(500).json({ "msg": "something went wrong" });
      }
    );
  // ========================================================================

});


LoginRouter.post('/register', async (req, res) => {
  //Register logic goes here ===================================
  const { email, password, firstname, lastname, username } = req.body;
  console.log(req.body)
  await registerSchema.validate({ email, password, firstname, lastname, username })
    .then(
      async () => {
        // const hasedPassword = await argon2.hash(password);
        // const newUser = await prisma.user.create({
        //   data: {
        //     email: email,
        //     username: username,
        //     lastname: lastname,
        //     firstname: firstname,
        //     password: hasedPassword
        //   },
        // });
        // console.log("New user created:", newUser);

        return res.sendStatus(200);

      }
    )
    .catch((err) => {
      return res.status(403).json({ "msg": err.errors[0] });
    })
    .catch(
      (err) => {
        console.error(err);
        return res.status(500).json({ "msg": "something went wrong" });
      }
    );

  // ========================================================================

});







module.exports = LoginRouter
