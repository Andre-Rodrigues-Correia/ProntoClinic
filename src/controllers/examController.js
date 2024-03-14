import {save, findAll} from "../services/examService.js";
import logger from "../utils/logger.js";


async function createExam(req, res){
    try {
        const {name, min, max} = req.body

        const newExam = {
            name: name,
            min: min,
            max: max,
            label: name,
            value: name
        }

        await save(newExam);

        return res.status(200).json({
            message: "Exam created with success"
        })

    }catch (error) {
        logger.error(`Error in exam controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}

async function findAllExams(req, res){
    try {
        const exams = await findAll();
        return res.status(200).json({
            message: exams
        })

    }catch (error) {
        logger.error(`Error in exams controller: ${error.message}`)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}




export { createExam, findAllExams }