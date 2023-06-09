import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Logo = (props: Props) => {
  return (
    <Link to={'/home'}>
        <p className='font-sans text-4xl text-primary-100 font-bold'>Facebook</p>
    </Link>
  )
}

export default Logo