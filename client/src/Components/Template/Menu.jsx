import { useEffect, useState } from 'react';
import Sidebar, { SidebarItem } from './Sidebar';
import Content from '../Mainmenu/Content'
import { Cuboid, DollarSign, FileCheck2, Home, ShoppingCart, Store,Truck,Users } from 'lucide-react'; 
const MenuComponent = () =>{ 
    const [menuactive,setMenuactive] = useState("Dashboard");
    document.title = menuactive 
    useEffect(() => {
        document.title = menuactive.toUpperCase() + ' - MGS ERP' 
    }, [menuactive]);
    
    return(
        <div className="flex">
            {/* <!-- Sidebar Section --> */}
            <Sidebar>
                <SidebarItem type='list' icon={<Home size={20}/>} text="Home" active={menuactive === "Dashboard" ? true : false} onClick={() =>{setMenuactive("Dashboard")}}></SidebarItem>
              
                <SidebarItem text="Master Data" type='header'/>
                <SidebarItem type='list' icon={<Store size={20}/>} text="Toko" active={menuactive === "Toko" ? true : false} onClick={() =>{setMenuactive("Toko")}}></SidebarItem>
                <SidebarItem type='list' icon={<Cuboid size={20}/>} text="Item" active={menuactive === "Item" ? true : false} onClick={() =>{setMenuactive("Item")}}></SidebarItem>
                <SidebarItem type='list' icon={<Users size={20}/>} text="Karyawan" active={menuactive === "Karyawan" ? true : false} onClick={() =>{setMenuactive("Karyawan")}}></SidebarItem>
              
                <SidebarItem text="Penjualan" type='header'/>
                <SidebarItem type='list' icon={<FileCheck2 size={20}/>} text="Penawaran" active={menuactive === "Penawaran" ? true : false} onClick={() =>{setMenuactive("Penawaran")}}></SidebarItem>
                <SidebarItem type='list' icon={<ShoppingCart size={20}/>} text="Penjualan" active={menuactive === "Penjualan" ? true : false} onClick={() =>{setMenuactive("Penjualan")}}></SidebarItem>
                <SidebarItem type='list' icon={<Truck size={20}/>} text="Pengiriman" active={menuactive === "Pengiriman" ? true : false} onClick={() =>{setMenuactive("Pengiriman")}}></SidebarItem> 
               
                <SidebarItem text="Finance" type='header'/>
                <SidebarItem type='list' icon={<DollarSign size={20}/>} text="Pettycash" active={menuactive === "Pettycash" ? true : false} onClick={() =>{setMenuactive("Pettycash")}}></SidebarItem> 
            </Sidebar>
            <main className='h-screen flex-1 p-7'>
                <Content header={menuactive}/>
            </main> 
        </div>     
    )
}
export default MenuComponent