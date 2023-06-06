// import React, { useEffect } from 'react'
import PostComponent from '../Posts'
import Story from '../Posts/Story'
interface Props {
  userInfo : Object
}


const Body = ({userInfo} : Props) => {

  return (
    <div className='w-full flex flex-col gap-9'>
        <Story userInfo={userInfo}/>
        <PostComponent userInfo={userInfo}/>
    </div>
  )
}

export default Body