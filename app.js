const mysql = require('mysql2');
const express = require('express');
const app = express();

const {
  createRandomAuthor,
  createRandomEditor,
  createRandomUser,
  createRandomLoan,
} = require('./services/fakeData');

const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: '',
});

connection.connect();

app.listen(3310, () => {
  console.log('Server started...');
});

const numberAuthors = 5;
const numberEditors = 5;
const numberUsers = 5;
const numberLoaners = 5;
const randomAuthor = createRandomAuthor(numberAuthors);
const randomEditor = createRandomEditor(numberEditors);
const randomUser = createRandomUser(numberUsers);
const randomLoan = createRandomLoan(numberLoaners, randomUser);

const insertAuthors = 'INSERT INTO  author(name) VALUES (?)';
const queryAuthors = 'SELECT * from author';
for (let i = 0; i < numberAuthors; i++) {
  connection.query(
    insertAuthors,
    [randomAuthor[i].name],
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
    }
  );
}

app.get('/authors', function (req, res) {
  connection.query(queryAuthors, function (error, results, fields) {
    if (error) {
      console.error('error with the query authors');
      return res.status(500).send('An error occurred while fetching authors.');
    }
    console.log(results);
    res.json(results);
  });
});

const insertEditors = 'INSERT INTO  editor(name) VALUES (?)';
const queryEditors = 'SELECT * from editor';
for (let i = 0; i < numberEditors; i++) {
  connection.query(
    insertEditors,
    [randomEditor[i].name],
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
    }
  );
}

app.get('/editors', function (req, res) {
  connection.query(queryEditors, function (error, results, fields) {
    if (error) {
      console.error('error with the query editors');
      return res.status(500).send('An error occurred while fetching editors.');
    }
    console.log(results);
    res.json(results);
  });
});

const insertUsers =
  'INSERT INTO user(firstname, lastname, age, phone_number) VALUES (?,?,?,?)';
const queryUsers = 'SELECT * from user';
for (let i = 0; i < randomUser.length; i++) {
  // const params = [
  //   randomUser[i].firstname,
  //   randomUser[i].lastname,
  //   randomUser[i].age,
  //   randomUser[i].phone_number,
  // ];
  // console.log(params, 'params', randomUser, 'User');
  connection.query(
    insertUsers,
    [
      randomUser[i].firstname,
      randomUser[i].lastname,
      randomUser[i].age,
      randomUser[i].phone_number,
    ],
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
    }
  );
}

app.get('/users', function (req, res) {
  connection.query(queryUsers, function (error, results, fields) {
    if (error) {
      console.error('error with the query users');
      return res.status(500).send('An error occurred while fetching users.');
    }
    console.log(results);
    res.json(results);
  });
});

const insertLoans =
  'INSERT INTO loan(date_start,date_end, date_returned, user_id) VALUES (?,?,?,?)';
const queryLoans = 'SELECT * from loan';

console.log(randomLoan.length, 'longueur');
for (let i = 0; i < randomLoan.length; i++) {
  // const params = [
  //   randomLoan[i].date_start,
  //   randomLoan[i].date_end,
  //   randomLoan[i].date_returned,
  //   randomLoan[i].user_id,
  // ];
  // console.log(params, 'params', randomUser, 'User');
  connection.query(
    insertLoans,
    [
      randomLoan[i].date_start,
      randomLoan[i].date_end,
      randomLoan[i].date_returned,
      randomLoan[i].user_id,
    ],
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
    }
  );
}

app.get('/loans', function (req, res) {
  connection.query(queryLoans, function (error, results, fields) {
    if (error) {
      console.error('error with the query loans');
      return res.status(500).send('An error occurred while fetching loans.');
    }

    res.json(results);
  });
});

// connection.query(
//   queryAuthors,
//   queryEditors,
//   queryUsers,
//   queryLoans,
//   function (error, results) {
//     if (error) throw error;
//     console.log(results);
//   }
// );

// connection.end();
