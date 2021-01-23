
const express = require('express')
const bodyParser = require('body-parser')
const app = express()	
const MongoClient = require('mongodb').MongoClient

//Connecting to mongodb 
var url = "mongodb://localhost:27017/"
MongoClient.connect(url, {useUnifiedTopology: true})
	.then(client => {
		console.log('Connected to database')
		const db = client.db('user_info')
		const userCollection = db.collection('userdata')
		
		//Use ejs for rendering HTML 
		app.set('view engine', 'ejs')
		app.use(express.urlencoded())
		app.use(express.json())
		app.listen(3000, function() {console.log('listening on 3000')})
		
		//Render HTML to show the user details
		app.get('/', (req, res) => {
		db.collection('userdata').find().toArray()
		.then(results => {
			res.render('index.ejs', {userdata:results})
		})
		.catch(error => console.error(error))
		})
		
		// Insert records into mongodb and redirect to / to show current info
		app.post('/userdata', (req, res) => {
		console.log(req.body)
		userCollection.insertOne(req.body)
		.then(result => {
			res.redirect('/')
			})
		})
		
		// Update the most recently inserted record
		app.put('/userdata', (req, res) => {
			 userCollection.findOneAndUpdate(
				 { "_id":{ $ne: "NONE" } },
				 {
					 $set: {
						 name: req.body.name,
						  age: req.body.age,
	                                        email: req.body.email,
						interest: req.body.interest
					 }
				 },
				 {
					 upsert: true,
					 sort:{ _id: -1}
				}
			 )
			.then(result => {
				console.log(result)
			})
			.catch(error => console.error(error))
		})
		
		// Delete the most recently inserted record
		app.delete('/userdata', (req, res) => {
			userCollection.findOneAndDelete(
				 {"_id": {$ne: "NONE"}},
				{"sort": {"_id": -1}}
			)
		})
			
		// Create a dowloadable PDF
		app.get('/download', (req, res) => {
		
			const PDFDocument = require('pdfkit')
			const fs = require('fs')
			
			var pdfDoc = new PDFDocument
			pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'))
			

			db.collection('userdata').find().toArray()
			.then(results => {
				console.log(results[0])
				pdfDoc.text(results[0], 150, 150)
			})

			pdfDoc
		    	.fillColor('red')
		    	.fontSize(17)
		    	.text("20%", 305, 150)
			pdfDoc.end()
			
			//res.download(__dirname + '/SampleDocument.pdf')
			//res.sendFile(__dirname + "/SampleDocument.pdf")
			console.log(__dirname)
			
			res.attachment(__dirname + '/SampleDocument.pdf')
		})

	})	
	.catch(error => console.error(error))

