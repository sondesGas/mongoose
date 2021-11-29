const { ClientSession } = require("mongodb");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
// DB connection
connectDB();

// Create a person with this prototype(Schema)
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});
// Create and Save a Record of a Model:
const Person = mongoose.model("Person", personSchema);

// (create a document instance)
const createPerson = async () => {
  const person = new Person({
    name: "Bob",
    age: 30,
    favoriteFoods: ["Piza", "Hamburger"],
  });
  try {
    const personInst = await person.save();
    // console.log(personInst);
  } catch (err) {
    console.error(err.message);
  }
};
// Create Many Records with model.create()
const arrayOfPerson = [
  { name: "Lyna", age: 32, favoriteFoods: ["lazania", "chicken", "spaguetti"] },
  { name: "Mohamed", age: 50, favoriteFoods: ["chicken", "burritos"] },
  { name: "Alice", age: 22, favoriteFoods: ["soup", "burritos", "sushi"] },
  { name: "Bob", age: 15, favoriteFoods: ["chips", "choclate"] },
  { name: "Mary", age: 40, favoriteFoods: ["soup", "burritos"] },
];
const createManyPerson = async () => {
  try {
    const manyPerson = await Person.create(arrayOfPerson);
    // console.log(manyPerson);
  } catch (err) {
    console.error(err.message);
  }
};
// Use model.find() to Search Your Database
const findPerson = async () => {
  try {
    const people = await Person.find({ name: "Bob" });
    console.log(people);
  } catch (err) {
    console.error(err.message);
  }
};
// Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = async () => {
  try {
    const onePerson = await Person.find({ favoriteFoods: "sushi" });
    console.log(onePerson);
  } catch (err) {
    console.error(err.message);
  }
};
// Use model.findById() to Search Your Database By _id
const findPersonId = async (id) => {
  try {
    const personId = await Person.findById(id);
    console.log(personId);
  } catch (err) {
    console.error(err.message);
  }
};
// Perform Classic Updates by Running Find, Edit, then Save
const updatePerson = async (id) => {
  try {
    const upPerson = await Person.findById(id);
    upPerson.favoriteFoods.push("hamburger");
    const newPerson = await upPerson.save();
    console.log(newPerson);
  } catch (err) {
    console.error(err.message);
  }
};
// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = async () => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: "Lyna" },
      { $set: { age: 20 } },
      { new: true }
    );
    console.log(person);
  } catch (err) {
    console.error(err.message);
  }
};
// Delete One Document Using model.findByIdAndRemove
const removePerson = async (id) => {
  try {
    const person = await Person.findByIdAndRemove(id);
    console.log(person);
  } catch (err) {
    console.error(err.message);
  }
};
// MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeByName = async () => {
  try {
    const res = await Person.deleteMany({ name: "Mary" });
    console.log(res);
  } catch (err) {
    console.error(err.message);
  }
};
// Chain Search Query Helpers to Narrow Search Results
const chainSearch = async () => {
  try {
    const people = await Person.find({ favoriteFoods: "burritos" })
      .sort({
        name: 1,
      })
      .limit(2)
      .select({
        age: 1,
      });

    console.log(people);
  } catch (err) {
    console.error(err.message);
  }
};
createPerson();
createManyPerson();
// findPerson();
// findOnePerson();
// findPersonId("61a414e9011a5390db433df2");
// updatePerson("61a422979474f30e08a14f9b");
// findAndUpdate();
// removePerson("61a4288bf28199e99bf220f6");
// removeByName();
// chainSearch();
