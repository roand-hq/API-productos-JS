import employeesModel from "../models/employees.js";
const EmployeeController = {};

EmployeeController.getEmployees = async (req,res) => {
    const Employees = await employeesModel.find();
    res.json(Employees);
}

EmployeeController.createEmployees = async(req,res) => {
    const {name, lastName, birthday, email, address, hireDate, password, phoneNumber, dui, isssNumber, verified} = req.body;
    const newEmployee = new employeesModel({name, lastName, birthday, email, address, hireDate, password, phoneNumber, dui, isssNumber, verified});
    await newEmployee.save();
    res.json("Insertaste un nuevo cliente bro")
}

EmployeeController.deleteEmployees = async(req,res) => {
    const deleteEmployee = await employeesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "-1 Employeee" });
}

EmployeeController.updateEmployees = async(req,res) => {
    const  {name, lastName, birthday, email, address, hireDate, password, phoneNumber, dui, isssNumber, verified} = req.body;
    const updatedEmployee = await employeesModel.findByIdAndUpdate(
        req.params.id,
        {name, lastName, birthday, email, address, hireDate, password, phoneNumber, dui, isssNumber, verified},
        {new : true} 
    );
    res.json({ message: "Empleado actualizado" });
}

EmployeeController.get1Employee = async(req,res) => {
    const Employee = await employeesModel.findById(req.params.id);
    res.json(Employee);
}

export default EmployeeController;