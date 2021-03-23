/* 
To Do: 
- "Add Entry" btn should: 
    - Add an entry to the ROA 
    - If there are no entries in the ROA, display a notification "No entires in the ROA"



POST-DRAFT REFACTOR: 
    - Go thru and make sure each function only does one job, if n+1 then split into smaller functions
*/

'use strict';

function updateCaseSummaryBanner(docket, name, dob, alerts) {
	const caseSummaryDocket = document.getElementById(
		'case-summary-banner-docket',
	);
	const caseSummaryName = document.getElementById('case-summary-banner-name');
	const caseSummarydob = document.getElementById('case-summary-banner-dob');
	const caseSummaryAlerts = document.getElementById(
		'case-summary-banner-alerts',
	);

	caseSummaryDocket.textContent = docket;
	caseSummaryName.textContent = name;
	caseSummarydob.textContent = dob;
	if (alerts.length > 1) {
		let newTextContent = '';
		for (let i = 0; i < alerts.length; i++) {
			let alert = newTextContent === '' ? `${alerts[i]} ` : `/ ${alerts[i]} `;
			newTextContent = newTextContent.concat(alert);
		}
		caseSummaryAlerts.textContent = newTextContent;
	} else {
		caseSummaryAlerts.textContent = alerts;
	}
}

// toggled from successful/failed payment
function toggleNotification(msg) {
	const div = document.getElementById('paymentNotification');

	function displayMsg() {
		div.textContent = msg.textContent;
		div.style.color = msg.color;
	}

	function clearMsg() {
		div.textContent = '';
		div.color = '';
	}

	displayMsg();
	setTimeout(clearMsg, 3000);
}

function populateViewTpc(tpcObjArray) {
	const tBody = document.getElementById('viewTpcTableBody');

	for (let payment of tpcObjArray) {
		const tr = document.createElement('tr');
		const paymentNumHeader = document.createElement('th');
		const monthData = document.createElement('td');
		const dueDateData = document.createElement('td');
		const paymentAmtData = document.createElement('td');

		paymentNumHeader.scope = 'row';

		paymentNumHeader.textContent = payment.payNum;
		monthData.textContent = payment.month;
		dueDateData.textContent = payment.dueDate;
		paymentAmtData.textContent = payment.payment;

		tr.append(paymentNumHeader, monthData, dueDateData, paymentAmtData);
		tBody.append(tr);
	}
}

function enableMakePaymentSubmitButton() {
	const invalidInputs = document
		.getElementById('makePayment-required-inputs')
		.querySelectorAll(':invalid');
	const allValidated = invalidInputs.length !== 0 ? false : true;
	const makePaymentSubmitBtn = document.getElementById('makePaymentSubmitBtn');

	return allValidated === true
		? (makePaymentSubmitBtn.disabled = false)
		: (makePaymentSubmitBtn.disabled = true);
}

function resetForm(formID) {
	const makePaymentSubmitBtn = document.getElementById('makePaymentSubmitBtn');
	makePaymentSubmitBtn.disabled = true;
	document.getElementById(formID).reset();
}

// - update general information area:
//     - #street_address
//     - #apt_lot
//     - #city
//     - #state
//     - #zipcode

//     - #homeNum
//     - #mobileNum
//     - #workNum
//     - #language

//     - #activeTpc
//     - #lastDatePaid
//     - #pastDue
//     - #cbo

// - "Edit Address" btn #editAddressButton element change to inputs for All gen info address/number
//     - Also changing the button textContent from "Edit Address" to "Submit Changes", and changing the inputs back to <li> elements.
//     - Maybe include a flash of white-green-white css background-color on the newly edited elements when switching back to <li> and the changes have been successfilly submitted.

function toggleEditGenInfo() {
	const genInfoLiArray = document.getElementsByClassName('gen-info-li');

	const originalInfo = {};

	function convertInputToSpan() {
		const genInfoLiArray = document.getElementsByClassName('gen-info-li');

		for (const li of genInfoLiArray) {
			const input = li.lastElementChild;

			const span = document.createElement('span');
			span.id = input.id;
			span.textContent = originalInfo[li.firstElementChild.textContent];

			input.remove();
			li.append(span);
		}

		submitBtn.remove();
		cancelBtn.remove();

		editAddressBtns.append(editAddrBtn);
	}

	for (const li of genInfoLiArray) {
		const span = li.lastElementChild;

		const input = document.createElement('input');
		input.id = span.id;
		input.value = span.textContent;
		input.type = 'text';

		originalInfo[li.firstElementChild.textContent] = span.textContent;

		span.remove();
		li.append(input);
	}

	const editAddrBtn = document.getElementById('editAddressBtn');
	editAddrBtn.remove();

	const editAddressBtns = document.getElementById('editAddressBtns');

	editAddressBtns.className = 'd-flex';

	const submitBtn = document.createElement('button');
	const cancelBtn = document.createElement('button');
	cancelBtn.addEventListener('click', convertInputToSpan);

	submitBtn.className = 'col btn btn-success';
	submitBtn.id = 'edit-address-submit';
	submitBtn.textContent = 'Submit';

	cancelBtn.textContent = 'Cancel';
	cancelBtn.id = 'edit-address-cancel';
	cancelBtn.className = 'col btn btn-secondary';

	editAddressBtns.append(cancelBtn);
	editAddressBtns.append(submitBtn);
}

// **** TESTING ****

//Pulling information from sessionStorage 
const pull_profile_from_sessionStorage = () => { 
	const deft_id = JSON.parse(sessionStorage.getItem('deft_id_to_load'));
	const deft_data = JSON.parse(sessionStorage.getItem(deft_id)); 
	return deft_data; 
}

const deft_data = pull_profile_from_sessionStorage(); 

// update case detail summary banner
updateCaseSummaryBanner(deft_data.docket, `${deft_data.last_name}, ${deft_data.first_name}`, deft_data.dob, deft_data.alerts);

// toggle payment notification upon unsuccessful or successful payment
toggleNotification({
	textContent: 'PAYMENT PROCESSED SUCCESSFULLY',
	color: 'green',
});

// Create TPC table in viewTpc modal
const viewTpcBtn = document.getElementById('viewTpcBtn');
viewTpcBtn.addEventListener(
	'click',
	populateViewTpc([
		{ payNum: 1, month: 'January', dueDate: '1/12/2021', payment: '$10' },
		{ payNum: 2, month: 'February', dueDate: '2/15/2021', payment: '$10' },
		{ payNum: 3, month: 'March', dueDate: '3/15/2021', payment: '$10' },
		{ payNum: 4, month: 'April', dueDate: '4/16/2021', payment: '$10' },
		{ payNum: 5, month: 'May', dueDate: '5/15/2021', payment: '$10' },
		{ payNum: 6, month: 'June', dueDate: '6/17/2021', payment: '$10' },
		{ payNum: 7, month: 'July', dueDate: '7/15/2021', payment: '$10' },
		{ payNum: 8, month: 'August', dueDate: '8/15/2021', payment: '$10' },
		{ payNum: 9, month: 'September', dueDate: '9/18/2021', payment: '$10' },
		{ payNum: 10, month: 'October', dueDate: '10/18/2021', payment: '$10' },
		{ payNum: 11, month: 'November', dueDate: '11/17/2021', payment: '$10' },
		{ payNum: 12, month: 'December', dueDate: '12/20/2021', payment: '$1390' },
	]),
);

// Remove disable attribute from submit button for form in makePayment modal (assign to all required inputs in modal)
for (const child of document.getElementById('makePayment-required-inputs')
	.children) {
	const input = child.querySelector(':invalid');
	input.addEventListener('keypress', enableMakePaymentSubmitButton);
}

// Reset payment form on closing out makePayment Modal
const makePaymentForm = document.getElementById('makePaymentForm');
const makePaymentCancelBtn = document.getElementById('makePaymentCancelBtn');
makePaymentCancelBtn.addEventListener('click', () => {
	resetForm('makePaymentForm');
});

// toggle gen info edit inputs when "Edit Address" button is clicked
const editAddressBtn = document.getElementById('editAddressBtn');
editAddressBtn.addEventListener('click', toggleEditGenInfo);

// JQuery
$('#makePaymentModal').on('shown.bs.modal', function () {
	$('#makePaymentCardNum').trigger('focus');
});

