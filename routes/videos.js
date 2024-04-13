const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

//creating an instance of a router
const router = express.Router();

const videosFile = "./data/videos.json";

//read videos data
const readVideosData = () => {
    try{
        const videosData = fs.readFileSync(videosFile);
        return JSON.parse(videosData);
    }
    catch(err){
        console.log("Error while reading:",err);
    }
};

// GET endpoint for all the videos
router.get("/", (_req, res) => {
    try{
        const videos = readVideosData();
        const nextVideosData = videos.map((video,index)=>({
                                                id: video.id,
                                                title: video.title,
                                                channel: video.channel,
                                                image: video.image
    }));
    res.json(nextVideosData);
    }
    catch(err){
        console("Error getting data:",err);
    }
});

// GET video by id
router.get("/:id", (req, res) => {
    const videos = readVideosData();

    // get the id from the endpoint
    const id = req.params.id;

    const video = videos.find(v => v.id === id);

    res.json(video);
});

// POST endpoint to add a video
router.post("/", (req, res) => {
    const bodyData = req.body; //getting what client passed in the body of the request
    
    const dir = 'http://localhost:8080/';
    const staticImage = 'images/upload.jpg';
    // Compose a new video object
    const newVideo = {
        id: crypto.randomUUID(),
        title: bodyData.title,
        channel: "Aiden Thompson",
        image: dir+staticImage,
        description: bodyData.description,
        duration:"4:01" ,
        views:0 ,
        likes:0 ,
        timestamp: Math.round(Date.now()) ,
        comments: [],
        
    };

    const videos = readVideosData();
    videos.push(newVideo);
    
    fs.writeFileSync(videosFile, JSON.stringify(videos));

    res.status(201).json(newVideo);
});

// To make it available in index.js
module.exports = router;