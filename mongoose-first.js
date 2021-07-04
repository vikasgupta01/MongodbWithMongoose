// Mongoose - 1. introduction to mongoose and create/insert operations using it.

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});


// --------------------------------- Part 1 ----------------------------------- creating a collection using mongoose. -----------

// creating schema layout of fruits (i.e. layout of how they'll be stored in our DB)
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});


// new model of fruit which will create a new collection and will be used below to create a new fruit.
// we use singular form here, but behind the scenes mongoose will use lodash library to create collection named fruits (plural)
const Fruit = mongoose.model("Fruit", fruitSchema);


// creating a new fruit using model above
const fruit = new Fruit({
    rating: 2,
    review: "You sure it's a fruit? Why is it sold at vegetable shops and not at fruit shops then??"
});

// running fruit.save(); again and again will keep creating new fruit instance in db for the same fruit.
// fruit.save();


const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// will create new collection named people
const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Vikas",
    age: 23
});

// saves/inserts individual objects
// person.save();



// saving multiple fruits at once...
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit ever!!"
});

const orange = new Fruit({
    name: "Orange",
    rating: 5,
    review: "Tastes okay, but too sour sometimes."
});

const banana = new Fruit({
    name: "Banana",
    rating: 4,
    review: "You eat them when you have to eat a fruit but have no money."
});



// commenting as we've already inserted the three fruits above.

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved all the fruits to fruitsDB!");
//     }
// });




// Mongoose - 2. Reading from your database with mongoose.
// ----------------------------- Part 2 --------------------------- Reading the content of a collection using mongoose. ---

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

