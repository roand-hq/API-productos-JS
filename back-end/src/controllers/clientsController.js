import clientsModel from "../models/clients.js";
const clientController = {};

clientController.getClients = async (req,res) => {
    const clients = await clientsModel.find();
    res.json(clients);
}

clientController.createClients = async(req,res) => {
    const {name, lastName, birthday, email, password, phoneNumber, dui, verified} = req.body;
    const newClient = new clientsModel({name, lastName, birthday, email, password, phoneNumber, dui, verified});
    await newClient.save();
    res.json("Insertaste un nuevo cliente bro")
}

clientController.deleteClients = async(req,res) => {
    const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "-1 cliente" });
}

clientController.updateClients = async(req,res) => {
    const {name, lastName, birthday, email, password, phoneNumber, dui, verified} = req.body;
    const updatedClient = await clientsModel.findByIdAndUpdate(
        req.params.id,
        {name, lastName, birthday, email, password, phoneNumber, dui, verified},
        {new : true} 
    );
    res.json({ message: "When actualizas tus clientes :v xdxd" });
}

clientController.get1Client = async(req,res) => {
    const client = await clientsModel.findById(req.params.id);
    res.json(client);
}

export default clientController;