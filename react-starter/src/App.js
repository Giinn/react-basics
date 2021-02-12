import React, { useState } from 'react';
import CreateTweetComponent from './components/CreateTweetComponent';
import TweetsListComponent from './components/TweetsListComponent';

function App() {

	// React hooks --> useState

	// CreateTweetComponent
	const [textInput, setTextInput] = useState('');
	const [tweets, setTweets] = useState([]);

	//TweetComponent
	const [name, setName] = useState('Gintaras');

	const testingHowStringStarts = () => {
		const vardas = 'Gintaras';

		// check if string starts with what you specify
		const vardas2 = vardas.startsWith('Gin');

		if (vardas2) {
			console.log(true);
		} else {
			console.log(false);
		}
	}

	return (
		<div>
			<CreateTweetComponent
				textInput={textInput}
				setTextInput={setTextInput}
				setTweets={setTweets}
				tweets={tweets}
			/>

			<TweetsListComponent name={name} tweets={tweets} setTweets={setTweets} />
		</div>
	);
}

export default App;
