 import React from 'react'

const SampleQuestions = ({title}) => {
    console.log(title)
  return (
    <div className='border-2 border-gray-400 h-28 m-2 p-2 rounded-xl w-1/6 opacity-75 hover:bg-fuchsia-400 cursor-pointer'>
        <div className='p-1 pb-10 from-neutral-700'>{title}</div>
        <img className='h-4 px-1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt9wS4Mrvu47uf4E-cm8R2qzISk-eEq7Llog&s"/>
    </div>
  )
}

export default SampleQuestions