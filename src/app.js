import express from 'express'
import dotenv from 'dotenv'
import router from "./router.js";
import cors from 'cors'

dotenv.config()

const app = express()

app.use(
    express.json(),
    cors(),
    router
)

export default app;