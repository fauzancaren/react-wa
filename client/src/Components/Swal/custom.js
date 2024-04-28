
import Swal from 'sweetalert2'; 
const swalCustom = Swal.mixin({
    customClass: {
      confirmButton: "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 text-white mx-2", 
      cancelButton: "bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 text-white mx-2"
    },
    buttonsStyling: false
});

export default swalCustom