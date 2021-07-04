// Mongoose - 3. Data validation with mongoose.
// Mongoose makes validation of data entry a log easier. Instead of having to write assert statements all over the place 
// and specifying things, we can use mongoose as built in validation check to make it a log easier and a lot quicker to use.
// Read about 'validations' from mongoose documentation.


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check data entry, No name specified."]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// // a rating more than maximum allowed (10) throws error.
// const fruit = new Fruit({
//     name: "Peach",
//     rating: 21,
//     review: "Peaches are yummy"
// });

// // // throws error as name is required in model.
// const fruit = new Fruit({
//     rating: 6,
//     review: "No name for this fruit. Should throw exception as names are required!"
// });


// doing everything as intended works fine.
const fruit = new Fruit({
    name: "Peach",
    rating: 10,
    review: "Peaches are yummy"
});
// already saved, so commenting fruit.save();
// fruit.save();


Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err);
    } else {
        console.log("find function works fine");
        // console.log(fruits);
        fruits.forEach(fruit => {
            console.log(fruit.name);
        });
        console.log("We're able to use mongoDB data as javascript object using mongoose.");
    }
    // applying the auto close method for mongoose connection at the end of our last method.
    mongoose.connection.close();
});

