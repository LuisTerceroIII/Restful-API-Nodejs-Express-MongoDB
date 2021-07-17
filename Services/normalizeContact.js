/*
* Recibe un objeto contact  y lo rellena los valores faltantes si los hay con valores vacios
* **/
const normalizeContact = async (contact) => {
    try {
        return {
            userId : contact?.user || '',
            name: contact?.name || '',
            lastname: contact?.lastname || '',
            phoneNumber: contact?.phoneNumber || '',
            age: contact?.age || '',
            email: contact?.email || '',
            company: contact?.company || '',
            homepage: contact?.homepage || '',
            note: contact?.note || ''
        };
    } catch (e) {
        console.error('ERROR:::', e)
        return e
    }
}

module.exports = normalizeContact;