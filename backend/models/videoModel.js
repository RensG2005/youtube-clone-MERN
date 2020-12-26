const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    video: {
        type: String,
        required: 'URL can\'t be empty',
    },
    title: {type: String, required: true},
    artist: {type: String, required: true},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true},
    commentCount: {type: String, required: true},
    dislikeCount: {type: String, required: true},
    likeCount: {type: String, required: true},
    viewCount: {type: String, required: true},
    userPicture: {type: String, required: true},
    comments: {type: Array, required: true},
},
    {
        timestamps: true
    }
);

module.exports = Video =  mongoose.model("video", videoSchema)