import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {

  const saveToWatchHistory = async () => {
    const username = localStorage.getItem('username');
  
    if (!username) {
      alert('You must be logged in to save video history');
      return;
    }
  
    const videoDetails = {
      videoId: videoId || demoVideoUrl,
      title: snippet?.title || demoVideoTitle,
      channelId: snippet?.channelId,
      channelTitle: snippet?.channelTitle || demoChannelTitle,
      thumbnailUrl: snippet?.thumbnails?.high?.url || demoThumbnailUrl, // Add thumbnail URL
    };
  
    try {
      const res = await fetch(`https://signup-form-10f8e-default-rtdb.firebaseio.com/WatchHistory/${username}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(videoDetails)
      });
  
      if (res.ok) {
        console.log('Video saved to watch history');
      } else {
        console.error('Failed to save video to watch history');
      }
    } catch (error) {
      console.error('Error saving watch history:', error);
    }
  };  

  return (
    <Card sx={{ width: { xs: '95vw', sm: '358px', md: '320px' }, boxShadow: 'none', borderRadius: 0 }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} onClick={saveToWatchHistory}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title || demoVideoTitle}
          sx={{ width: '100%', height: 180 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} onClick={saveToWatchHistory}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Typography variant="subtitle2" fontWeight="bold" color="gray" sx={{ display: 'flex', alignItems: 'center' }}>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
