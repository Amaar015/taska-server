import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    dueDate: {
      type: Date,
      default: Date.now(),
    },
    assignee: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Normal", "High"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Active", "Closed"],
    },
    description: {
      type: String,
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const task = mongoose.model("task", taskSchema);

export default task;
