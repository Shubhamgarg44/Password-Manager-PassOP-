import React, { useState,useRef, useEffect } from 'react'; // Import useState from React
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'; // Import eye icons for showing/hiding password
import { ToastContainer, toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';
    

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({site:"", username: "", password: ""})

  const [passwordArray, setpasswordArray] = useState([])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const  savepassword = async () =>{
    if(form.site.length>3 &&  form.username.length>3 && form.password.length>0 ){

      await fetch("http://localhost:3000/",
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: form.id})
  })
     
    
   setpasswordArray([...passwordArray, {...form , id:uuidv4()} ])

  //  localStorage.setItem("password", JSON.stringify([...passwordArray, {...form , id:uuidv4()} ]))
  await fetch("http://localhost:3000/",
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({...form, id: uuidv4()
        })
  })
   setform({site:'', username:'', password:''})
   toast('Password saved', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    });
  }  else{
    toast('Please fill all fields', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      });
  } 

}

  const  deletepassword = async (id) =>{
    let c = confirm("do you really want to delete?")
    if(c){
   setpasswordArray(passwordArray.filter(item=>item.id !==id))
  //  localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id !==id)))
  let req = await fetch("http://localhost:3000/",
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({id
        })
  })

   toast('Deleted successfully', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    });
    }
   }

   const  editpassword = (id,event) =>{
    if (event) {
      event.preventDefault();
    }
  
    setform({...passwordArray.filter(i=>i.id===id)[0], id: id})
    setpasswordArray(passwordArray.filter(item=>item.id !==id))
    localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id !==id)))
   }

  const handlechange = (e) => {
    setform({
       ...form,
      [e.target.name]: e.target.value,
    });
  };

  const copyText = (text)=>{
    toast('🦄 Copied To Clipboard ', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text)
  }

  const getPassword = async ()=>{
    let req = await fetch("http://localhost:3000/");
    let password = await req.json();
    console.log('password')
      setpasswordArray(password)
  }

  useEffect(() => {
    getPassword()
  }, []);
  

  return (
<>

    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />

    <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="p-2 md:p-0 md:mycontainer text-center">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-400 text-2xl'>&lt;</span>
          <span className='text-2xl'>Pass</span>
          <span className='text-green-600 text-2xl'>OP/&gt;</span>
          <span className='text-green-400 text-bold text-2xl'>&gt;</span>
        </h1>

        <span className='text-green-400 text-2xl'>&lt;</span>

        <p className='text-zinc-800 text-lg inline-block text-center'>
          Your Own <span className='text-green-600 text-xl'>Password</span> Manager
        </p>

        <span className='text-green-400 text-bold text-2xl'>/&gt;</span>

        {/* input */}

        <div className="flex gap-8 flex-col p-4 text-black items-center">
          <input value={form.site} placeholder='Enter Website URL' onChange={handlechange} name="site"  className='rounded-full border border-green-300 w-full py-1 p-4' type="text" id='site'/>
          
          <div className=" flex flex-col md:flex-row gap-4 w-full justify-between relative">
            <input value={form.username} name="username" className='rounded-full border border-green-300 w-full py-1 p-4' type="text"  onChange={handlechange}  placeholder='Enter User Name ' id='username' />
            <input value={form.password} className='rounded-full border border-green-300 w-full py-1 p-4' id='password' 
              type={showPassword ? 'text' : 'password'} name="password"  onChange={handlechange}  
              placeholder='Enter Password' 
            />
            <span className='absolute w-14 right-[1%] top-[22%]'>
              {showPassword ? (
                <IoMdEyeOff onClick={togglePasswordVisibility} className='w-[20px] h-5 relative hover:cursor-pointer' />
              ) : (
                <IoMdEye onClick={togglePasswordVisibility} className='w-[20px] h-5 relative hover:cursor-pointer' />
              )}
            </span>
          </div>

          <button onClick={savepassword} className='flex justify-center items-center bg-green-500 rounded-full px-4 py-2 gap-2 w-fit hover:bg-green-600'>
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
      <div className="password">

      <span className='text-green-400 text-2xl'>&lt;</span>
        <h2 className='inline-block my-3 font-bold text-3xl'> your password</h2>
        <span className='text-green-400 text-bold text-2xl'>/&gt;</span>
        {passwordArray.length ==0 && <div className='text-center font-bold text-red-600 text-6xl'> No Password To Show  </div>}

        {passwordArray.length !=0 && 
        <table className="mb-4 table-auto w-full overflow-hidden rounded-md ">
  <thead className='bg-green-500 text-white'>
    <tr>
      <th className='py-2 border border-white '>Site</th>
      <th className='py-2 border border-white '>Username</th>
      <th className='py-2 border border-white '>Password</th>
      <th className='py-2 border border-white '>Action</th>
    </tr>
  </thead>
  <tbody className='bg-green-100 '>
    {passwordArray.map((item,index) =>{
      return <tr key = {index}>
      <td className = " border border-white py-2 text-center min-w-32">
        <div className='copyicon flex items-center justify-center' onClick={()=>{copyText(item.site)}}><span>
        <a href={item.site} target ='_blank'>{item.site} </a> </span>
      <div className='size-6 flex cursor-pointer '>

      <lord-icon
    src="https://cdn.lordicon.com/lyrrgrsl.json"
    trigger="hover"
    style={{"width":"25px", "height":"25px","paddingLeft": "4px"}}>
  </lord-icon> 

      </div>
      </div>
   </td>

      <td className = "border border-white py-2 text-center">
      <div className='copyicon flex items-center justify-center' onClick={()=>{copyText(item.username)}}>
        <span>{item.username}</span>
      <div className='size-6 flex cursor-pointer '>

      <lord-icon
    src="https://cdn.lordicon.com/lyrrgrsl.json"
    trigger="hover"
    style={{"width":"25px", "height":"25px","paddingLeft": "4px"}}>
  </lord-icon> 

      </div>
      </div>
      </td>
      <td className = " border border-white py-2 text-center min-w-32">
      <div className='copyicon flex items-center justify-center' onClick={()=>{copyText(item.password)}}>
        <span>{"*".repeat(item.password.length)}</span>
      <div className='size-6 flex cursor-pointer '>

      <lord-icon
    src="https://cdn.lordicon.com/lyrrgrsl.json"
    trigger="hover"
    style={{"width":"25px", "height":"25px","paddingLeft": "4px"}}>
  </lord-icon> 

      </div>
      </div>  

      </td>

      <td className = " border border-white py-2 text-center min-w-32"><span className='cursor-pointer ' onClick={() =>{
        editpassword(item.id)
      }}>
        <lord-icon
    src="https://cdn.lordicon.com/rsbokaso.json"
    trigger="hover"
    style={{"width":"25px" ,"height":"25px"}} >
   </lord-icon>
</span>
<span className='cursor-pointer mx-3' 
onClick={() =>{
  deletepassword(item.id)
  }}>
<lord-icon
    src="https://cdn.lordicon.com/wpyrrmcq.json"
    trigger="hover"
    style={{"width":"25px" ,"height":"25px"}}>
</lord-icon>
</span>
 </td>
    </tr>
    })}
   
  </tbody>
</table>
}
      </div>
    </div>
    </div>
    </>
  );
}

export default Manager;
