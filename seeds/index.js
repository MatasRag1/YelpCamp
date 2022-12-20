const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/Yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 20;
    const camp = new Campground({
      //YOUR USER ID
      author: '63931bbd3bd085b2096aacbc',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem expedita eum animi corporis harum fugit vitae mollitia officiis ullam. Itaque facilis sapiente minus voluptatibus est autem adipisci repellendus deleniti.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dvznxwrep/image/upload/v1671110478/YelpCamp/mjunxbb4q7hz9nawvpoa.jpg',
          filename: 'YelpCamp/mjunxbb4q7hz9nawvpoa',
        },
        {
          url: 'https://res.cloudinary.com/dvznxwrep/image/upload/v1671110478/YelpCamp/dwpdcu6xlelisnzqfknp.jpg',
          filename: 'YelpCamp/dwpdcu6xlelisnzqfknp',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
