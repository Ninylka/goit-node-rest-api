

import {nanoid} from 'nanoid';
import fs from 'fs/promises';
import path from 'path';
const contactsPath = path.join("db/contacts.json");



  async function listContacts() {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
  }

  async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item =>item.id === contactId);
   
    return result || null;
  }

  async function addContact( data) {
    const {name, email, phone} = data;
    const contacts = await listContacts();
    
const newContact ={
  id: nanoid(),
  name,
  email, 
  phone,

  }

  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}


async function removeContact(contactId) {
    const contacts = await listContacts();

    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const removedContact = contacts[index];
    contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
   
  }



  async function updateContact(id, data) {
    const contacts = await listContacts();

    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
   contacts[index] =  {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
   
  }

  const contactsServices = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
  };
  
  export default contactsServices;
