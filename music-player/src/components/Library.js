import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs }) => {
    return (
        <div class="library">
            <h2>Library</h2>
            <div class="library-songs">
                {songs.map(song => <LibrarySong
                    song={song}
                    setCurrentSong={setCurrentSong}
                    songs={songs}
                    key={song.id}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setSongs={setSongs}
                    id={song.id}
                />)}
            </div>
        </div>
    )
}

export default Library;