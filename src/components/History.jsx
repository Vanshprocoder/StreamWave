import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const username = localStorage.getItem('username'); // Get the logged-in username

  useEffect(() => {
    if (!username) {
      console.error('No username found in localStorage');
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await fetch(`https://signup-form-10f8e-default-rtdb.firebaseio.com/WatchHistory/${username}.json`);

        if (!res.ok) {
          throw new Error('Failed to fetch watch history');
        }

        const data = await res.json();
        if (data) {
          // Sort videos by recently watched (latest first)
          const sortedHistory = Object.values(data).reverse();
          setHistory(sortedHistory);
        } else {
          setHistory([]); // No history found
        }
      } catch (error) {
        console.error('Error fetching watch history:', error);
      }
    };

    fetchHistory();
  }, [username]);

  // Function to remove duplicates and re-add the video at the top
  const updateHistory = async (videoDetails) => {
    // Filter out the duplicate video if it exists
    const updatedHistory = history.filter(video => video.videoId !== videoDetails.videoId);

    // Add the new video at the top
    const newHistory = [videoDetails, ...updatedHistory];

    setHistory(newHistory); // Update the local state

    // Update Firebase with the latest history
    try {
      const res = await fetch(`https://signup-form-10f8e-default-rtdb.firebaseio.com/WatchHistory/${username}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHistory) // Save the updated history without duplicates
      });

      if (!res.ok) {
        throw new Error('Failed to update history');
      }
    } catch (error) {
      console.error('Error updating watch history:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', minHeight: '100vh', backgroundColor: 'black' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', textAlign: 'center', mb: 3 }}>
        Watch History
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {history.length === 0 ? (
          <Typography variant="subtitle1" color="#fff">
            No watch history available
          </Typography>
        ) : (
          history.map((video, index) => (
            <Card key={index} sx={{ width: 320, backgroundColor: '#1e1e1e', color: '#fff', boxShadow: 3 }}>
              <Link
                to={`/video/${video.videoId}`}
                style={{ textDecoration: 'none' }}
                onClick={() => updateHistory(video)} // Call updateHistory when clicked
              >
                <CardMedia
                  component="img"
                  image={video.thumbnailUrl}
                  alt={video.title}
                  sx={{ height: 180 }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {video.title}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: 'gray' }}>
                    {video.channelTitle}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default History;
