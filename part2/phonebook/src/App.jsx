import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'
import Notification from './components/Notification'
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();

    const person = persons.find(p => p.name === newName)
        
    if (person) {
      if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
        
        const changedPerson = { ...person, number: newNumber }

        personService.update(person.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson ))
            setFilteredPersons(persons.map(p => p.id !== person.id ? p : updatedPerson ))

            setNotificationMessage(`Updated ${person.name}'s number`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch(error => {
            console.log(error) 
            setNotificationMessage(`Information of ${changedPerson.name} has already been removed from server`)
            setIsError(true)
            setTimeout(() => {
              setNotificationMessage(null)
              setIsError(false)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
            setFilteredPersons(persons.filter(p => p.id !== person.id))
          })

        return
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService.create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        setFilteredPersons(persons.concat(person))

        setNotificationMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })

    setNewName("")
    setNewNumber("")
  }

  const handleDelete = personId => {
    const person = persons.find(p => p.id === personId)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(personId)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
          setFilteredPersons(persons.filter(p => p.id !== deletedPerson.id))
        })
    }
  }

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons)
        setFilteredPersons(persons)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter persons={persons} setFilteredPersons={setFilteredPersons}/>
      <h3>add a new</h3>
      <PersonForm 
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit} 
      /> 
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    
      <div>debug: {newName}</div>
    </div>
  )
}

export default App