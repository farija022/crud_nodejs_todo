const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')

const path = require('path')
const User = require('../models/userschema')

const { getView, postView, putView, deleteView } = require('../controllers/farijaController')

const router = express.Router()
//const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.get('/:id', getView)
router.post('/', upload.single('productImage'), postView)
router.put('/:id', upload.single('productImage'), putView)
router.delete('/:id', deleteView)

module.exports = router
//module.exports = User