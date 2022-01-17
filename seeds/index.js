const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors, imgurl, imgfilename } = require('./seedHelpers');
const Campground = require('../models/campgrounds');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 500; i++) {
		const randomPic1 = Math.floor(Math.random() * imgurl.length);
		const randomPic2 = Math.floor(Math.random() * imgurl.length);
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20 + 10);
		const camp = new Campground({
			author: '61d8cee518bed6aaa91fe4e1',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, numquam asperiores perspiciatis reiciendis suscipit itaque dolores esse consectetur recusandae iusto amet voluptatem non quas quia iure pariatur maiores debitis nobis.',
			price,
			geometry: {
				type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ],
			},
			images: [
				{
					url: imgurl[randomPic1],
					filename: imgfilename[randomPic1],
				},
				{
					url: imgurl[randomPic2],
					filename: imgfilename[randomPic2],
				}
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
