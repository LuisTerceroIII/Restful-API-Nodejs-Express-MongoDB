/*
* Recibe un objeto contact  y lo rellena los valores faltantes si los hay con valores vacios
* **/
const normalizeContact = async (contact) => {
    try {
        return {
            name: contact?.name || '',
            lastName: contact?.lastName || '',
            phoneNumber: contact?.phoneNumber || '',
            age: contact?.age || '',
            email: contact?.email || '',
            company: contact?.company || '',
            homepage: contact?.homepage || '',
            family: {
                sister: contact?.family?.sister || '',
                brother: contact?.family?.brother || '',
                dad: contact?.family?.dad || '',
                mom: contact?.family?.mom || '',
            },
            note: contact?.note || ''
        };
    } catch (e) {
        console.error('ERROR:::', e)
        return e
    }
}

module.exports = normalizeContact;