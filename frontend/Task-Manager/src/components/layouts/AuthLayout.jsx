
import React from 'react'
import UI_IMG from '../../assets/images/auth-image.png'

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="font-medium text-2xl mb-6">Task Manager</h2>
        {children}
      </div>
      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-[url('/bg-img.png')] bg-cover bg-no-repeat bg-center">
        <img src={UI_IMG} alt="Auth Illustration" className="w-64 lg:w-[90%]" />
      </div>
    </div>
  )
}

export default AuthLayout
