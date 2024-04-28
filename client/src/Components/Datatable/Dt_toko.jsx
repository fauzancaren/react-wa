import { Edit, Search, Trash } from "lucide-react"
import {  useEffect, useState } from "react"
const rawData = [
    {
        no: "1",
        kode: "ID00019",
        name: "Fauzan sdfas"
    }, 
    {
        no: "2",
        kode: "ID00019",
        name: "Fauzan dfs"
    }, 
    {
        no: "3",
        kode: "ID00019",
        name: "Fauzan gdfg4"
    }, 
    {
        no: "4",
        kode: "ID00019",
        name: "Fauzan asd"
    }, 
    {
        no: "5",
        kode: "ID00019",
        name: "Fauzan Cares"
    }, {
        no: "6",
        kode: "ID00019",
        name: "Fauzan sdfas"
    }, 
    {
        no: "7",
        kode: "ID00019",
        name: "Fauzan dfs"
    }, 
    {
        no: "8",
        kode: "ID00019",
        name: "Fauzan gdfg4"
    }, 
    {
        no: "9",
        kode: "ID00019",
        name: "Fauzan asd"
    }, 
    {
        no: "10",
        kode: "ID00019",
        name: "Fauzan Cares"
    } 
]
const DtToko = () =>{
    const [tableData] = useState(rawData)
    const [selectedItem, setSelectedItem] = useState(5)
    useEffect(()=>{
        console.log(selectedItem);
    },[selectedItem])
    const handleChange = (e) => {
        setSelectedItem(e.target.value) 
    }
    return(
        <div className='flex-1 bg-white shadow-lg rounded-xl me-4 border-gray-50 border  p-4'>
            <div className='flex header justify-between'>
                <h2 className='font-semibold text-lg'>List Toko</h2>
            </div> 

            <div className='flex justify-between pt-2'>          
                <div className='flex items-center'> 
                    <select defaultValue={5} onChange={handleChange} className='block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500'>
                        <option value="5">Lihat 5 Baris</option>
                        <option value="10">Lihat 10 Baris</option>
                        <option value="25">Lihat 25 Baris</option>
                        <option value="50">Lihat 50 Baris</option>
                        <option value="100">Lihat 100 Baris</option>
                    </select> 
                </div> 
                <div className='flex flex-1 ms-2'>
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <input type="search" id="location-search" className="block p-1 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500" placeholder="Pencarian" />
                        <button type="submit" className="absolute top-0 end-0 h-full p-1 text-sm font-d text-white bg-indigo-700 rounded-e-md border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                            <Search size={14}/>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div> 
            </div>
        
            <div className="relative overflow-x-auto pt-4 border-b pb-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-1">
                                No
                            </th>
                            <th scope="col" className="px-6 py-1">
                                Kode
                            </th>
                            <th scope="col" className="px-6 py-1">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-1">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(rowData=>(
                            <tr key={rowData.no} className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {rowData.no}
                                </th>
                                <td className="px-6 py-1">
                                {rowData.kode}
                                </td>
                                <td className="px-6 py-1">
                                {rowData.name}
                                </td>
                                <td className="px-6 py-1">
                                    <button type="button" className="font-medium px-2 py-1 text-xs text-center inline-flex items-center  bg-gradient-to-tr from-yellow-400 to-yellow-200 text-gray-800 rounded-lg hover:from-yellow-300 hover:to-yellow-200 focus:ring-1 focus:outline-none focus:ring-indigo-300">
                                        <Edit size={14}/>&nbsp;Edit
                                    </button>&nbsp;
                                    <button type="button" className="font-medium px-2 py-1 text-xs text-center inline-flex items-center  bg-gradient-to-tr from-red-400 to-red-300 text-gray-800 rounded-lg hover:from-red-300 hover:to-red-200 focus:ring-1 focus:outline-none focus:ring-indigo-300">
                                        <Trash size={14}/>&nbsp;Delete
                                    </button>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className='flex justify-between pt-2 items-center'> 
                <span>Tampilkan 0 s/d 0 dari 0 data</span>
                <nav aria-label="Page navigation example">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                                <span className="sr-only">Previous</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                                </svg>
                            </span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</span>
                        </li>
                        <li>
                            <span aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-indigo-600 border border-indigo-300 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</span>
                        </li>
                        <li>
                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                            </span>
                        </li>
                    </ul>
                </nav>   
            </div>
        </div> 
    )
}
export default DtToko