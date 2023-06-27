import { Link } from 'react-router-dom'

interface Props {}

const Logo = ({ }: Props) => {
  return (
    <Link to={'/home'}>
        <p className='font-sans text-4xl text-primary-100 font-bold'>Facebook</p>
    </Link>
  )
}

export default Logo