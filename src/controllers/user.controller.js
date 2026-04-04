import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error.message);
    res.status(500).json({  
        success: false,
        message: 'Server error while fetching users'
    });
  } 
};
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get User By ID Error:", error.message);
    res.status(500).json({  
        success: false,
        message: 'Server error while fetching user'
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { role, status } = req.body;

    const updateData = {};

    // Validate role
    if (role) {
      if (!["user", "analyst", "admin"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user role",
        });
      }
      updateData.role = role;
    }

    // Validate status
    if (status) {
      if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user status",
        });
      }
      updateData.status = status;
    }

    // ❗ No fields provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error("Update User Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false, 
        message: "User not found",
      });
    }   
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    res.status(500).json({
        success: false,
        message: 'Server error while deleting user'
    });
  }
};  