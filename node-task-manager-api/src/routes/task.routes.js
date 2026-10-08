const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

// All task routes require JWT authentication
router.use(authenticateToken);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);

// Status update API must be admin-only
router.patch('/:id/status', requireRole('admin'), taskController.updateTaskStatus);

module.exports = router;
