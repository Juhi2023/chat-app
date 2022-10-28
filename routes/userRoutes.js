const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router()


router.post('/login', authUser)
router.post('/signup', registerUser)
router.get('/', protect, allUsers)

module.exports = router;