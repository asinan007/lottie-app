import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700">

        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <span className="font-semibold text-xl tracking-tight">
              <Link href={`/`}>
                <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                  <img src={'/images/lottie.svg'} width={30} height={30} />
                </a>
              </Link></span>
          </div>
          <div className="block lg:hidden ">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700">
              Menu
            </button>
          </div>
        </div>

        <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
          <div className="text-md font-bold text-blue-700 lg:flex-grow">
            <Link href={`/`}>
              <a className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                Home
              </a>
            </Link>
            <Link href={`/about`}>
              <a className=" block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                About
              </a>
            </Link>
          </div>

          <div className="flex ">
            <Link href={`/users`}>
              <a className=" block text-md px-4  ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">Users</a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
