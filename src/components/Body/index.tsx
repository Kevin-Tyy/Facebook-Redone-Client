// import React, { useEffect } from 'react'
import PostComponent from '../Posts/Post'
import StoryComponent from '../Posts/Story'
import Posts from '../Posts'
interface Props {
  userInfo : Object
}


const Body = ({userInfo} : Props) => {

  return (
    <div className='h-full flex flex-col gap-6'>
        <StoryComponent userInfo={userInfo}/>
        <PostComponent userInfo={userInfo}/>
        <Posts/>
    </div>
  )
}

export default Body