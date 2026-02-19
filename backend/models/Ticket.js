import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['open', 'in-progress', 'solved', 'closed'],
        default: 'pending',
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

}, {timestamps: true});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;