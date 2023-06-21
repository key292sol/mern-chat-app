const { register, login, setAvatar, getAllUsers } = require('../controllers/usersController');

const userRoutes = require('express').Router();

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.post('/setAvatar/:id', setAvatar)

userRoutes.get('/allUsers/:id', getAllUsers)

module.exports = { userRoutes }