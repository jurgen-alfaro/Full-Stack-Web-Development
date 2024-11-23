require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();
const baseUrl = '/api/persons';

// Middleware
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

// eslint-disable-next-line no-unused-vars
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(requestLogger);

let persons = [];

app.get(baseUrl, (request, response) => {
  Person.find({}).then((people) => {
    persons = people;
    response.status(200).json(people);
  });
});

app.get('/api/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const html = `
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
      `;
      response.send(html);
    })
    .catch((error) => next(error));
});

app.get(`${baseUrl}/:id`, (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete(`${baseUrl}/:id`, (request, response, next) => {
  const id = request.params.id;
  // persons = persons.filter((person) => person.id !== id);

  Person.findByIdAndDelete(id)
    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// const generateId = () => {
//   return Math.floor(Math.random() * 1000);
// };

app.post(`${baseUrl}`, (request, response, next) => {
  const body = request.body;
  const { name, number } = body;

  if (!name) {
    return response.status(400).json({
      error: 'name missing',
    });
  }
  if (!number) {
    return response.status(400).json({
      error: 'number missing',
    });
  }

  // const isNameRepeated = persons.some((person) => person.name === body.name);
  // if (isNameRepeated) {
  //   return response.status(400).json({
  //     error: 'name must be unique',
  //   });
  // }

  const person = new Person({
    name: name,
    number: number,
  });

  persons = persons.concat(person);
  person
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put(`${baseUrl}/:id`, (request, response, next) => {
  const body = request.body;

  // Update number only
  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(unknownEndpoint);
// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
