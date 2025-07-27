import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 font-bold h-14 md:h-12'>
        <div className='flex justify-between  p-4 px-2 md:p-1.5 md:px-5'>
            <div className=''>
                {/* <span className='text-white md:text-2xl'>&lt;</span> */}
                <span className='text-emerald-50 text-xl md:text-2xl'>Password</span><span className='text-blue-400 text-xl md:text-2xl' >-Manager{/*&gt;*/}</span>
            </div>
            <div className='text-xl md:text-2xl text-white'>Home</div>
        </div>
        
      
    </nav>
  )
}

export default Navbar
