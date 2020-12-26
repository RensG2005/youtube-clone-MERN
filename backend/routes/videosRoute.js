const router = require("express").Router()
const Video = require("../models/videoModel")
require("dotenv").config()

router.post("/postVideo", async (req, res) => {
    try{

         const {video, description, title, artist, thumbnail, commentCount, dislikeCount, likeCount, viewCount, userPicture, comments} = req.body
         if(!video || !description || !title || !artist || !thumbnail)
            return res.status(400).json({msg: "Not all fields have been entered."})
    
         const dbVid = new Video({
            video: `https://www.youtube-nocookie.com/embed/${video}?loop=1&modestbranding=1&rel=0&cc_load_policy=1&fs=0&color=white`,
            description,
            title,
            artist,
            thumbnail,
            commentCount,
            dislikeCount,
            likeCount,
            viewCount,
            userPicture,
            comments
        })

        const savedVid = await dbVid.save()
    
        res.json(savedVid)
    } catch(err){
        res.status(500).json({error: err.message})
    }
})

router.get("/all", async (req, res, next) => {
    let skip = req.query.skip || 0
    let limit = req.query.limit || 9
    Promise.all([
        Video.countDocuments(),
        Video.find()
        .limit( parseInt(limit) )
        .skip( parseInt(skip) )
        .sort( {'createdAt': -1} )
    ])
    .then(([total,  allVids]) => {
        if (allVids !== []){
            res.json({total, skip, limit, allVids})
        }
    }).catch(next)
})

router.delete("/:id", async (req, res) => {
    const video = await Video.findOne({_id: req.body.id})
    if(!video)
        return res.status(400).json({msg: "No Video found with this ID"})
    const deletedVideo = await Video.findByIdAndDelete(req.body.id)
    res.json(deletedVideo)
})

router.get("/getKey", async (req, res) => {
 res.json(process.env.KEY)
})

module.exports = router