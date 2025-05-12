const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const users = [];


app.get('/', (req, res) => {
  res.send('Welcome to the User Registration API');
});


app.post('/signup', (req, res) => {
  
  const { username, email, password, dateOfBirth } = req.body;


  if (!username) {
    return res.status(400).json({ error: 'Username cannot be empty' });
  }


  if (!email) {
    return res.status(400).json({ error: 'Email cannot be empty' });
  }

 
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password length should be greater than 8' });
  }

  if (password.length > 16) {
    return res.status(400).json({ error: 'Password length should be less than or equal to 16' });
  }

 
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ error: 'Username already taken' });
  }

  
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  
  const newUser = {
    username,
    email,
    password, 
    dateOfBirth
  };

 
  users.push(newUser);

 
  res.status(201).json({
    message: 'User registered successfully',
    user: {
      username: newUser.username,
      email: newUser.email
    }
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
