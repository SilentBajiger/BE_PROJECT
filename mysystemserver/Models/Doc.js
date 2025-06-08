const mongoose = require('mongoose');

const DocSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:false,
    },
    fileName:{
        type:String,
        require:true,
    },
    did:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true,
    },
    size:{
        type:String,
        require:true,
    }

});

const Doc = mongoose.model('Docs',DocSchema);
module.exports = Doc;