import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Box} from '@mui/material'

import {Navbar, Feed, VideoDetail, SearchFeed, ChannelDetail, LoginForm, SignupForm, History} from "./components";

const App = () => (
    <BrowserRouter>
      <Box sx={{backgroundColor: '#000'}}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail/>} />
          <Route path="/channel/:id" element={<ChannelDetail/>} />
          <Route path="/search/:searchTerm" element={<SearchFeed/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )


export default App
