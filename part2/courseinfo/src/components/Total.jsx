const Total = ({course}) => {
  const { parts } = course  

  const total = parts.reduce((acc, currValue) => acc + currValue.exercises , 0)
    
  return (
    <strong>Number of exercises {total}</strong>
  )
}

export default Total