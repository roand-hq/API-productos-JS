const logoutController = {};

logoutController.logout = async (req,res) =>{ 
//borrar la cookie de inicio de sesion
res.clearCookie("loginToken")
res.json({message:"Logged out successfully"})
}

export default logoutController;