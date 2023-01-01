var mongoose = require("mongoose");

// var pointSchema = new mongoose.Schema({
//     id:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     result:{
//         Toan:{
//             mieng:[Number],
//             _15:[Number],
//             _45:[Number],
//             _gk:{type:Number},
//             _ck:{type:Number}
//         },
//         Van:{
//             mieng:[Number],
//             _15:[Number],
//             _45:[Number],
//             _gk:{type:Number},
//             _ck:{type:Number}
//         },
//         // Anh:{
//         //     mieng:[Number],
//         //     _15:[Number],
//         //     _45:[Number],
//         //     _gk:{type:Number},
//         //     _ck:{type:Number}
//         // },
//         Li:{
//             mieng:[Number],
//             _15:[Number],
//             _45:[Number],
//             _gk:{type:Number},
//             _ck:{type:Number}
//         },
//         Hoa:{
//             mieng:[Number],
//             _15:[Number],
//             _45:[Number],
//             _gk:{type:Number},
//             _ck:{type:Number}
//         },
//         Sinh:{
//             mieng:[Number],
//             _15:[Number],
//             _45:[Number],
//             _gk:{type:Number},
//             _ck:{type:Number}
//         },
//         Su:{
//             mieng:[Number],
//             _15:[Number],
//             _45:[Number],
//             _gk:{type:Number},
//             _ck:{type:Number}
//         },
//         Dia:{
//             mieng:[Number],
//             _15:[Number],
//             _45:[Number],
//             _gk:{type:Number},
//             _ck:{type:Number}
//         },
//         DaoDuc:{
//             mieng:[Number],
//             _15:[Number],
//             _45:[Number],
//             _gk:{type:Number},
//             _ck:{type:Number}
//         },
        
//         // CongNghe:{
//         //     mieng:[Number],
//         //     _15:[Number],
//         //     _45:[Number],
//         //     _gk:{type:Number},
//         //     _ck:{type:Number}
//         // },
//         TD:{type:String, enum:['D', 'KD']}
//     }
// })

var gradeSchema = new mongoose.Schema({
    nid:{
        type:String,
        required:true
    },
    point :{
        id:{
            type:String,
            required:true
        },
        result:{
            Toan:{
                mieng:{type:Number},
                _15:{type:Number},
                _45:{type:Number},
                _gk:{type:Number},
                _ck:{type:Number}
            },
            Van:{
                mieng:{type:Number},
                _15:{type:Number},
                _45:{type:Number},
                _gk:{type:Number},
                _ck:{type:Number}
            },
            // Anh:{
                // mieng:{type:Number},
                // _15:{type:Number},
                // _45:{type:Number},
                // _gk:{type:Number},
                // _ck:{type:Number}
            // },
            Li:{
                mieng:{type:Number},
                _15:{type:Number},
                _45:{type:Number},
                _gk:{type:Number},
                _ck:{type:Number}
            },
            Hoa:{
                mieng:{type:Number},
                _15:{type:Number},
                _45:{type:Number},
                _gk:{type:Number},
                _ck:{type:Number}
            },
            Sinh:{
                mieng:{type:Number},
                _15:{type:Number},
                _45:{type:Number},
                _gk:{type:Number},
                _ck:{type:Number}
            },
            Su:{
                mieng:{type:Number},
                _15:{type:Number},
                _45:{type:Number},
                _gk:{type:Number},
                _ck:{type:Number}
            },
            Dia:{
                mieng:{type:Number},
                _15:{type:Number},
                _45:{type:Number},
                _gk:{type:Number},
                _ck:{type:Number}
            },
            DaoDuc:{
                mieng:{type:Number},
                _15:{type:Number},
                _45:{type:Number},
                _gk:{type:Number},
                _ck:{type:Number}
            },
            
            // CongNghe:{
                // mieng:{type:Number},
                // _15:{type:Number},
                // _45:{type:Number},
                // _gk:{type:Number},
                // _ck:{type:Number}
            // },
            // TD:{type:String, enum:['D', 'KD']}
        }
    }

});
//gradeSchema.index({ "nid": 1, "point.id": 1 }, { unique: true });

var Grade = mongoose.model("grade", gradeSchema);


module.exports = Grade