
const Persons = ({ persons, handleDelete }) => {
  return (
    persons.map(person => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <button type="button" onClick={() => handleDelete(person.id)}>delete</button>  
        </div>
    ))
  )
}

export default Persons