const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator/check')


//@route  POST api/users
//@desc   Register a user
//@access Public
router.post('/', [
    check('name', 'Please add nane').not().isEmpty(),
    check('email', 'Plase include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array() })
    }

    res.send('passed')
})



module.exports = router;