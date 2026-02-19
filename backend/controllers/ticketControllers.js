import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

const ticketControllers = {

    raiseTicket: async(req, res) => {
        const {title, description} = req.body;
        if(!title || !description) return res.status(400).json({status: false, message: "Please provide ticket details."})
        try {
            const newTicket = new Ticket({
                title: title,
                description: description,
                createdBy: req.user.id,
            });
            await newTicket.save();
            return res.status(201).json({status: true, message: "Ticket Created Successfully", newTicket: {
                id: newTicket._id,
                title: newTicket.title,
                description: newTicket.description,
                status: newTicket.status,
                createdBy: newTicket.createdBy,
                createdAt: newTicket.createdAt,
            }});
        } catch (error) {
            console.error(error);
            return res.status(500).json({status: false, message: "Internal Server Error", error: error.message});
        }
    },

    getTickets: async(req, res) => {
        let tickets;
        try{
            if(req.user.role === 'user'){
                tickets = await Ticket.find({createdBy: req.user.id}).select('title status description createdAt createdBy').populate('createdBy', 'userName email');
            }else{
                tickets = await Ticket.find().select('_id title description status createdAt createdBy').populate('createdBy', 'userName email');
            }
            console.log(tickets);
            return res.status(200).json({status: true, message: "Tickets fetched!", tickets});
        }catch(error){
            console.error(error);
            return res.status(500).json({status: false, message: "Internal Server Error", error: error.message});
        }
    }
};

export default ticketControllers;