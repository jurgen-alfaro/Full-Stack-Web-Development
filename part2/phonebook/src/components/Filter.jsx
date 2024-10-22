const Filter = ({ persons, setFilteredPersons }) => {
    
    const handleFilterByName = (e) => {
        const filtered = persons.filter(person => person.name.toLowerCase().includes(e.target.value))
        setFilteredPersons(filtered)
    }

    return (
        <div>
            filter shown with: <input onChange={handleFilterByName} />
        </div>
    )
}

export default Filter