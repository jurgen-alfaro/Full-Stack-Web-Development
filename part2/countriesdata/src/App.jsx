import { useState, useEffect } from 'react'
import countryService from './services/country'
import CountryDetails from './components/CountryDetails'

function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleChange = (e) => {
    setCountry(e.target.value)
  }

  const handleClick = (country) => {
    const filtered = countries.filter(c => c.name.common.toLowerCase() === country.name.common.toLowerCase())
    setFilteredCountries(filtered)
  }

  useEffect(() => {
    countryService.getAllCountries()
      .then(countriesList => {
        setCountries(countriesList)
      })
  }, [])

  useEffect(() => {
    if (countries) {
      const filtered = countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))      
      setFilteredCountries(filtered)
      console.log(filtered);
      
    }
  }, [country])


  if(!countries) {
    return <p>Loading countries...</p>
  }

  return (
    <>
      <div>
        find countries <input type='text' value={country} onChange={handleChange} />
        {filteredCountries.length > 10 && 
          <p>Too many matches, specifiy another filter</p>
        }
        {filteredCountries.length > 1 && filteredCountries.length <= 10 && 
          filteredCountries.map(c => (
            <div key={c.name.common}>
              {c.name.common} <button type='button' onClick={() => handleClick(c)}>show</button>
            </div>
          ))
        }
        {filteredCountries.length === 1 && 
          <CountryDetails country={filteredCountries[0]} />
        }
      </div>
    </>
  )
}

export default App
