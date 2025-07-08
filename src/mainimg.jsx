import React from 'react'

const Mainimg = () => {
  return (
    <div className='relative flex items-center'>
      <div className="main-text w-full h-full z-40 absolute flex items-center justify-center">
        <a href="#"   className=" block justify-center items-center ml-9 w-1/3 h-auto  p-6 m-5 backdrop-blur-sm hover:backdrop-blur-2xl rounded-2xl duration-300 delay-50 ease-in-out border border-gray-700 shadow-sm  dark:bg-transparent  ">

          <h5   className="flex items-center justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Find Your Perfect Home with ReelEstate !</h5>
          <p   className="flex items-center justify-center text-justify [text-align-last:center] font-normal text-gray-700 dark:text-gray-400">Discover homes that match your lifestyle. Whether you're buying, selling, or renting, we bring you the best properties with expert guidance, trusted service, and personalized care. Start your real estate journey today.</p>
          <div className="btn flex items-center justify-center w-full h-auto p-5 ">
                    <button className='"flex items-center bg-gray-300 transition ease-in-out scale-110 duration-300 hover:bg-amber-500 m-1 px-3.5 py-1 rounded-2xl hover:cursor-pointer'>Explore </button>
                </div>
          
        </a>
      </div>
      <div className="main-struct">
        <img src="\assets\bg3.jpg" alt="main-image" className="bg-img h-2/5 opacity-50 z-0" />
      </div>
    </div>
  )
}

export default Mainimg
