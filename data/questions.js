export async function getQuestions(){
  const response = await fetch('./data/questions.json')
  const data = await response.json()
  console.log(data)
  return data
}
