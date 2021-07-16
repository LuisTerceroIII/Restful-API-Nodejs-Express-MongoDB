const bcrypt = require("bcrypt");
const saltRounds = 10; //TODO: AVERIGUAR ESTO!

const cryptoUserPassService = {
    hashUserPass: (plainPassword) => {
        return bcrypt.hashSync(plainPassword, saltRounds);
    },
    verifyUserPass: (plainPass, hashPass) => bcrypt.compareSync(plainPass, hashPass)
}

module.exports = cryptoUserPassService;


