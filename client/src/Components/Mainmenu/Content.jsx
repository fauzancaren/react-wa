 import {useState} from 'react'
 import {UseAuth} from '../Auth/AuthContext'
 import { useNavigate } from 'react-router-dom';
 import imgUser from '../../assets/user.png'
 import swalCustom from '../Swal/custom'
 import { BadgeInfo, Bell } from 'lucide-react'
import DtToko from '../Datatable/toko';
 
 const ContentComponent = ({header}) =>{ 
  const [isOpen, setOpen] = useState(false); 
  const auth = UseAuth();
  const SessionUser = auth.user.datas; 
  const navigate = useNavigate()
  const handleDropDown = () => {  
    setOpen(!isOpen);  
  };

   
  
  switch(header) {
    case "home": 

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
    <div className='text-gray-600     '> 
      <nav className="bg-white rounded-xl   hover:shadow-none transition-all duration-300 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4"> 
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" onClick={() => {if(isOpen === true) handleDropDown()}}>{header.toUpperCase()}</span> 
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={handleDropDown}>
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={imgUser} alt="userphoto" />
              </button> 
              <div className={`
                w-64 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600
                ${isOpen ? "block" : "hidden"}`} style={{position:'absolute',margin: '0px', right: '20px', top:'85px'}}
                >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{SessionUser.MsEmpName}</span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{SessionUser.MsEmpEmail}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <span onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</span>
                  </li> 
                </ul>
              </div> 
          </div> 
        </div>
      </nav>
      <div className='flex mt-4'>
        <div className='flex-1 bg-white-50 h-72 shadow-lg rounded-xl me-4 border-gray-50 border'>
          <div className='flex justify-between p-2'>          
            <div>
              <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
              <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div> 
            <div>
              <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
              <input type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          </div>

          <DtToko/>         
        </div>
        <div className='flex-shrink min-w-0 hidden  lg:block lg:min-w-72 xl:min-w-96' > 
          <div className='flex justify-between'> 
            <h1 className='text-2xl font-semibold'>Info Terbaru</h1>
            <div className='rounded-full py-2 px-2 hover:bg-indigo-50 cursor-pointer'><Bell/></div>
          </div>
          <ul>
            <li>
              <div className='flex bg-white-50 shadow-lg rounded-lg items-center p-3 hover:shadow-none transition-all duration-200'> 
                <div className='rounded bg-indigo-300 py-2 px-2 hover:bg-indigo-50 cursor-pointer m-2 text-2xl'><BadgeInfo/></div>
                <div className='flex flex-col ms-1'>
                  <span className='font-semibold'>Header Info</span>
                  <span>Detail Info</span>
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
