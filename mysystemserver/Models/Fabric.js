const mongoose = require('mongoose');

const FabricSchema = new mongoose.Schema({
    did:{
        type:String,
        require:true
    },
    cid:{
        type:String,
        require:true,
    },
    hash:{
        type:String,
        require:true,
    },
    key:{
        type:String,
        require:true,
    }
});

const Fabric = mongoose.model('Fabrics',FabricSchema);
module.exports = Fabric;