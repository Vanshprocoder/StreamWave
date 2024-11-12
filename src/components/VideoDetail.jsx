import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from './';
import { fetchAPI } from "../utils/fetchAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundAudio, setBackgroundAudio] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch video details and related videos
    fetchAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data.items[0]));
    fetchAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => {
      setVideos(data.items);
      setCurrentIndex(0);
    });

    // Cleanup background audio when component unmounts
    return () => {
      if (backgroundAudio) {
        backgroundAudio.pause();
        setBackgroundAudio(null);
      }
    };
  }, [id]);

  // Background audio feature when screen becomes inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !backgroundAudio) {
        const audio = new Audio(`https://www.youtube.com/watch?v=${id}`);
        audio.loop = true;
        audio.play();
        setBackgroundAudio(audio);
      } else if (document.visibilityState === 'visible' && backgroundAudio) {
        backgroundAudio.pause();
        setBackgroundAudio(null);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [id, backgroundAudio]);

  const handleVideoEnd = () => {
    if (videos && currentIndex < videos.length - 1) {
      setTimeout(() => {
        const nextVideoId = videos[currentIndex + 1]?.id?.videoId;
        if (nextVideoId) {
          navigate(`/video/${nextVideoId}`);
          setCurrentIndex(currentIndex + 1);
        }
      }, 5000); // 5-second delay
    }
  };

  if (!videoDetail?.snippet) return 'Loading...';

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              playing={true}
              onEnded={handleVideoEnd} // Triggers autoplay on video end
            />
            
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
