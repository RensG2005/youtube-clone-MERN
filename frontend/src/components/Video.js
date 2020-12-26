import React, {useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Video({video, setWatch, setCurrentVideo, deleteVid}) {

    const [showBtn, setShowBtn] = useState(false)

    return (
        <>
        <div className="name"  >
            <img src={video.thumbnail} alt="thumbnail" onClick={() => {setWatch(true); setCurrentVideo(video); window.scrollTo(0,0);}} />
            {showBtn ? <button onClick={() => deleteVid(video)} className="deleteBtn">Delete</button> : ""}
            <FontAwesomeIcon className="icon" icon={faBars} onClick={() => {setShowBtn(!showBtn)}} />
            <div className="text" onClick={() => {setWatch(true); setCurrentVideo(video); window.scrollTo(0,0);}}>
                <h1>{video.title}</h1>
                <h2>{video.artist}</h2>
            </div>
        </div>
            </>
    )
}
