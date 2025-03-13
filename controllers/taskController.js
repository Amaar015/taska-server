import task from "../models/tasksModel.js";

export const createTask = async (req, res) => {
  try {
    let { title, assignee, assignedBy } = req.body;
    if (!req.body) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const existing_Task = await task.findOne({ title, assignee, assignedBy });
    if (existing_Task) {
      return res.status(400).json({
        message: "Task Already exist",
        success: false,
      });
    } else {
      const Task = await task.create(req.body);
      return res.status(200).json({
        message: "Task created Success",
        success: true,
        Task,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      success: false,
      error,
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const { assignedBy } = req.query;
    const Task = await task
      .find({ assignedBy })
      .populate("assignedBy", "name")
      .sort({ createdAt: -1 });
    if (!Task) {
      return res.status(400).json({
        message: "Task not exists",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "All task found",
        success: true,
        task: Task,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      success: false,
      error,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    let { id } = req.params;
    const Task = await task.findById(id);
    return res.status(200).json({
      message: "All task found",
      success: true,
      task: Task,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      success: false,
      error,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    let { id } = req.params;

    const tasks = await task.deleteOne({ _id: id });
    if (tasks) {
      return res.status(200).json({
        message: "Task deleted Successfully",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong!",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      success: false,
      error,
    });
  }
};
