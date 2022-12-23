var mongoose = require("mongoose");

var pointSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    result:{
        Toan:{
            mieng:[Number],
            _15:[Number],
            _45:[Number],
            _gk:{type:Number},
            _ck:{type:Number}
        },
        Van:{
            mieng:[Number],
            _15:[Number],
            _45:[Number],
            _gk:{type:Number},
            _ck:{type:Number}
        },
        // Anh:{
        //     mieng:[Number],
        //     _15:[Number],
        //     _45:[Number],
        //     _gk:{type:Number},
        //     _ck:{type:Number}
        // },
        Li:{
            mieng:[Number],
            _15:[Number],
            _45:[Number],
            _gk:{type:Number},
            _ck:{type:Number}
        },
        Hoa:{
            mieng:[Number],
            _15:[Number],
            _45:[Number],
            _gk:{type:Number},
            _ck:{type:Number}
        },
        Sinh:{
            mieng:[Number],
            _15:[Number],
            _45:[Number],
            _gk:{type:Number},
            _ck:{type:Number}
        },
        Su:{
            mieng:[Number],
            _15:[Number],
            _45:[Number],
            _gk:{type:Number},
            _ck:{type:Number}
        },
        Dia:{
            mieng:[Number],
            _15:[Number],
            _45:[Number],
            _gk:{type:Number},
            _ck:{type:Number}
        },
        DaoDuc:{
            mieng:[Number],
            _15:[Number],
            _45:[Number],
            _gk:{type:Number},
            _ck:{type:Number}
        },
        
        // CongNghe:{
        //     mieng:[Number],
        //     _15:[Number],
        //     _45:[Number],
        //     _gk:{type:Number},
        //     _ck:{type:Number}
        // },
        TD:{type:String, enum:['D', 'KD']}
    }
})

var gradeSchema = new mongoose.Schema({
    nid:{
        type:Number,
        required:true,
        unique:true
    },
    point:[pointSchema]
});

var Grade = mongoose.model("grade", gradeSchema);

module.exports = Grade