const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const academicYearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    fromYear: {
      type: Date,
      required: true,
    },
    toYear: {
      type: Date,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    students: [
      {
        type: ObjectId,
        ref: "Student",
      },
    ],
    teachers: [
      {
        type: ObjectId,
        ref: "Teacher",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//model
const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);

module.exports = AcademicYear;
