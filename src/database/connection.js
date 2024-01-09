import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {

    let databaseUrl = process.env.DB_STAGING

    if (process.env.ENVIRONMENT === 'prod'){
        databaseUrl = process.env.DB_PROD
    }

    console.log(databaseUrl)

    try {
        const connect = await mongoose.connect(databaseUrl);
        logger.info('Conexão com banco de dados realizada com sucesso')
    }catch (error){
        logger.error(`Erro na aplicação: ${error.message}`)
    }

}

export { connectDB }