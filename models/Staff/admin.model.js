const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    academicTerms: [
      {
        type: ObjectId,
        ref: "AcademicTerm",
      },
    ],
    programs: [
      {
        type: ObjectId,
        ref: "Program",
      },
    ],
    yearGroups: [
      {
        type: ObjectId,
        ref: "YearGroup",
      },
    ],
    academicYears: [
      {
        type: ObjectId,
        ref: "AcademicYear",
      },
    ],
    classLevels: [
      {
        type: ObjectId,
        ref: "ClassLevel",
      },
    ],
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
      },
    ],
  },
  {
    timestamps: true,
  }
);
// hash password
adminSchema.pre("save",async function(next){
  if(!this.isModified("password")){
next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next();
})
// compare password
adminSchema.methods.verifyPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;