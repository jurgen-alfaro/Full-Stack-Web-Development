
const MostVotes = ({anecdotes, votes}) => {
  
    const mostVoted = votes.indexOf(Math.max(...votes)) 



    return (
        <>
            <p>{anecdotes[mostVoted]}</p>
            <p>has {votes[mostVoted]} votes</p>
        </>
    )
}

export default MostVotes