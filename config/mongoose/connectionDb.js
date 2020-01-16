const mongoose = require('mongoose');
const db = mongoose.connection;
const PORT = '27017'

mongoose.connect(`mongodb://localhost:${PORT}/Contactdb`,{useNewUrlParser: true});


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`We are connected to "Contactdb" on port:${PORT}`));

module.exports = mongoose;

//cd C:\Program Files\MongoDB\Server\4.2\bin
// mongod.exe --dbpath "C:\Users\Luis\Desktop\Programming\REST ful API\data\db"