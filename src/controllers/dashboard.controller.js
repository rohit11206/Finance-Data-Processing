import { Record } from "../models/Record.model.js";

// 1. Dashboard Summary
export const getSummary = async (req, res) => {
  try {
    let match = {};

    // Only own data for normal users
    if (req.user.role === "user") {
      match.createdBy = req.user._id;
    }

    const income = await Record.aggregate([
      { $match: { ...match, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await Record.aggregate([
      { $match: { ...match, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = income[0]?.total || 0;
    const totalExpense = expense[0]?.total || 0;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
      },
    });
  } catch (error) {
    console.error("Dashboard Summary Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard summary",
    });
  }
};


// 2. Category-wise Stats
export const getCategoryStats = async (req, res) => {
  try {
    let match = {};

    if (req.user.role === "user") {
      match.createdBy = req.user._id;
    }

    const data = await Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Category Stats Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching category stats",
    });
  }
};


// 3. Monthly Trends
export const getMonthlyTrends = async (req, res) => {
  try {
    let match = {};

    if (req.user.role === "user") {
      match.createdBy = req.user._id;
    }

    const data = await Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Monthly Trends Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching monthly trends",
    });
  }
};


//  4. Recent Records
export const getRecentRecords = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "user") {
      query.createdBy = req.user._id;
    }

    const records = await Record.find(query)
      .populate("createdBy", "name email")
      .sort({ date: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("Recent Records Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching recent records",
    });
  }
};