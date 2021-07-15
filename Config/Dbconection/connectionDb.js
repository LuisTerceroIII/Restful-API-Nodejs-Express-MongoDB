const mongoose = require('mongoose');
const db = mongoose.connection;
const PORT = process.env.DB_PORT
const DBdir = process.env.DB_URL
const dbName = process.env.DB_NAME
// Ejemplo: mongodb://localhost:27017/Contactdb`
const urlDB = `${DBdir}:${PORT}/${dbName}`

mongoose.connect(urlDB,{useNewUrlParser: true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`We are connected to ${dbName} on port:${PORT}`));

module.exports = mongoose;

//cd C:\Program Files\MongoDB\Server\4.2\bin
// mongod.exe --dbpath "C:\Users\Luis\Desktop\Programming\REST ful API\data\db"

// mongod.exe --dbpath "C:\Users\luise\Desktop\My data\MyData\Respaldo\Programming\REST ful API\data\db"