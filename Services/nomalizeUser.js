const normalizeUser = async (user) => {
    try {
        return {
            name : user?.name || '',
            lastName: user?.lastname || '',
            email: user?.email || '',
            username: user?.username || '' ,
            password: user?.password || ''
        }
    } catch (e) {
        console.log("ERROR::::",e)
    }
}

module.exports = normalizeUser;