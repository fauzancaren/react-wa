const fs = require('fs'); 
const path = require('path');
 
const dataFilePath = path.join(__dirname, 'whatsapp-session.json');

function saveData(newData) {
    let dataArray = [];

    // Memuat data lama jika file ada
    if (fs.existsSync(dataFilePath)) {
        const jsonData = fs.readFileSync(dataFilePath, 'utf8');
        dataArray = JSON.parse(jsonData);
    }
    
    // Periksa apakah data dengan ID yang sama sudah ada
    const exists = dataArray.some(item => item.id === newData.id);
    if (exists) {
        console.log(`Data with id ${newData.id} already exists. No new data added.`);
        return;
    } 

    // Menambahkan data baru ke array
    dataArray.push(newData);
    
    // Menyimpan array kembali ke file
    const jsonData = JSON.stringify(dataArray, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, 'utf8');
    console.log('New data has been appended successfully.');
}

// Fungsi untuk mengambil data dari file JSON
function loadData() {
    if (!fs.existsSync(dataFilePath)) {
        console.log('Data file does not exist. Returning empty array.');
        return [];
    }

    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(jsonData);
}

function removeDataById(id) {
    if (!fs.existsSync(dataFilePath)) {
        console.log('Data file does not exist. No data to remove.');
        return;
    }

    let dataArray = loadData();
    const filteredData = dataArray.filter(item => item.id !== id);

    const jsonData = JSON.stringify(filteredData, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, 'utf8');
    console.log(`Data with id ${id} has been removed successfully.`);
}
function updateDataById(id, newData) {
    if (!fs.existsSync(dataFilePath)) {
        console.log('Data file does not exist. No data to update.');
        return;
    }

    let dataArray = loadData();
    let found = false;
    const updatedArray = dataArray.map(item => {
        if (item.id === id) {
            found = true;
            return {...item, ...newData};
        }
        return item;
    });

    if (!found) {
        console.log(`Data with id ${id} not found.`);
        return;
    }

    const jsonData = JSON.stringify(updatedArray, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, 'utf8');
    console.log(`Data with id ${id} has been updated successfully.`);
}

module.exports = {
    saveData,
    loadData,
    removeDataById,
    updateDataById
}

