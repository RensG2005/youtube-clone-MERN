import React, { useState} from 'react'
import Video from "./Video"
import axios from 'axios'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Comment from './Comment'

export default function AllVids({videos, watch, setWatch, getAllVideos, setCurrentVideo, currentVideo}) {
    
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [sub, setSub] = useState("Subscribe")
    const [show, setShow] = useState(false)

    let a = Math.round(parseInt(currentVideo.likeCount))
    let b = Math.round(parseInt(currentVideo.dislikeCount))
    let c = a++
    let d = b++


    async function deleteVid(vid){

        const id = {
            id: vid._id
        }
        await axios.delete(`http://localhost:5402/videos/${vid._id}`,{data: id})
        getAllVideos()
        setWatch(false)
    }
    
    function numberWithCommas(x) {
        if(x !== undefined) {
            var parts = x.toString().split(".");
            parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
            return parts.join(",");
        } else return x
        }

    function formatTime(time) {
        if(time) {
            return time.substring(0, 10);
        } else return 0
    }

     let shortDesc = ""
    if(currentVideo.description && !show) {
        shortDesc = currentVideo.description.substring(0, 200)
    }

    return (
        <div className={watch ? "iframeAllVids" : ""} >
            {watch? <iframe frameBorder="0" className="iframeVid" width="1280" height="700" src={currentVideo.video} title={currentVideo._id}></iframe> : ""}
        <div style={{display: "flex"}}>

        
           {watch ?  <div className="metadata">

                <h2>{currentVideo.title}</h2>

                <div className="likesAndDate">
                    <h4>{formatTime(currentVideo.createdAt)} • {numberWithCommas(currentVideo.viewCount)} views</h4>
                    <div className={like || dislike ? "blue likes" : 'likes'}>
                        <h6>{like ? a : c} Likes</h6>
                        <FaThumbsUp className="licon" color={like ? "rgb(6, 95, 212)" : ""} onClick={() => {setLike(!like); setDislike(false) }} />
                        <h6>{dislike ? b : d} Dislikes</h6>
                        <FaThumbsDown className="licon" color={dislike ? "rgb(6, 95, 212)" : ""} onClick={() => {setDislike(!dislike); setLike(false); }} />
                    </div>
                </div>

                <hr></hr>

                <div className="userdata">
                    <img className="userImg" src={currentVideo.userPicture} alt="profilepic" />
                    <h3 className="artist">{currentVideo.artist}</h3>
                </div>

                <button onClick={() => {sub === "Subscribe" ? setSub("Subscribed") : setSub("Subscribe")}} className={sub === "Subscribed" ? "subBtn back" : "subBtn"}>{sub}</button>

                <p className="desc">{!show ? shortDesc : currentVideo.description}</p>
                <button className="showMore" onClick={() => {setShow(!show)}}>Show {!show ? "More" : 'Less'}</button>

                <hr></hr>

                <h2 className="commentcount">{currentVideo.commentCount} Comments</h2>

                <form className="form__group field">
                    <input type="text" className="form__field" placeholder="Name" name="name" id='name' required />
                    <label htmlFor="name" className="form__label">Comment</label>
                    <button className="placeCommmentBtn">Place</button>
                </form>


                { currentVideo ? currentVideo.comments.map(comment => {
                    return(<Comment comment={comment} key={comment.id} />)
                }) : ''}


            </div> : ''}

            <div className={watch ? "restVids": "allVids"}>
                {console.log(currentVideo._id)}
                {
                videos.filter(video => video._id !== currentVideo._id).map(video => {
                    return(<Video deleteVid={deleteVid} setCurrentVideo={setCurrentVideo} setWatch={setWatch} key={video._id} video={video} />)
                })}
                </div>
            </div>
        </div>
    )
}
 