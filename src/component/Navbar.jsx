import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-purple-300'>
    <div className="mycontainer flex justify-between items-center gap-10 px-2 h-14 py-5">

    <div className='logo font-bold '>
     <span className='text-green-400 text-xl'>&lt;</span> 
         <span className='text-xl'>Pass</span>
     <span className='text-green-600 text-xl'>OP/&gt;</span>
      <span className='text-green-400 text-bold text-xl'>&gt;</span>
    </div>
    <ul>
    <li className="flex gap-6">
    <a className="hover:font-bold transition-all duration-300 ease-in-out" href="/">Home</a>
    <a className="hover:font-bold transition-all duration-300 ease-in-out pointer-events: none" href="">About</a>
    <a className="hover:font-bold transition-all duration-300 ease-in-out pointer-events: none" href="">Contact</a>
    <a href=""></a>
</li>


    </ul>
    <button className='bg-slate-400 rounded-2xl flex justify-between items-center font-bold'>
     <img className='w-10 h-10 object-cover '  src="/github-sign.png" alt="" />
    </button>
    </div>
   </nav>
  )
}

export default Navbar
