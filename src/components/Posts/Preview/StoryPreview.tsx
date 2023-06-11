import React from 'react'

type Props = {
  handleView : (value : any) => void
}

const StoryPreview = ({ handleView }: Props) => {
  return (
    <div className='h-screen w-full fixed top-0 right-0 left-0 bottom-0 bg-gray-950/60 backdrop-blur-[2px] z-[10]' onClick={handleView}>
       <div>
        Hello
        </div> 
    </div>
  )
}

export default StoryPreview