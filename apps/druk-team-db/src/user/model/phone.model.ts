import * as mongoose from 'mongoose';

export const PhoneSchema = new mongoose.Schema(
    {   
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        phone: {type: String, index:{required: true, unique: true}},
    }
)

export const phone = mongoose.model('phone',PhoneSchema)
