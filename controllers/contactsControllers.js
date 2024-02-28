
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

import Contact from "../models/contact.js";

 

const getAllContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};


const getOneContact = async (req, res) => {
   
        const {id} = req.params;
        const result = await Contact.findById(id);
        if(!result) {
            throw HttpError(404);
        }
        res.json(result);
     
    }



const createContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  };



const updateContact = async (req, res) => {
    const { id } = req.params;

    const updatedContact = {
        ...req.body
    };
    
    const result = await Contact.findByIdAndUpdate(id, updatedContact, { new: true });

    if (!result) {
        throw HttpError(404);
    }

    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;

    const updatedContact = {
        ...req.body
    };
    
    const result = await Contact.findByIdAndUpdate(id, updatedContact, { new: true });

    if (!result) {
        throw HttpError(404);
    }

    res.json(result);
};




 const deleteContact = async(req, res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndDelete(id);
  
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
    updateStatusContact: ctrlWrapper(updateStatusContact),
}