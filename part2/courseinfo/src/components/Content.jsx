const Part = ({part, exercise})  => (
    <p>{part} {exercise}</p>
)

const Content = ({course}) => {
  const {parts} = course

  return (
    <>
        {parts.map((part) => (
          <Part key={part.id} part={part.name} exercise={part.exercises} />
        ))}
    </>
  )
}

export default Content