import contacts from "../services/contactsServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";



 const getAllContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getOneContact = async (req, res) => {
   
        const {id} = req.params;
        const result = await contacts.getContactById(id);
        if(!result) {
            throw HttpError(404);
        }
        res.json(result);
     
    }
    


const createContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  };

const updateContact = async (req, res) => {
 
    const {id} = req.params;

    const currentContact = await contacts.getContactById(id);
    if (!currentContact) {
        throw HttpError(404, "Contact not found");
    }

    const updatedContact = {
        ...currentContact,
        ...req.body 
    };
    
    const result = await contacts.updateContact(id, updatedContact);
    if(!result) {
        throw HttpError(404);
     
    }
    res.json(result)

};



 const deleteContact = async(req, res) => {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
  
    if(!result) {
        throw HttpError(404);
     
    }

    res.json(result);
};


export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    deleteContact: ctrlWrapper(deleteContact),
}