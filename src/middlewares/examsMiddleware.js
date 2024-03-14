
function examValidate(req, res, next){

    const { name, min, max } = req.body;


    if(!name){
        return res.status(400).json({
            message: 'Name is required'
        })
    }

    if(min === undefined || min === null){
        return res.status(400).json({
            message: 'Min is required'
        })
    }

    if(max === undefined || max === null){
        return res.status(400).json({
            message: 'Max is required'
        })
    }

    next();
}

export {examValidate}