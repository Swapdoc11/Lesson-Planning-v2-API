import information from "../model/information.js";

export const addInformation = async (req, res, next) => {
    const info = await new information(req.body).save().then((resp)=>{
        console.log(resp);
        res.status(200).json(resp)
    }).catch((err)=>{
        console.log(err)
    })
};
