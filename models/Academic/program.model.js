const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const ProgramSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index:true
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: "4 years",
    },
    // created automatically
    code: {
      type: String,
      default: function () {
        return (
          this.name
            .split(" ")
            .map(name => name[0])
            .join("")
            .toUpperCase() +
          Math.floor(10 + Math.random() * 90) +
          Math.floor(10 + Math.random() * 90)
        );
      },
    },
    createdBy: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    teachers: [
      {
        type: ObjectId,
        ref: "Teacher",
      },
    ],
    students: [
      {
        type: ObjectId,
        ref: "Student",
        default: [],
      },
    ],
	subjects: [
      {
        type: ObjectId,
        ref: "Subject",
        default: [],
      },
    ],
  },
  { timestamps: true }
);
const Program = mongoose.model("Program", ProgramSchema);

module.exports = Program;