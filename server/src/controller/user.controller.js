import User from "../models/User.js";

export const getProfile = async (req, res) => {
	try {
		const user = req.user;
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			accountNumber: user.accountNumber,
			balance: user.balance,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.error("Error in getProfile:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};



export const getAllUsers = async(req,res)=>{
    try {
        const users =  await User.find({}).select("-password")
        if(!users || users.length===0){
            return res.status(404).json({message:"No uses found"})
        }
        return res.status(200).json(users)
        
    } catch (error) {
        console.error("Error in getAllUsers: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const unlockUser = async(req,res)=>{
    const {userId} = req.params

    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await user.save()

        res.status(200).json({
            message:`Account for ${user.fullName} has been unlocked successfully`
        })
    } catch (error) {
        console.error("Unlock Error:", error);
        res.status(500).json({ message: "Failed to unlock user" });
    }
}