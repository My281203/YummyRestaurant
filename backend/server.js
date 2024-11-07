import app from "./app.js";
import dotenv from 'dotenv';
import express from 'express';
import { createAdminAccount } from './controllers/authController.js';
  
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, async () => {
    await createAdminAccount();
    console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT}`);
});