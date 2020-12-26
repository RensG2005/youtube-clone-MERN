import React, { useEffect, useState } from "react"
import AllVids from './components/AllVids'
import './App.css'
import AddVideo from "./components/AddVideo"
import axios from 'axios'
import {BottomScrollListener} from 'react-bottom-scroll-listener';
let limit = 9

function App() {
  const [currentVideo, setCurrentVideo] = useState({})
  const [videos, setVideos] = useState([])
  const [click, setClick] = useState(false)
  const [watch, setWatch] = useState(false)
  const [total, setTotal] = useState(10)

  const getAllVideos = async (a = 9) => {
    const allMovies = await axios.get(`http://localhost:5402/videos/all?limit=${a}`)
    setVideos(allMovies.data.allVids)
    setTotal(allMovies.data.total)
  }
   
  const scrollRef = () => {
    if(total >= limit){
      limit += 9
    }
    getAllVideos(limit)
  };

  useEffect(() => {
      getAllVideos()
  }, [click])


  return (
      <div className="App">
        <nav>
          <h1 style={{cursor: "pointer"}} onClick={() => {setWatch(false); setClick(false); setCurrentVideo({})}}>Youtube</h1>
          {!click ? <button style={{cursor: "pointer"}} className="addVidBtn" onClick={() => {setClick(true)}}>Add Video</button> : ''}
        </nav>
          {click ? <AddVideo setWatch={setWatch} setClick={setClick} /> : 
          <AllVids setCurrentVideo={setCurrentVideo} currentVideo={currentVideo} getAllVideos={getAllVideos} watch={watch} setWatch={setWatch} videos={videos} />
          }
        <BottomScrollListener className="indicator" onBottom={scrollRef} />
      </div>
  );
}

export default App;