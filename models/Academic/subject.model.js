const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    teacher: {
      type: ObjectId,
      ref: "Teacher",
    },
    academicTerm: {
      type: ObjectId,
      ref: "AcademicTerm",
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: "3 months",
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
