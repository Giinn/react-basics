import React, { useState, useRef } from 'react';
import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song';
import data from './util';
import Library from './components/Library';

function App() {
    // state
    const [songs, setSongs] = useState(data);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });

    // ref
    const audioRef = useRef(null);

    const timeUpdateHandler = (event) => {
        const currentTime = event.target.currentTime;
        const duration = event.target.duration;

        // when name of property in the state is the same as variable you are passing, you don't need to
        // say duration: duration
        // simple duration is enough cause it will know what you mean
        setSongInfo({ ...songInfo, currentTime, duration });
    }

    return (
        <div className="app">
            <Song currentSong={currentSong} />
            <Player
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
            />
            <Library
                isPlaying={isPlaying}
                setSongs={setSongs}
                songs={songs}
                audioRef={audioRef}
                setCurrentSong={setCurrentSong}
            />
            <audio
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onLoadedMetadata={timeUpdateHandler}
            />
        </div>
    );
}

export default App;
