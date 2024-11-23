const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url)
  // eslint-disable-next-line no-unused-vars
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: [true, 'El número de teléfono es obligatorio'],
    validate: {
      validator: function (value) {
        // Validar que cumpla con el formato "XX-XXXXXXXX" o "XXX-XXXXXXXX"
        return /^[0-9]{2,3}-[0-9]{5,}$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid phone number. Must be in format XX-XXXXXXXX or XXX-XXXXXXXX.`,
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
