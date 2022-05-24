const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = 'mongodb://Administrator:Admin123@cluster0-shard-00-00.8ubju.mongodb.net:27017,cluster0-shard-00-01.8ubju.mongodb.net:27017,cluster0-shard-00-02.8ubju.mongodb.net:27017/inventarios?ssl=true&replicaSet=atlas-u0u08g-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(url);
        console.log(' Esta conectado a la base de datos INVENTARIOS...')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getConnection,
}