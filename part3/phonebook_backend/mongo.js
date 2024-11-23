const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('"Password" required as an argument');
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = `mongodb+srv://jurgen:${password}.@nextjscluster.eqz4cyx.mongodb.net/phone_book`;
// // mongodb+srv://jurgen:Democracia00.@nextjscluster.eqz4cyx.mongodb.net/
mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', personSchema);

function createPerson(name, number) {
  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(result);
    console.log('Person saved!');
    mongoose.connection.close();
  });
}

function getPhonebookContacts() {
  Person.find().then((result) => {
    console.log(result);
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  if (!personName || !personNumber) {
    console.log('"Name" and "Number" are required');
    process.exit(1);
  } else {
    createPerson(personName, personNumber);
  }
} else {
  getPhonebookContacts();
}
