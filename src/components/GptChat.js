import React from 'react'
import SampleQuestionsConatiner from './SampleQuestionsConatiner'
import ChatRoom from './ChatRoom'

const GptChat = () => {
  return (

   
 <div className=' bg-fuchsia-200 w-screen pb-[20%]'> 
    <p className='w-[50%] pt-[10%] text-center text-5xl justify-center ml-[25%]'>
    Hi There! What would you like to know?   
    </p>
    <div className='mt-10'>
    <SampleQuestionsConatiner/>
    </div>
    <div>
    <ChatRoom/>
    </div>
</div> 
  )
}

export default GptChat