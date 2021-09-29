import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema(
    {   
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        address: {type: String, required: true}
    }
)
export const address = mongoose.model('address',AddressSchema)