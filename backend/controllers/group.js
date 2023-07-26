const group = require("../models/groups");

const addGroup = async (req, res) => {
  try {
    let members = req.body.userids; //["64bf4d6e3528564d5a7aa3b5", "64bf4d7f3528564d5a7aa3b6"];
    let name = req.body.name; //["1","2","3"]
    let newGroup = { members, name };
    await group.insertMany(newGroup);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};

module.exports = { addGroup };
