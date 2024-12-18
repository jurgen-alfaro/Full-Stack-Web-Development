const Part = ({part, exercise})  => (
    <p>{part} {exercise}</p>
)

const Content = ({course}) => {
  const {parts} = course

  return (
    <>
        <Part part={parts[0].name} exercise={parts[0].exercises} />
        <Part part={parts[1].name} exercise={parts[1].exercises} />
        <Part part={parts[2].name} exercise={parts[2].exercises} />
    </>
  )
}

export default Content