import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    setDate: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
        required: true
    },
    priority: {
        type: String,
    }
},
{
    timestamps: true
})

export const Task = mongoose.model('Task', taskSchema);