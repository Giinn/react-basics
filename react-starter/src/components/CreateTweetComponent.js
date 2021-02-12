import React from 'react';

const CreateTweetComponent = ({ textInput, setTextInput, setTweets, tweets }) => {

    const userInputHandler = (e) => {
        setTextInput(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        setTweets([...tweets, textInput]);
        setTextInput('');
    }

    return (
        <form onSubmit={submitHandler}>
            <textarea value={textInput} onChange={userInputHandler} cols="50" rows="5"></textarea>
            <button>Submit</button>
        </form>
    );
}
 
export default CreateTweetComponent;