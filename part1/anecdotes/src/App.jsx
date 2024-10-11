import { useState } from 'react'
import Anecdote from './components/Anecdote'
import Votes from './components/Votes'
import Button from './components/Button'
import Heading from './components/Heading'
import MostVotes from './components/MostVotes'

function App() {
  const [anecdotes, setAnecdotes] = useState([
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ])


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  const getRandomAnecdote = () => {
    const anecdote = Math.floor(Math.random() * anecdotes.length)
    setSelected(anecdote)
  }

  const voteForAnecdote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes votes={votes[selected]} />
      <Button onClick={voteForAnecdote} text="vote" />
      <Button onClick={getRandomAnecdote} text="next anecdote" />
      <hr />
      <Heading text="Anecdote with most votes" />
      <MostVotes anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App
