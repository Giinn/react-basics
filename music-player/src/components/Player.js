import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, currentSong, setCurrentSong, setSongs }) => {

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        });

        setSongs(newSongs);
    }

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const playPauseIconHandler = () => {
        return isPlaying ? faPause : faPlay;
    }

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const dragHandler = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongInfo({ ...songInfo, currentTime: event.target.value });
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        if (direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }

        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if (isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) audioRef.current.play();
    }

    // styles for track slider
    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player-container" >
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }} >
                    <input
                        type="range"
                        min={0}
                        max={songInfo.duration}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                    />
                    <div className="animate-track" style={trackAnimation} />
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    icon={faAngleLeft}
                    size="2x"
                    onClick={() => skipTrackHandler('skip-back')}
                />
                <FontAwesomeIcon
                    className="play"
                    icon={playPauseIconHandler()}
                    size="2x"
                    onClick={playSongHandler}
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    icon={faAngleRight}
                    size="2x"
                    onClick={() => skipTrackHandler('skip-forward')}
                />
            </div>
        </div>
    )
}

export default Player;
