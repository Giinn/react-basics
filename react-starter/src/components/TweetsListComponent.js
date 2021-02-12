import React from "react";
import TweetComponent from "../components/TweetComponent";

const TweetsListComponent = ({ tweets, setTweets }) => {
    return (
        <div className="tweets-list">
            {tweets.map(tweet => <TweetComponent tweet={tweet} tweets={tweets} setTweets={setTweets} />)}
        </div>
    );
}

export default TweetsListComponent;