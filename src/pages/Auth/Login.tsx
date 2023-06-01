// import React from 'react'
import { Person2Outlined , KeyOutlined } from '@mui/icons-material'
import bgCover from '../../assets/bg-cover.jpg'
type Props = {}

const Login = (props: Props) => {
  return (
    <div>
      <img/>
      <div className='bg-neutral-800 h-screen w-full flex justify-center items-center'>
        <form className='bg-black flex flex-col gap-6 p-3 w-[400px]'>
          <h1 className='text-white text-center'>Login</h1>
          {/* <hr className='border-[1px] border-neutral-700'/> */}
          <div className='text-white flex items-center gap-3 border border-neutral-700 p-3'>
            <Person2Outlined/>
            <input type='text'  className='bg-transparent outline-none w-full placeholder:text-white' placeholder='Username'/>
          </div>
          <div className='text-white flex items-center gap-3 border border-neutral-700 p-3'>
            <KeyOutlined/>
            <input type='text'  className='bg-transparent outline-none w-full placeholder:text-white' placeholder='Username'/>
          </div>
        
          <button className='text-white bg-neutral-600/30 border border-neutral-700 p-3'>
            Login
          </button>
        </form>
      </div>

    </div>
  )
}

export default Login