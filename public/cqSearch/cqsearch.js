const [allTime, customTime] = document.getElementsByName('timeRange');

const useQueuesCheckBox = document.getElementById('useQueues');
const primaryQueueDropdown = document.getElementById('primaryQueue');

const customSearchCheckBox = document.getElementById('customSearchCheckBox');
const customSearchGroup = document.querySelectorAll("[name='customSearch']");

// date picker funcs
function toggleNotificationEnabled() {
	const div = document.getElementById('disabledDPNotification');
	const textElm = document.getElementById('disabledDPNotificationText');

	if (customTime.checked) {
	}

	return customTime.checked
		? ((div.style.backgroundColor = 'lightgreen'),
		  (textElm.textContent = 'Date Pickers Enabled'))
		: ((div.style.backgroundColor = 'orange'),
		  (textElm.textContent = 'Date Pickers Disabled, select Custom to enable'));
}

function toggleDatePicker() {
	const startDatePicker = document.getElementById('startDate');
	const endDatePicker = document.getElementById('endDate');

	if (customTime.checked) {
		startDatePicker.disabled = false;
		endDatePicker.disabled = false;
	} else {
		startDatePicker.disabled = true;
		endDatePicker.disabled = true;
	}
}

function DatePickerEventHandler() {
	toggleDatePicker();
	toggleNotificationEnabled();
}

// useQueues funcs

function cleanSubQueue() {
	const sQueue = document.getElementById('subQueue');

	for (let i = sQueue.options.length - 1; i > 0; i--) {
		if (sQueue.options[i].value === 'subQueueTitle') break;
		sQueue.remove(i);
	}
}

function resetQueues() {
	const pQueue = document.getElementById('primaryQueue');
	const sQueue = document.getElementById('subQueue');

	pQueue.disabled = true;
	sQueue.disabled = true;

	pQueue.options[0].selected = true;
	sQueue.options[0].selected = true;
	cleanSubQueue();
}

function enableSubQueue() {
	const pQueue = document.getElementById('primaryQueue');
	const sQueue = document.getElementById('subQueue');

	return useQueuesCheckBox.checked && pQueue.value !== 'primaryQueueTitle'
		? (sQueue.disabled = false)
		: (sQueue.disabled = true);
}

function enablePrimaryQueue() {
	const pQueue = document.getElementById('primaryQueue');
	const sQueue = document.getElementById('subQueue');

	if (useQueuesCheckBox.checked) {
		pQueue.disabled = false;
		enableSubQueue();
	} else {
		resetQueues();
	}
}

function buildActiveTpcSubQueue() {
	const sQueue = document.getElementById('subQueue');
	const options = [
		{
			id: 'onSchedule',
			textContent: 'ON SCHEDULE',
			value: 'onSchedule',
		},
		{
			id: 'pastDue',
			textContent: 'PAST DUE',
			value: 'pastDue',
		},
	];

	for (const option of options) {
		let optionTag = document.createElement('option');
		optionTag.id = option.id;
		optionTag.value = option.value;
		optionTag.textContent = option.textContent;
		sQueue.append(optionTag);
	}
}

function buildInactiveTpcSubQueue() {
	const sQueue = document.getElementById('subQueue');
	const options = [
		{
			textContent: 'BANKRUPTCY',
			value: 'bankruptcy',
		},
		{
			textContent: 'FARE',
			value: 'fare',
		},
		{
			textContent: 'SKIP TRACE',
			value: 'skipTrace',
		},
		{
			textContent: 'RESCHEDULE ATTEMPT',
			value: 'rescheduleAttempt',
		},
	];

	for (option of options) {
		let optionTag = document.createElement('option');
		optionTag.value = option.value;
		optionTag.textContent = option.textContent;
		sQueue.append(optionTag);
	}
}

function buildSubQueue() {
	const pQueueValue = document.getElementById('primaryQueue').value;

	switch (pQueueValue) {
		case 'primaryQueueTitle':
			cleanSubQueue();
			break;
		case 'activeTpc':
			cleanSubQueue();
			buildActiveTpcSubQueue();
			break;
		case 'inactiveTpc':
			cleanSubQueue();
			buildInactiveTpcSubQueue();
			break;
		default:
			cleanSubQueue();
	}
}

function disableUseQueues() {
	return (useQueuesCheckBox.checked = false);
}

//Custom search funcs

function toggleEnableCustomSearch() {
	const customSearchGroup = document.querySelectorAll("[name='customSearch']");

	if (customSearchCheckBox.checked) {
		for (const item of customSearchGroup) {
			item.disabled = false;
		}
		disableUseQueues();
		resetQueues();
	} else {
		for (const item of customSearchGroup) {
			item.disabled = true;
			item.checked = false;
		}
	}
}

function disabledBasedOnSelection() {
	function disableAndUncheck(tag) {
		function uncheckTag(tag) {
			return (tag.checked = false);
		}
		function disableTag(tag) {
			return (tag.disabled = true);
		}

		uncheckTag(tag);
		disableTag(tag);
	}

	function enableTag(tag) {
		return (tag.disabled = false);
	}

	const inactiveCB = document.getElementById('inactiveCB');
	const activeCB = document.getElementById('activeCB');
	const resolvedCB = document.getElementById('resolvedCB');
	const pastDueCB = document.getElementById('pastDueCB');
	const onScheduleCB = document.getElementById('onScheduleCB');
	const fareCB = document.getElementById('fareCB');
	const bankCB = document.getElementById('bankCB');
	const dsoCB = document.getElementById('dsoCB');

	if (this.checked) {
		switch (this) {
			case inactiveCB:
				disableAndUncheck(activeCB);
				disableAndUncheck(resolvedCB);
				disableAndUncheck(pastDueCB);
				disableAndUncheck(onScheduleCB);
				break;
			case activeCB:
				disableAndUncheck(inactiveCB);
				disableAndUncheck(resolvedCB);
				disableAndUncheck(fareCB);
				disableAndUncheck(bankCB);
				disableAndUncheck(dsoCB);
				break;
			case resolvedCB:
				disableAndUncheck(inactiveCB);
				disableAndUncheck(activeCB);
				disableAndUncheck(onScheduleCB);
				disableAndUncheck(pastDueCB);
				break;
			default:
				break;
		}
	} else {
		switch (this) {
			case inactiveCB:
				enableTag(activeCB);
				enableTag(resolvedCB);
				enableTag(pastDueCB);
				enableTag(onScheduleCB);
				break;
			case activeCB:
				enableTag(inactiveCB);
				enableTag(resolvedCB);
				enableTag(fareCB);
				enableTag(bankCB);
				enableTag(dsoCB);
				break;
			case resolvedCB:
				enableTag(inactiveCB);
				enableTag(activeCB);
				enableTag(onScheduleCB);
				enableTag(pastDueCB);
				break;
			default:
				break;
		}
	}
}

allTime.addEventListener('click', DatePickerEventHandler);
customTime.addEventListener('click', DatePickerEventHandler);

useQueuesCheckBox.addEventListener('click', enablePrimaryQueue);
primaryQueueDropdown.addEventListener('change', enableSubQueue);
primaryQueueDropdown.addEventListener('change', buildSubQueue);

customSearchCheckBox.addEventListener('click', toggleEnableCustomSearch);

for (const item of customSearchGroup) {
	item.addEventListener('click', disabledBasedOnSelection);
}

// returned results funcs
// this area is not complete due to not back-end hook up, left open for now

// the code below is just for demonstration for MVP front-end
const resultsContainer = document.getElementById('results');

const resultsAttributes = {
	class: 'col p-3 d-flex justify-content-center text-center',
	style: 'background-color: #ecece7; border: solid 1px;',
};

let resultsCounter = 0;

function displayResultsCount() {
	const display = document.getElementById('results-counter');
	display.innerHTML = '';
	const div = document.createElement('div');
	div.className = 'col-md-12';
	div.innerHTML = `Count: ${resultsCounter}`;
	div.style = 'font-weight: bold;';
	display.append(div);
}

function addToCount() {
	console.log('fired');
	resultsCounter++;
}

function resetCounter() {
	resultsCounter = 0;
}

function clearResults() {
	document.getElementById('results').innerHTML = '';
}

function createResult(id, profile) {
	clearResults();
	resetCounter();
	const resultsDiv = document.getElementById('results');
	const row = document.createElement('div');
	row.className = 'row mx-1';

	for (const prop in profile) {
		const div = document.createElement('div');
		div.className = resultsAttributes.class;
		div.style = resultsAttributes.style;
		div.textContent = profile[prop];
		div.id = `result-${id}`
		div.onclick = () => {
			sessionStorage.setItem('deft_id_to_load', id);
			window.open('../cqCaseDetail/cqCaseDetail.html', '_blank');
		}
		row.append(div);
	}
	row.id = id; 
	resultsDiv.append(row);
	addToCount();
	displayResultsCount();
}

const searchByQueueSubmitButton = document.getElementById(
	'searchByQueueSubmitButton',
);

searchByQueueSubmitButton.addEventListener('click', (event) => {
	event.preventDefault();
});

const searchByDeftForm = document.getElementById('searchByDefendantForm');

const submitForm = async (event) => {
	event.preventDefault();
	let form = document.forms[event.target.id];
	let formData = new FormData(form);
	const server = '../../index.js';
	const url = new URL(server);

	for (let [name, value] of formData) {
		let uppercaseValue = value.toUpperCase();
		if (value === '') continue;
		url.searchParams.append(name, uppercaseValue);
	}

	const response = await fetch(url);
	const jsonObj = await response.json();

	return jsonObj.defendant_data;
};

const render_and_add_to_session_storage = (id, profile) => {
	add_to_session_storage(id, profile);
	createResult(id, profile);
};

function transform_deft_data(deft_data) { 
	const addAlerts = (...args) => {
		let array = [];

		for (let obj of args) {
			const key = Object.keys(obj)[0];
			const value = Object.values(obj)[0];
			if (value) array = array.concat(key.toUpperCase());
		}


		return array;
	};
	
	const profile = {
		first_name: deft_data.first_name, 
		last_name: deft_data.last_name,
		dob: deft_data.dob,
		docket: deft_data.docket,
		cbo: `$${deft_data.cbo}`,
		alerts: addAlerts(
			{ dso: deft_data.dso },
			{ fare: deft_data.fare },
			{ rest: deft_data.rest },
			{ r11: deft_data.r11 },
		),
		activeTpc: 'TRUE', // havent et up backend data + front end calculation for this yet
		pastDue: 'TRUE', // havent et up backend data + front end calculation for this yet
		nextDueDate: '2/1/2021', // havent et up backend data + front end calculation for this yet
	};

	return profile;
}

function add_to_session_storage(deft_id, deft_profile) {
	sessionStorage.clear();
	const json = JSON.stringify(deft_profile)
	sessionStorage.setItem(`${deft_id}`, json);
}

const fetch_and_render = async (event) => {
	event.preventDefault();
	const response_data = await submitForm(event);
	const deft_profile = transform_deft_data(response_data);
	render_and_add_to_session_storage(response_data.deft_id, deft_profile); // only processes 1 deft profile, not array for MVP
};

searchByDeftForm.addEventListener('submit', fetch_and_render);
displayResultsCount();