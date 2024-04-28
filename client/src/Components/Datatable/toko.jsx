import { Edit, Trash } from "lucide-react"
import { useState } from "react"
const rawData = [
    {
        no: "1",
        kode: "ID0001",
        name: "Fauzan Caren"
    }, 
]
const DtToko = () =>{
    const [tableData] = useState(rawData)
    return(
    <div className="relative overflow-x-auto p-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        No
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Kode
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Aksi
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableData.map(rowData=>(
                     <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {rowData.no}
                        </th>
                        <td className="px-6 py-4">
                        {rowData.kode}
                        </td>
                        <td className="px-6 py-4">
                        {rowData.name}
                        </td>
                        <td className="px-6 py-4">
                            <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <Edit size={14}/>&nbsp;Edit
                            </button>&nbsp;
                            <button type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                <Trash size={14}/>&nbsp;Delete
                            </button>
                        </td>
                    </tr> 
                ))}
            </tbody>
        </table>
    </div>
    )
}
export default DtToko