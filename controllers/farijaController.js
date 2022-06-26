const express = require('express')
const fs = require('fs')
const multer = require('multer')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('../models/userschema')
const path = require('path')



const getView = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        console.log(user)
        res.send(user)
    } catch (err) {
        res.send(err)
        console.log(err)
    }
    // res.send("hi")
}

const postView = async (req, res) => {
    try {

        console.log(req.file.originalname)
        let __dirname = path.resolve();

        const featuredImagePath = req.file.path;

        if (req.file) {
            featuredImage = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename), { encoding: "base64" })
            }
        }
        const user = new User({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
            featuredImage: featuredImage,
            featuredImagePath: featuredImagePath
        })
        await user.save()
        console.log(user)
        //res.send(user)

        if (user) {
            res.json({
                _id: user._id,
                title: user.title,
                description: user.description,
                status: user.status,
                priority: user.priority,
                featuredImage: user.featuredImage,
                featuredImagePath: user.featuredImagePath
            })
        }
    } catch (err) {
        res.send(err)
        console.log(err)
    }
}

const putView = async (req, res) => {
    //Find One

    const user = await User.findOne({ _id: req.params.id })
    //console.log(user)
    // res.send(user)
    var __dirname = path.resolve();

    if (user) {
        user.title = req.body.title || user.title
        user.description = req.body.description || user.description

        if (req.file) {

            fs.unlinkSync(user.featuredImagePath)
            user.featuredImagePath = req.file.path
            user.featuredImage = {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename), { encoding: "base64" })
            };
        } else {
            user.featuredImage = user.featuredImage;
            user.featuredImagePath = user.featuredImagePath
        }
        user.status = req.body.status || user.status
        user.priority = req.body.priority || user.priority

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            title: updatedUser.title,
            description: updatedUser.description,
            featuredImage: updatedUser.featuredImage,
            featuredImagePath: updatedUser.featuredImagePath,
            status: updatedUser.status,
            priority: updatedUser.priority
        })
        console.log(updatedUser)

    } else {
        res.status(404);
        throw new Error("User not found")
    }
}

const deleteView = async (req, res) => {

    if (!await User.findOne({ _id: req.params.id })) {
        res.send("User Not Found")
    } else {
        const user = await User.findOne({ _id: req.params.id })
        console.log(user)

        fs.unlinkSync(user.featuredImagePath)
        await User.findByIdAndDelete({ _id: req.params.id })
        res.send("Deleted Successfully")
    }
}
module.exports = { getView, postView, putView, deleteView }
