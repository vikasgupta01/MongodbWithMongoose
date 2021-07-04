// Mongoose - 5. Establishing relationships and embedding documents using mongoose
// for our example, we'll establish a relationship b/w collections people and fruits.
// person - favourite fruit

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});



const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check data entry, No fruit name specified."]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);



// // Adding new fruit and assigning it to newly added person.
// const pineapple = new Fruit({
//     name: "Pineapple",
//     rating: 9,
//     review: "Great fruit."
// });
// pineapple.save();
//
// const person = new Person({
//     name: "Penny",
//     age: 24,
//     favouriteFruit: pineapple
// });
// person.save();



// Adding new fruit and assigning it to an existing person. (update)
const papaya = new Fruit({
    name: "Papaya",
    rating: 9,
    review: "Great fruit."
});
papaya.save();

Person.updateOne(
    {name: "Vikas"}, {favouriteFruit: papaya}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Favourite fruit updated successfully!!");
        }
    }
);


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



