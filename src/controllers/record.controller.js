import { Record } from "../models/Record.model";
import { recordSchema,updateRecordSchema } from "../Validation/record.validation";

export const getAllRecords = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "user") {
      query.user = req.user.id;
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const records = await Record.find(query)
     .populate("user", "name email")
     .sort({ date: -1 })
     .skip((page - 1) * limit)
     .limit(limit);

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("Get All Records Error:", error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching records'
    });
  }
};
export const getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).populate("user", "name email");
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }
    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Get Record By ID Error:", error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching record'
    });
  }
};
export const createRecord = async (req, res) => {
  try {
    const result = recordSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }   
    const { date, amount, category, description } = result.data;
    const newRecord = new Record({
      user: req.user._id,   
        date,
        amount,
        category,
        description,
    }); 
    await newRecord.save();
    res.status(201).json({
      success: true,
        message: "Record created successfully",
        data: newRecord,
    });
  } catch (error) {
    console.error("Create Record Error:", error.message);
    res.status(500).json({
        success: false, 
        message: 'Server error while creating record'
    });
  } 
};
export const updateRecord = async (req, res) => {
  try {
    const result = updateRecordSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }
    Object.assign(record, result.data);
    await record.save();
    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      data: record,
    });
  } catch (error) {
    console.error("Update Record Error:", error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while updating record'
    });
  }
};  
export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);       
    if (!record) {
      return res.status(404).json({
        success: false, 
        message: "Record not found",
        }); 
    }  
    res.status(200).json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error("Delete Record Error:", error.message);
    res.status(500).json({
        success: false, 
        message: 'Server error while deleting record'
    });
  }
};
