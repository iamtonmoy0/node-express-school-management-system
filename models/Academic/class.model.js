const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ClassLevelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    //students will be added to the class level when they are registered
    students: [
      {
        type: ObjectId,
        ref: "Student",
      },
    ],
    //optional.
    subjects: [
      {
        type: ObjectId,
        ref: "Subject",
      },
    ],
    teachers: [
      {
        type: ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

const ClassLevel = mongoose.model("ClassLevel", ClassLevelSchema);

module.exports = ClassLevel;
