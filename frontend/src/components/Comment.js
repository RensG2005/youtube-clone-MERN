import React, { useState } from 'react'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function Comment(comment) {

    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)

    let a = Math.round(parseInt(comment.comment.snippet.topLevelComment.snippet.likeCount))
    let c = a++

    return (
        <div className="comment">
                <div style={{display: 'flex'}}>
                <img className="profilepic" height="40px" width="40px" src={comment.comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="comment profile pic" />
                <div style={{marginLeft: '1rem'}}>
            <div className="user">
                <h3 className="author">{comment.comment.snippet.topLevelComment.snippet.authorDisplayName}</h3>
                <h5 className="date">{comment.comment.snippet.topLevelComment.snippet.publishedAt.slice(0, 10)}</h5>
            </div>
            <h3 className="display">{comment.comment.snippet.topLevelComment.snippet.textDisplay}</h3>


            <div className={like || dislike ? "blue commentLike" : 'commentLike'}>
                        <h6>{like ? a : c} Likes</h6>
                        <FaThumbsUp className="commentIcon" color={like ? "rgb(6, 95, 212)" : ""} onClick={() => {setLike(!like); setDislike(false) }} />
                        <FaThumbsDown className="commentIcon" color={dislike ? "rgb(6, 95, 212)" : ""} onClick={() => {setDislike(!dislike); setLike(false); }} />
                    </div>


            {comment.comment.snippet.totalReplyCount ? <h4 className="commentReplies">Look at {comment.comment.snippet.totalReplyCount} Replies</h4> : ''}
            </div>
        </div>
        </div>
    )
}
