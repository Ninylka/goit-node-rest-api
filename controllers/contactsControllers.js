
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

 

const getAllContacts = async (req, res) => {
    const {_id : owner} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit});
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
    const {_id : owner} = req.user;
    const{email} = req.body;
    const contact = await Contact.findOne({email});
    if(contact){
        throw(HttpError(409, "Email in use"))
    }
 
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
  };




const updateContact = async (req, res) => {
    const { id, } = req.params;

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


const getFavoriteContacts = async(req, res) =>{
    const { favorite } = req.query;
    const owner = req.user._id;
    let contacts;
        if (favorite === 'true') {
            contacts = await Contact.find({ owner, favorite: true });
        } else {
            contacts = await Contact.find({ owner });
        }

        res.json(contacts);
}


export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    getFavoriteContacts: ctrlWrapper(getFavoriteContacts),
}