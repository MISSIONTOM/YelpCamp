const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection-error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "685ea743906f642266026978",
      location: `${cities[random1000].city}, ${cities[random1000].city}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, aut culpa! Repellendus, earum modi inventore sapiente laborum esse at vero doloribus animi quia! In cumque amet placeat, voluptas at rem!",
      price,
      geometry:{
          type:"Point",
          coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude
          ]
      },
      images: [
        {
          url: "https://res.cloudinary.com/dpbt5ybnz/image/upload/v1751469295/YelpCamp/wc9fsrf8adphp14zqklc.jpg",
          filename: "YelpCamp/wc9fsrf8adphp14zqklc",
          
        },
        {
          url: "https://res.cloudinary.com/dpbt5ybnz/image/upload/v1751469296/YelpCamp/ad37ktqzalzbq3vyxbeg.jpg",
          filename: "YelpCamp/ad37ktqzalzbq3vyxbeg",
          
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
