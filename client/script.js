const twatInput = document.querySelector('#twat');
const numInput = document.querySelector('#num');
const submit = document.querySelector('#submit');
const twatsSection = document.querySelector('.twats');

submit.addEventListener('click', () => {
	addTwat(twatInput.value, numInput.value);
});

window.addEventListener('load', () => {
	getTwats();
});

const addTwat = async (twat, number) => {
	const toAdd = { twat, number };
	await fetch('http://localhost:5000/twats', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(toAdd),
	});
	location.reload();
};

const getTwats = async () => {
	const apiRequest = await fetch('http://localhost:5000/twats');
	const response = await apiRequest.json();
	response.forEach(item => {
		const delId = `${item._id}del`;
		const updId = `${item._id}upd`;
		twatsSection.innerHTML += `
				<div>
					<h1>${item.twat}</h1>
					<h2>${item.number}</h2>
					<button id=${delId}>Delete</button>
					<button id=${updId}>Update</button>
				</div>
		`;
		document.getElementById(delId).addEventListener('click', () => {
			deleteTwat(item._id);
		});

		document.getElementById(updId).addEventListener('click', () => {
			updateTwat(item._id, twatInput.value, numInput.value);
		});
	});
};

const deleteTwat = async id => {
	console.log('DELETE');
	await fetch(`http://localhost:5000/twats/${id}`, {
		method: 'DELETE',
	});
	location.reload();
};

const updateTwat = (id, twat, number) => {
	console.log(id, twat, number);
};
