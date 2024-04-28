import {useEffect, useState} from 'react'
import {UseAuth} from '../Auth/AuthContext'
import { useNavigate } from 'react-router-dom';
import imgUser from '../../assets/user.png'
import swalCustom from '../Swal/custom'
import { Bell, TriangleAlert } from 'lucide-react'

import ComponentsToko from './Toko'
import ComponentsDashboard from './Dashboard'
 
const ContentComponent = ({header}) =>{ 
  const [isOpen, setOpen] = useState(false);  
  const auth = UseAuth();
  const SessionUser = auth.user.datas; 
  const navigate = useNavigate()
  const handleDropDown = () => {  
    setOpen(!isOpen);  
  }; 

  useEffect(()=>{ 
    console.log(header)
  },[header])
  
  switch(header) {
    case "Dashboard":  
      break;
    case "toko": 
      break;
    case "item":
      
      break;
    default:
      console.log("Data page ID does not match current options");
  } 

  const logout = ()=>{
    
    swalCustom.fire({
        title: 'Logout Application',
        text: 'Anda yakin ingin keluar aplikasi ?',
        icon: 'question',
        confirmButtonText: 'Submit',
        showCancelButton: true
    }).then((result) => {
        if (result.isConfirmed) { 
            auth.logout();
            navigate('/login');
            swalCustom.fire({
                title: "Logout Success",
                text: "Terima Kasih sudah menggunakan aplikasi ini...",
                icon: "success"
            });               
        } 
    }) 
   
} 
  return(
    <div className=''> 
      <nav className="rounded-xl   hover:shadow-none transition-all duration-300 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between mx-auto"> 
          <span className="self-center text-2xl text-gray-800 font-bold whitespace-nowrap dark:text-white" onClick={() => {if(isOpen === true) handleDropDown()}}>{header.toUpperCase()}</span> 
          <div className="flex items-center  md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={handleDropDown}>
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={imgUser} alt="userphoto" />
              </button> 
              <div className={`
                w-64 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600
                ${isOpen ? "block" : "hidden"}`} style={{position:'absolute',margin: '0px', right: '20px', top:'85px'}}
                >
                <div className="px-4 py-3">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">{SessionUser.MsEmpName}</span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{SessionUser.MsEmpEmail}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <span onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">Logout</span>
                  </li> 
                </ul>
              </div> 
          </div> 
        </div>
      </nav> 
      
      <div className='flex mt-4'>

        {header === "Dashboard" ? <ComponentsDashboard/> : "" } 
        {header === "Toko" ? <ComponentsToko/> : "" } 



        <div className='flex-shrink min-w-0 hidden  lg:block lg:min-w-72 xl:min-w-96' > 
          <div className='flex justify-between'> 
            <h1 className='text-2xl font-bold text-gray-800'>Info Terbaru</h1>
            <div className='rounded-full py-2 px-2 hover:bg-indigo-50 cursor-pointer'><Bell/></div>
          </div>
          <ul>
            <li>
              <div className='flex bg-indigo-200 cursor-pointer shadow-lg rounded-lg items-center p-3 hover:shadow-none transition-all duration-200'> 
                <div className='rounded  py-2 px-2 r m-2 text-2xl'><TriangleAlert/></div>
                <div className='flex flex-col ms-1'>
                  <span className='font-semibold'>Tidak Ada Info</span>
                  <span>Saat ini tidak ada info terbaru</span>
                </div> 
              </div>
            </li>
          </ul>
        </div> 
      </div> 
    </div> 
  )
}

export default ContentComponent;
