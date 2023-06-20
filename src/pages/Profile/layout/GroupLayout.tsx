import { Userdata } from '../../../types/Types'

interface Props {
  userData : Userdata
}

const GroupLayout = ({ userData }: Props) => {
  return (
    <div>
      <div className='text-2xl text-light text-center mt-10'>
        <span className='capitalize text-primary-100'>{userData?.username}</span> hasn't joined any groups yet
      </div>
    </div>
  )
}

export default GroupLayout