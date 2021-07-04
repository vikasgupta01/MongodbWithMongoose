// Mongoose - 4. Updating and Deleting data on mongodb using mongoose.


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

// Part 1 : Update section
// // updateOne() method (https://mongoosejs.com/docs/api/model.html#model_Model.updateOne)
// // Commented after updating it once as we don't want this to happen in each run.
// Fruit.updateOne({_id: "60e1815ce520237a60edb2d6"}, {name: "Tomato"}, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated the document");
//     }
// });


// Part 2 : Delete section
// deleteOne() method (https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne)
// // Commented after deleting it once as we don't want this to happen in each run.
Fruit.deleteOne({_id: "60e1815ce520237a60edb2d6"}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully deleted.");
    }
});


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

