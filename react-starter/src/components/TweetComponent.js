import React from 'react';

const TweetComponent = ({ tweet, tweets, setTweets }) => {
    const deleteTweet = () => {
        setTweets(tweets.filter(tw => tw !== tweet))
    }

    return (
        <div>
            <h2>{tweet}</h2>
            <button onClick={deleteTweet}>Delete</button>
            <button>Save</button>
        </div>
    )
}

export default TweetComponent;
