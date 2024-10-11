
const StatisticsLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{isNaN(value) ? "0" : value}</td>
        </tr>
    )
}


const Statistics = ({good, neutral, bad, allComments, average}) => {
    if (allComments === 0) {
        return <p>No feedback given</p>
    }

    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <StatisticsLine text="good" value={good} />
                    <StatisticsLine text="neutral" value={neutral} />
                    <StatisticsLine text="bad" value={bad} />
                    <StatisticsLine text="all" value={allComments} />
                    <StatisticsLine text="average" value={average / allComments} />
                    <StatisticsLine text="positive" value={`${(good / allComments * 100)}`} />
                </tbody>
            </table>
        </div>
    )
}

export default Statistics