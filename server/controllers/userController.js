const db = require('../config/pg-config');
const { v4: uuidv4 } = require('uuid');

const userController = {};

userController.createUser = (req, res, next) => {
  // lower case user name before saving to database

  const user_id = uuidv4();
  
  const {
    first_name,
    last_name,
    birth_date,
    email,
    user_name,
    password,
  } = req.body;
  // bycrpt password before saving

  const createUserQueryString = `INSERT INTO "public"."Users" VALUES (
    '${user_id}',
    '${first_name}',
    '${last_name}',
    '${birth_date}',
    '${email}',
    '${user_name}',
    '${password}' 
  );`;

  console.log('Creating User');

  db.query(createUserQueryString)
    .then(response => {
      res.locals.user_id = user_id;
      return next();
    })
    .catch(err => {
      console.log('Error from Creating User', err);
      return next(err);
    });
};

userController.verifyUser = (req, res, next) => {
  // query data base
  let { user_name, password } = req.body;

  // user_name = 'UserName';
  // password = 'password';
  // maybe split into separate query's 
  db.query(
    `SELECT _id, first_name, user_name, password FROM "public"."Users" WHERE user_name = '${user_name}'`
  )
    .then(results => {
      // console.log('results.rows ->', results.rows);
      // run bcrypt compare
      // Error handling for incorrect username/password
      if (
        results.rows[0].user_name === user_name &&
        results.rows[0].password === password
      ) {
        // console.log('Inside if');
        res.locals.first_name = results.rows[0].first_name;
        res.locals.user_id = results.rows[0]._id;
        return next();
      } else {
        // console.log('Inside else');
        return next({
          message: "username doesn't exist or password does not match",
        });
      }
    })
    .catch(err => {
      console.log('Error from userController.verifyUser -> ', err);
      return next(err);
    });
  // get request body => will have user name and pw
};

module.exports = userController;
