import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBUrl } from "./config.js";
import taskRouter from "./routes/taskRoutes.js";
import { User } from "./models/userModel.js";

// import dotenv from 'dotenv';
// dotenv.config();

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  console.log(req);
  res.status(200).send("Getting response");
});

app.post("/users/login", async (req, res) => {
  const {user, password} = req.body;
  const currUser = await User.findOne({user: user});
  if (user) {
    if (currUser.password === password) {
      return res.status(200).json({message: "Login successful"});
    }
    else {
      return res.status(401).json({message: "Invalid credentials"});
    }
  }
  else {
    return res.status(404).json({message: "User not found"});
  }
})

app.post("/users/signup", async (req,res) => {
  try {
    if (!req.body.user || !req.body.password) {
      return res.status(400).send('Send all the required details');
    }
    const newUser = {
      user: req.body.user,
      password: req.body.password
    }
    const user = await User.create(newUser);
    return res.status(200).send(user);
  }
  catch (err) {
    console.log(err.message);
    return res.status(500).send('Error: ', err.message);
  }
})

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`Server listening at PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
