const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Twat = require('./server/TweetModel');
const cors = require('cors');
const morgan = require('morgan');

mongoose
	.connect('mongodb://localhost/crudtest', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(result => {
		console.log('MongoDb Connected');
		app.listen(5000, () => {
			console.log('Server listening to port 5000');
		});
	})
	.catch(err => console.log(err));

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// create
app.post('/twats', (req, res) => {
	const twat = new Twat({ twat: req.body.twat, number: req.body.number });
	twat
		.save()
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});
// read
app.get('/twats', (req, res) => {
	Twat.find()
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

app.get('/twats/:id', (req, res) => {
	Twat.findById(req.params.id)
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

// update
app.put('/twats/:id', (req, res) => {
	Twat.findByIdAndUpdate(req.params.id, { twat: 'Update' })
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

// delete
app.delete('/twats', (req, res) => {
	Twat.deleteMany()
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

app.delete('/twats/:id', (req, res) => {
	Twat.findByIdAndDelete(req.params.id)
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});
