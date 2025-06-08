// const User = require('../Models/User.js')
const Admission = require('../Models/Admission.js');
// const User = require('/Models/User.js')

const getDocsAdminController = async (req, res) => {
    try {
        
        const docs = await Admission.find();
        console.log("AALA CALL")
        return res.status(200).json({ msg: "Admission created successfully!", docs:docs});

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};



module.exports = {getDocsAdminController};