import { ChevronLast, ChevronFirst, LogOut } from "lucide-react"
import { useContext, createContext, useState } from "react" 
import imglogo from '../../assets/logo.png' 
import { UseAuth } from '../Auth/AuthContext';
import {  useNavigate } from 'react-router-dom'; 
import SwalCustom from '../Swal/custom' 

const SidebarContext = createContext()

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    const auth = UseAuth();  
    const navigate = useNavigate();    
    const logout = ()=>{ 
        SwalCustom.fire({
            title: 'Logout Application',
            text: 'Anda yakin ingin keluar aplikasi ?',
            icon: 'question',
            confirmButtonText: 'Submit',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) { 
                auth.logout();
                navigate('/login');
                SwalCustom.fire({
                    title: "Logout Success",
                    text: "Terima Kasih sudah menggunakan aplikasi ini...",
                    icon: "success"
                });               
            } 
        }) 
       
    } 
    return (
        <aside className="h-screen shadow-lg">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                <img
                    src={imglogo}
                    className={`overflow-hidden transition-all ${
                    expanded ? "w-10 h-10" : "w-0"
                    }`}
                    alt=""
                />
                <span className={`overflow-hidden translate-all
                ${ 
                    expanded ? "font-bold text-blue-400" : "w-0"
                }
                `}>MGS APPLICATION</span>
                <button
                    onClick={() => setExpanded((curr) => !curr)}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                    {expanded ? <ChevronFirst /> : <ChevronLast />}
                </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                <ul className="flex-1 px-3 overflow-y">{children}</ul>
                </SidebarContext.Provider>
                 
                <ul className="px-3 border-t">
                    <li
                        className={`
                            relative flex items-center py-2 px-3 my-1
                            font-medium rounded-md cursor-pointer
                            transition-colors group hover:bg-indigo-50 text-gray-600
                        `}
                        onClick={logout} 
                        >
                        <LogOut size={20}/>
                        <span
                            className={`overflow-hidden transition-all ${
                            expanded ? "w-52 ml-3" : "w-0"
                            }`}
                        >
                            Logout
                        </span>
                        

                        {!expanded && (
                            <div
                            className={`
                            absolute left-full rounded-md px-2 py-1 ml-6
                            bg-indigo-100 text-indigo-800 text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        `}
                            >
                            Logout
                            </div>
                        )}
                    </li>
                </ul> 
            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, active, alert,onClick,type}) {
    const { expanded } = useContext(SidebarContext)
    if(type==="list"){
        
        return (

            <li
            className={`
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${
                active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
            `}
            onClick={onClick}  
            >
            {icon}
            <span
                className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
                {text}
            </span>
            {alert && (
                <div
                className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                    expanded ? "" : "top-2"
                }`}
                />
            )}

            {!expanded && (
                <div
                className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
                >
                {text}
                </div>
            )}
            </li>
        )
    }else{
        return(<li className={`
        relative pt-6 mb-2 text-gray-400  
        font-medium    
        transition-colors group ${
        expanded ? "pt-6" : "pt-1 mb-2 border-b "
        }
    `}>
        <span
            className={`overflow-hidden transition-all ${
            expanded ? "display" : "hidden"
            }`}
        >
            {text}
        </span>
        </li>)
    }
}