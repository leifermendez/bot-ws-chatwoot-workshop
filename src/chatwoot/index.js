/**
 * Es la funciona que importa para guardar los mensajes y crear lo que sea necesario
 * @param {*} dataIn pasando los datos del contacto + el mensaje
 * @param {*} chatwoot la dependencia del chatwoot...(create, buscar...)
 */
const handlerMessage = async (dataIn = {phone:'', name:'', message: '', mode:''}, chatwoot) => {
    const inbox = await chatwoot.findOrCreateInbox({ name: 'BOTWS' })
    const contact = await chatwoot.findOrCreateContact({ from: dataIn.phone, name: dataIn.name})
    const conversation = await chatwoot.findOrCreateConversation({
        inbox_id: inbox.id,
        contact_id: contact.id,
        phone_number: dataIn.phone
    })
    await chatwoot.createMessage({
        msg: dataIn.message, mode: dataIn.mode, conversation_id: conversation.id
    })
}

module.exports = { handlerMessage }