import React from 'react'
import { Link } from 'react-router-dom'

const PublicHome = () => {
  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Role Based Auth System
        </h1>

        <p className="text-gray-600 mb-8">
          Public page accessible by everyone.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-black px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PublicHome