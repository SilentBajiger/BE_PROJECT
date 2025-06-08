const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: false,
    },
    email:{
        type:String,
        required:false
    },
    documents: [
        {
            fileName: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ]
});

module.exports = mongoose.model('Admission', admissionSchema);
