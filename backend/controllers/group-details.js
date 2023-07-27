const Group = require("../models/groups");
const mongoose = require("mongoose");

const getGroupDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const groupsWithMembers = await Group.aggregate([
      {
        $match: {
          members: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "membersDetails",
        },
      },
      {
        $unwind: "$membersDetails",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          memberDetails: {
            $push: {
              _id: "$membersDetails._id",
              name: {
                $concat: [
                  "$membersDetails.firstname",
                  " ",
                  "$membersDetails.lastname",
                ],
              },
              email: "$membersDetails.email",
            },
          },
        },
      },
    ]);

    if (!groupsWithMembers.length) {
      return res.status(404).json({ message: "Groups not found" });
    }
    return res.json(groupsWithMembers);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getGroupDetails };
