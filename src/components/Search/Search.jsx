import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Search, X } from 'lucide-react';
import Card from '../Card/Card';

export default function SongSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  
  // Get songs from Redux store
  const songs = useSelector((state) => state.song.song);
  console.log(songs)

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter songs based on search
  const filteredSongs = Array.isArray(songs) ? songs.filter(song => {
    const searchLower = debouncedTerm.toLowerCase();
    
    // Search in song_name, artist_name, and album_name (matching your Card component field names)
    return (
      (song.song_name?.toLowerCase().includes(searchLower)) ||
      (song.artist_name?.toLowerCase().includes(searchLower)) ||
      (song.album_name?.toLowerCase().includes(searchLower))
    );
  }) : [];

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search songs, artists, or albums..."
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Results - displayed as Cards */}
      {searchTerm && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {filteredSongs.length} {filteredSongs.length === 1 ? 'Result' : 'Results'}
          </h2>
          
          {filteredSongs.length > 0 ? (
            <div className="grid gap-4">
              {filteredSongs.map((song) => (
                <Card key={song.id || song.song_id} song={song} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8 bg-white rounded-lg">
              No songs found for "{searchTerm}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}