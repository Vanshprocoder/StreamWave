import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

// Debounce Function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Debounced input handler
  const handleInputChange = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm('');
    }
  };

  return (
    <div>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderRadius: 20,
          border: '1px solid #e3e3e3',
          pl: 2,
          boxShadow: 'none',
          mr: { sm: 5 },
        }}
      >
        <input
          className="search-bar"
          placeholder="Search..."
          onChange={(e) => handleInputChange(e.target.value)} // Use debounced handler
        />
        <IconButton type="submit" sx={{ p: '10px', color: 'red' }}>
          <Search />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchBar;
