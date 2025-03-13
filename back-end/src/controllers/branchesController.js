import branchesModel from "../models/branches.js";
const branchesController = {};

branchesController.getBranches = async (req, res) => {
  const branches = await branchesModel.find();
  res.json(branches);
};

branchesController.createBranches = async (req, res) => {
  const { name, address, telephone, schedule } = req.body;
  const newBranch = new branchesModel({ name, address, telephone, schedule });
  await newBranch.save();
  res.json("Nueva sucursal en " + address);
};

branchesController.deleteBranches = async (req, res) => {
  const deletedBranch = await branchesModel.findByIdAndDelete(req.params.id);
  res.json("Eliminaste una sucursal ");
};

branchesController.updateBranches = async (req, res) => {
  const { name, address, telephone, schedule } = req.body;
  const updatedBranch = await branchesModel.findByIdAndUpdate(
    req.params.id,
    { name, address, telephone, schedule },
    { new: true }
  );
  res.json("Le cambiaste algo a alguna sucursal");
};

branchesController.get1Branch = async (req, res) => {
  const branch = await branchesModel.findById(req, params.id);
  res.json(branch);
};

export default branchesController;