import React from 'react';

const Footer = () => {
  return (
    <div className='bg-slate-800 flex flex-col justify-center items-center py-2 '>
      <div className='font-bold text-white text-2xl'>
        <span className='text-green-400 text-xl'>&lt;</span>
        <span className='text-xl'>Pass</span>
        <span className='text-green-600 text-xl'>OP/&gt;</span>
        <span className='text-green-400 text-bold text-xl'>&gt;</span>
      </div>
      <div className='text-white flex justify-center items-center'>
        Created with 
        <img className='w-5 h-5 mx-1' src="/heart.png" alt="heart" /> 
        by shubham
      </div>
    </div>
  );
};

export default Footer;
