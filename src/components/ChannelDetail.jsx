import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import {Videos, ChannelCard} from './';
import { fetchAPI } from "../utils/fetchAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const[videos, setVideos] = useState([])
  const { id } = useParams();

  console.log(channelDetail, videos)

  useEffect(() => {
    fetchAPI(`channels?part=snippet&id=${id}`).then((data) => setChannelDetail(data?.items[0]));

    fetchAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => setVideos(data?.items));
  }, [id])
  return (
    <Box minheight="100vh">
      <Box>
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(76,19,82,1) 0%, rgba(136,10,115,1) 54%, rgba(211,0,255,1) 100%)',
            zIndex: 10,
            height: '250px',
            
            
          }}
        />
          <ChannelCard channelDetail={channelDetail} marginTop="-120px" />
      </Box>
      <Box display= "flex" p="2">
        <Box sx = {{mr:{sm: '120px'}}} />
          <Videos videos={videos}/>

        

      </Box>
    </Box>
  )
}

export default ChannelDetail
