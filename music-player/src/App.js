import React, { useState, useRef } from 'react';
import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
    // state
    const [songs, setSongs] = useState(data);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    });
    const [libraryStatus, setLibraryStatus] = useState(false);

    // ref
    const audioRef = useRef(null);

    const timeUpdateHandler = (event) => {
        const currentTime = event.target.currentTime;
        const duration = event.target.duration;

        // calculate percentage of the song track
        const roundedCurrent = Math.round(currentTime);
        const roundedDuration = Math.round(duration);
        const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);

        // when name of property in the state is the same as variable you are passing, you don't need to
        // say duration: duration
        // simple duration is enough cause it will know what you mean
        setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
    }

    const onEndHandler = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

        if (isPlaying) {
            audioRef.current.play();
        }
    }

    return (
        <div className={`app ${libraryStatus ? 'library-active' : ''}`}>
            <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
            <Song currentSong={currentSong} />
            <Player
                setSongs={setSongs}
                songs={songs}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                setCurrentSong={setCurrentSong}
            />
            <Library
                libraryStatus={libraryStatus}
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
                onEnded={onEndHandler}
            />
        </div>
    );
}

export default App;
