import React from 'react'
import { use } from 'react'
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

      console.log(form)
      setdataArray([...dataArray, { ...form, id: uuidv4() }]);
      localStorage.setItem("data", JSON.stringify(([...dataArray, { ...form, id: uuidv4() }])));
      console.log(([...dataArray, form]));
      setform({ site: "", username: "", password: "" })
    }
    else alert("enter valid credential");

  }
  const showpassword = () => {

    if (ref.current.src == "https://img.icons8.com/ios-glyphs/30/blind.png") {
      ref.current.src = "https://img.icons8.com/ios-glyphs/30/visible--v1.png";
      passwordref.current.type = "password";

    }
    else {
      ref.current.src = "https://img.icons8.com/ios-glyphs/30/blind.png";
      passwordref.current.type = "text";

    }

  }
  return (
    <div>
      {/* this is only for background (below div) */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-blue-200 opacity-50 blur-[80px]"></div></div>
      <div className=''>
        <div className='text-center p-5'>
          <span className='text-black text-2xl'>Own Password-</span><span className='text-blue-400 text-2xl'>Manager</span>
        </div>
        <div className='md:flex md:w-[100vw]'>
          <div className='text-white mx-auto flex flex-col items-center md:items-start md:mx-20 gap-y-3 md:gap-y-4 relative md:w-[70vw]'>
            <input value={form.site} onChange={handleChange} name='site' className='rounded-full  md:w-4/12 border border-blue-500 px-4 py-1  text-black' type="text" placeholder='Enter Web URL' />

            <div className=' flex flex-col  gap-3 md:gap-4 md:w-8/12 '>

              <input value={form.username} onChange={handleChange} name='username' className='rounded-full w-12/12 md:w-6/12 border border-blue-500 px-4 py-1 text-black' type="text" placeholder='Enter Username' />

              <input ref={passwordref} value={form.password} onChange={handleChange} name='password' className='rounded-full w-12/12 md:w-6/12 border border-blue-500 px-4 py-1 text-black' type="password" placeholder='Enter Password' />
              <span className=' absolute  right-16  md:right-[39vw]  top-24 md:top-[14vh] cursor-pointer ' onClick={showpassword}>
                <img ref={ref} width="30" height="15" src="https://img.icons8.com/ios-glyphs/30/visible--v1.png" alt="visible--v1" />
              </span>
            </div>
            <div className='flex items-center border border-blue-400 rounded-full my-2 md:my-0 px-3 md:mx-24 bg-blue-400 cursor-pointer' onClick={savepassword}>
              <lord-icon className=''
                src="https://cdn.lordicon.com/jectmwqf.json"
                trigger="hover"
              >
              </lord-icon>
              <button className='text-black font-bold'>Save</button>
            </div>
            

          </div>
          <div className='md:w-[40vw] md:pr-12'>
              <img className='rounded-md drop-shadow(2px 4px 6px rgba(0,0,0,0.3))' 
              src="https://raw.githubusercontent.com/sarthakgupta124/passop/refs/heads/main/public/Managers.jpg" alt="Password manager" />
          </div>

        </div>
        <div className="showdata flex flex-col items-center">
          <div className='font-bold text-2xl py-3'><span className='text-black'>Your-</span><span className='text-blue-600'>Passwords</span></div>

          {dataArray.length === 0 && <div>NO PASSWORDS TO SHOW</div>}
          {dataArray.length != 0 &&
            <table className='table-auto w-screen md:w-3/4 overflow-hidden rounded-md'>
              <thead className='bg-blue-800 text-white'>
                <tr>

                  <th className='py-2 border border-white text-center w-32'>Site</th>
                  <th className='py-2 border border-white text-center w-32'>UserName</th>
                  <th className='py-2 border border-white text-center w-32'>Password</th>
                  <th className='py-2 border border-white text-center w-32'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-blue-200 text-clip'>
                {dataArray.map(e => {
                  return <tr key={e.id}>
                    <td className='relative text-clip text-center border border-white justify-center '>
                      <lord-icon onClick={() => { copyText(e.site) }} className='absolute left-0 cursor-pointer'
                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover">
                      </lord-icon>
                      <span className=' py-2 text-clip  text-center w-10 md:w-32'>{e.site}</span>
                    </td>
                    <td className='relative text-clip text-center border border-white justify-center'>
                      <lord-icon onClick={() => { copyText(e.username) }} className='absolute left-0 cursor-pointer'
                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover">
                      </lord-icon>
                      <span className='py-2 text-center text-clip w-32'>{e.username}</span>
                    </td>
                    <td className='relative text-center text-clip border border-white justify-center'>
                      <lord-icon onClick={() => { copyText(e.password) }} className='absolute left-0 cursor-pointer'
                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover">
                      </lord-icon>
                      <span className='py-2 text-center text-clip w-32'>{e.password}</span>
                    </td>
                    <td className=' text-center  text-clip border border-white justify-center'>
                      <lord-icon onClick={() => { del(e.id, false) }} className='cursor-pointer mx-2'
                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover">
                      </lord-icon>
                      <lord-icon onClick={() => { edit(e.id) }} className='cursor-pointer mx-2'
                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover">
                      </lord-icon>
                    </td>


                  </tr>

                })}

              </tbody>
            </table>}
        </div>
      </div>


    </div>
  )
}

export default Manager
