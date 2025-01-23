import React from 'react'
import SampleQuestions from './SampleQuestions'

const questions=["How many tables are there in database?", "Find me the number of artists", "What is the database about?", "How many customers for different albums?"]

const SampleQuestionsConatiner = () => {
  return (
    <div className='flex ml-[20%] gap-6'>
        {questions.map((item)=><SampleQuestions title={item}/>)}
    </div>
  )
}

export default SampleQuestionsConatiner