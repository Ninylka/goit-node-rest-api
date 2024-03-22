import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import isValidId from "../helpers/isValidId.js";
import  authenticate  from "../helpers/authenticate.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
 
} = contactsControllers;

const contactsRouter = express.Router();

contactsRouter.get("/",authenticate, getAllContacts);
contactsRouter.get("/:id",authenticate,  isValidId,getOneContact);
contactsRouter.delete("/:id",authenticate,  isValidId, deleteContact);
contactsRouter.post("/",authenticate,  validateBody(createContactSchema),createContact);
contactsRouter.put("/:id",authenticate,  isValidId,validateBody(updateContactSchema),updateContact);
contactsRouter.patch("/:id/favorite",authenticate,  isValidId, validateBody(updateFavoriteSchema),updateStatusContact);

export default contactsRouter;
