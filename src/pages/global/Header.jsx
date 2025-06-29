import React from 'react'
import { ImagePath } from '../../constant/ImagePath'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/reducers/authSlice'
import storage from "redux-persist/lib/storage";

export default function Header() {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    storage.removeItem("persist:root");
  }
  return (
     <header className="flex justify-between items-center px-6 py-2 bg-white shadow-md">
      <div>
        <Link to={`/${userInfo.userRole}`}>
          <img 
          src={ImagePath.headerLogo}
          alt="Company Logo"
          className="object-contain w-22 h-16"
          />
        </Link>
      </div>

      <div className="hidden sm:flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-lg font-bold">
        <p className="text-[#88221D]">HOLISTIC</p>
        <p className="text-[#1B7832]">HEALING</p>
        <p className="text-[#243A73]">HUMAN PVT. LTD.</p> 
      </div>

      <div className='hidden sm:flex flex-row sm:items-center gap-2 sm:gap-3  '>
        <div className='sm:flex flex-row sm:items-center gap-1 sm:gap-2 text-lg font-bold'>
             <p>{userInfo.userRole.toUpperCase()}</p>
             <p>{userInfo.user.username}</p>
        </div>
        <div>
            <button onClick={handleLogout} className='p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 ease-in-out shadow-sm'>
              Logout
            </button>
        </div>
      </div>
    </header>
  )
}
