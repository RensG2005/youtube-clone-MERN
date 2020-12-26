import React, { useState } from 'react'
import axios from 'axios'

export default function AddVideo({setClick, setWatch}) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState("")
    const [searchResult, setSearchResult] = useState([])

    const submit = async (e) => {
        e.preventDefault()
        if(!title) {
            setError("all fields are required")
            return 0
        }
        checkID()
    }
    
    
    async function checkID(){
        setSearchResult([])
        let key = await axios.get("http://localhost:5402/videos/getKey")
        try{
            let a = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${title}&type=video&key=${key}`)
            setTimeout(() => {
                setSearchResult(a.data.items)
            }, 1000);
        } catch(err){
            return false
        }
    }
    
    async function submitVidToDb(vid) {
        let key = await axios.get("http://localhost:5402/videos/getKey")
        const fullVid = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${vid.id.videoId}&key=${key}`)
        const fullVidStats = await  axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${vid.id.videoId}&key=${key}`)
        const comments = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=${key}&textFormat=plainText&order=relevance&part=snippet&videoId=${vid.id.videoId}&maxResults=50 `)
        const userPicture = await  axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${fullVid.data.items[0].snippet.channelId}&fields=items%2Fsnippet%2Fthumbnails&key=${key}`)

        try{
            const video = {
                video: vid.id.videoId,
                title: htmlDecode(vid.snippet.title),
                thumbnail: vid.snippet.thumbnails.high.url,
                artist: htmlDecode(vid.snippet.channelTitle),
                description: htmlDecode(fullVid.data.items[0].snippet.description),
                commentCount: fullVidStats.data.items[0].statistics.commentCount,
                dislikeCount: fullVidStats.data.items[0].statistics.dislikeCount,
                likeCount: fullVidStats.data.items[0].statistics.likeCount,
                viewCount: fullVidStats.data.items[0].statistics.viewCount,
                userPicture: userPicture.data.items[0].snippet.thumbnails.default.url,
                comments: comments.data.items
            }
            await axios.post("http://localhost:5402/videos/postVideo", video)
            setClick(false)
            setWatch(false)
        } catch(err){
            console.log(err)
        }
    }

    
    function htmlDecode(input){
        var e = document.createElement('textarea');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }


    return (
        <div>
            <h2 style={{color: "red", textAlign: "center",}}>{error}</h2>
            <form style={{ marginBottom: "3rem"}} onSubmit={submit} className="addVidForm">
                <label>Search:</label>
                <input onChange={(e)=>setTitle(e.target.value)} placeholder="pewdiepie" />
                <input value="Submit" type="submit" />
            </form>
            <div style={{display: "grid", gridTemplateColumns: "repeat(8, 230px)", margin: '0 auto', justifyContent: 'center', textAlign: "center"}}>
            {
                searchResult ? 
                searchResult.map(videoObj => {
                    return(
                        <div onClick={() => {
                            submitVidToDb(videoObj)
                        }} style={{marginTop: "1rem", cursor: 'pointer'}} key={videoObj.id.videoId}>
                            <h1 style={{fontSize: "0.8rem"}}>{title}</h1>
                            <img src={videoObj.snippet.thumbnails.default.url} alt="videoTitle" />
                        </div>
                    )
                })
                : ""
            }
            </div>
        </div>
    )
}
