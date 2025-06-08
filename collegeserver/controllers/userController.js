const User = require('../Models/User.js')
const Admission = require('../Models/Admission.js');
// const User = require('/Models/User.js')

const submitAdmissionFormController = async (req, res) => {
    try {
        const { userId, documents } = req.body;
        console.log("submit form 10%")
        if (!userId || !documents || !Array.isArray(documents)) {
            return res.status(400).json({ msg: "MISSING FIELDS OR INVALID DOCUMENTS FORMAT", status: 400 });
        }
        console.log("submit form 20%")
        
        let admission = await Admission.findOne({ userId });
        console.log(req.body)

        if (admission) {
            // Append new documents to existing documents
            console.log(documents)
            admission.documents.push(...documents);
            await admission.save();
            console.log("updated successfully")
            return res.status(200).json({ msg: "Documents updated successfully!", admission });
        }
        console.log("submit form 60%")

        // Create new admission if not exists
        const newAdmission = new Admission({ userId, documents });
        await newAdmission.save();
        console.log("submit form 70%")
        
        return res.status(200).json({ msg: "Admission created successfully!", newAdmission });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};



module.exports = {submitAdmissionFormController};