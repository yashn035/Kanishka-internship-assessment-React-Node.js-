const prisma = require('../config/db');

const VALID_STATUSES = ['Pending', 'In Progress', 'Testing', 'Completed'];

// POST /api/tasks - Create Task
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: Task title is required.'
      });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : null,
        user_id: req.user.id,
        status: 'Pending'
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      task
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks - View Tasks
// Regular User: View own tasks
// Admin: View all tasks
const getTasks = async (req, res, next) => {
  try {
    let whereCondition = {};

    // Role-based access control: regular users only see their own tasks
    if (req.user.role !== 'admin') {
      whereCondition = { user_id: req.user.id };
    }

    const tasks = await prisma.task.findMany({
      where: whereCondition,
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id - View Specific Task
const getTaskById = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10);

    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: Invalid task ID format.'
      });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with ID ${taskId} was not found.`
      });
    }

    // Role-based authorization check
    if (req.user.role !== 'admin' && task.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to access this task.'
      });
    }

    return res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id - Update Task
const updateTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10);

    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: Invalid task ID format.'
      });
    }

    const { title, description } = req.body;

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: `Task with ID ${taskId} was not found.`
      });
    }

    // Authorization check
    if (req.user.role !== 'admin' && existingTask.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to modify this task.'
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && { description: description ? description.trim() : null })
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully.',
      task: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/tasks/:id/status - Update Task Status (Admin Only)
const updateTaskStatus = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10);

    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: Invalid task ID format.'
      });
    }

    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Validation error: Status must be one of: [${VALID_STATUSES.join(', ')}].`
      });
    }

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: `Task with ID ${taskId} was not found.`
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: `Task status updated to '${status}' successfully.`,
      task: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus
};
