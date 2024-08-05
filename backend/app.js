const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./model/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("replace with you connection string").then(() => {
    console.log("Connected to database");
})
.catch(() => {
    console.log("connection failed");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message:'Post added successfully'
    });
});

app.get('/api/posts',(req, res, next) => {
    Post.find().then( documents => {
        res.status(200).json({
            message:'Posts fetched successfully',
            posts: documents
        });
    });
    
});

module.exports = app;