// import React, { useEffect } from 'react'
import StoryComponent from '../Posts/Story'
import Posts from '../Posts'


const Body = () => {

  return (
    <div className='h-full w-full min-h-[100vh] max-w-[700px] flex flex-col gap-3 sm:gap-6'>
        <StoryComponent />
        <Posts/>
    </div>
  )
}

export default Body