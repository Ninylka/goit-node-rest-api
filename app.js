import express from "express";
import morgan from "morgan";
import cors from "cors";
import  dotenv from "dotenv";
import mongoose from "mongoose";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/auth.js";


const app = express();
dotenv.config();

const  { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
.then(()=> {
    app.listen(PORT)
    console.log("Database connection successful")
}
   )
.catch(error => {
    console.log(error.message);
    process.exit(1);

})


app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());



app.use("/api/contacts", contactsRouter);

app.use("/api/users", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


export default app; 

