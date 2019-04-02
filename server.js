const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/namegen', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  //dest: '/var/www/cp4.dskou7.com/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const nameSchema = new mongoose.Schema({
  name: String,
  type: String,
});

// Create a model for items in the museum.
const Name = mongoose.model('Name', nameSchema);

//don't need that file uploader bit

// Create a new item. Takes name and what type of name it is.
app.post('/api/items', async (req, res) => {
  const item = new Name({
    name: req.body.name,
    type: req.body.type,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Name.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//deletes stuff. you know. like the delete method would
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Name.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//update. title or description. or both.
app.put('/api/items/:id', async (req, res) => {
  try {
    item = await Name.findOne({
      _id: req.params.id
    });
    item.name = req.body.name;
    item.type = req.body.type;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
