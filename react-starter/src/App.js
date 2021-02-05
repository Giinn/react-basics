import React from 'react';

function App() {

	const clickHandler = (e) => {
		console.log(e);
	}

	return (
		<div>
			<h1>Hello</h1>
			<button onClick={clickHandler} >Click</button>
		</div>
	);
}

export default App;
