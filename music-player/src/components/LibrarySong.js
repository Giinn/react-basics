import React from 'react';

const LibrarySong = ({ song, setCurrentSong }) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
    }

    return (
        <div className="library-song" onClick={songSelectHandler} >
            <img src={song.cover} alt={song.name} />
            <div class="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;