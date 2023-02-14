const express=  require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const app = express();


mongoose.connect('mongodb+srv://pawelsmolarski95:pawel@adsapp.kqdalg2.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true });


const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => {
  console.log('Error' + err);
});

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use((req, res) => {
    res.status(404).json({ message: '404 not found...'})
});

module.exports = server; 