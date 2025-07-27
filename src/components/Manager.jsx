import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [dataArray, setdataArray] = useState([]);
  
  useEffect(() => {
    let data = localStorage.getItem("data");
    if (data) {
      setdataArray(JSON.parse(data));
    }
  }, [])
  
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  }
  
  const del = (id_, ed) => {
    let check;
    if (ed == false) check = confirm("confirm delete");
    if (check || ed) {
      setdataArray(dataArray.filter(item => item.id !== id_));
      localStorage.setItem("data", JSON.stringify(dataArray.filter(item => item.id !== id_)))
    }
  }
  
  const edit = (id_) => {
    let ed = false;
    ed = confirm("confirm edit");
    setform(dataArray.filter(item => {
      if (item.id === id_) return true;
    })[0]);
    del(id_, ed);
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  
  const savepassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setdataArray([...dataArray, { ...form, id: uuidv4() }]);
      localStorage.setItem("data", JSON.stringify(([...dataArray, { ...form, id: uuidv4() }])));
      setform({ site: "", username: "", password: "" })
    }
    else {
      alert("enter valid credential");
    }
  }
  
  const showpassword = () => {
    if (ref.current.src.includes("blind.png")) {
      ref.current.src = "https://img.icons8.com/ios-glyphs/30/visible--v1.png";
      passwordref.current.type = "password";
    }
    else {
      ref.current.src = "https://img.icons8.com/ios-glyphs/30/blind.png";
      passwordref.current.type = "text";
    }
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Background elements */}
      <div className="fixed top-0 left-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-blue-200 opacity-50 blur-[80px]"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold'>
            <span className='text-black'>Own Password-</span>
            <span className='text-blue-500'>Manager</span>
          </h1>
        </div>
        
        {/* Form section */}
        <div className='flex flex-col lg:flex-row gap-8 mb-12'>
          {/* Input form */}
          <div className='w-full lg:w-1/2'>
            <div className='bg-white p-6 rounded-xl shadow-md'>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Website URL</label>
                  <input 
                    value={form.site} 
                    onChange={handleChange} 
                    name='site' 
                    className='w-full rounded-lg border border-blue-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    type="text" 
                    placeholder='Enter Web URL' 
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
                  <input 
                    value={form.username} 
                    onChange={handleChange} 
                    name='username' 
                    className='w-full rounded-lg border border-blue-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    type="text" 
                    placeholder='Enter Username' 
                  />
                </div>
                
                <div className='relative'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                  <input 
                    ref={passwordref} 
                    value={form.password} 
                    onChange={handleChange} 
                    name='password' 
                    className='w-full rounded-lg border border-blue-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    type="password" 
                    placeholder='Enter Password' 
                  />
                  <button 
                    className='absolute right-3 top-9 text-gray-500 hover:text-blue-600' 
                    onClick={showpassword}
                  >
                    <img 
                      ref={ref} 
                      width="24" 
                      height="24" 
                      src="https://img.icons8.com/ios-glyphs/30/visible--v1.png" 
                      alt="Toggle password visibility" 
                    />
                  </button>
                </div>
                
                <button 
                  onClick={savepassword}
                  className='flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200'
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/jectmwqf.json"
                    trigger="hover"
                    style={{ width: '24px', height: '24px' }}
                  ></lord-icon>
                  <span className='ml-2'>Save Password</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className='w-full lg:w-1/2 flex items-center justify-center'>
            <img 
              className='rounded-xl shadow-md w-full h-auto max-w-md' 
              src="https://raw.githubusercontent.com/sarthakgupta124/passop/refs/heads/main/public/Managers.jpg" 
              alt="Password manager" 
            />
          </div>
        </div>
        
        {/* Password list section */}
        <div className="mb-12">
          <h2 className='text-center mb-6'>
            <span className='text-2xl font-bold'>
              <span className='text-black'>Your </span>
              <span className='text-blue-500'>Passwords</span>
            </span>
          </h2>
          
          {dataArray.length === 0 ? (
            <div className='text-center py-8 bg-blue-50 rounded-lg'>
              <p className='text-gray-600'>No passwords saved yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className='min-w-full bg-white rounded-lg overflow-hidden shadow-md'>
                <thead className='bg-blue-600 text-white'>
                  <tr>
                    <th className='py-3 px-4 text-left'>Site</th>
                    <th className='py-3 px-4 text-left'>Username</th>
                    <th className='py-3 px-4 text-left'>Password</th>
                    <th className='py-3 px-4 text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {dataArray.map(e => (
                    <tr key={e.id} className='hover:bg-blue-50'>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <button 
                            onClick={() => copyText(e.site)}
                            className='mr-2 text-blue-500 hover:text-blue-700'
                            aria-label="Copy site"
                          >
                            <lord-icon
                              style={{ width: '20px', height: '20px' }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </button>
                          <span className='truncate max-w-[120px] md:max-w-[200px]'>{e.site}</span>
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <button 
                            onClick={() => copyText(e.username)}
                            className='mr-2 text-blue-500 hover:text-blue-700'
                            aria-label="Copy username"
                          >
                            <lord-icon
                              style={{ width: '20px', height: '20px' }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </button>
                          <span className='truncate max-w-[120px] md:max-w-[200px]'>{e.username}</span>
                        </div>
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <button 
                            onClick={() => copyText(e.password)}
                            className='mr-2 text-blue-500 hover:text-blue-700'
                            aria-label="Copy password"
                          >
                            <lord-icon
                              style={{ width: '20px', height: '20px' }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </button>
                          <span className='truncate max-w-[120px] md:max-w-[200px]'>{"*".repeat(e.password.length)}</span>
                        </div>
                      </td>
                      <td className='py-3 px-4 text-center'>
                        <div className='flex justify-center space-x-2'>
                          <button 
                            onClick={() => del(e.id, false)}
                            className='text-red-500 hover:text-red-700'
                            aria-label="Delete"
                          >
                            <lord-icon
                              style={{ width: '24px', height: '24px' }}
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                            ></lord-icon>
                          </button>
                          <button 
                            onClick={() => edit(e.id)}
                            className='text-green-500 hover:text-green-700'
                            aria-label="Edit"
                          >
                            <lord-icon
                              style={{ width: '24px', height: '24px' }}
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                            ></lord-icon>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Manager
