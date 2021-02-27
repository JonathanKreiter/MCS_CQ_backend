const anything_but_test = (pattern, data) => {
	const patt = new RegExp(pattern);
	return patt.test(data);
};

const validate_data = (key, value, queryDataObj, testType) => {
	const stringPattern = /[^A-Za-z ]/;
	const intPattern = /[^\d]/;
	const error = { ERROR: 'INCORRECT INPUT PROVIDED' };

	if (value === '' || value === null || value === undefined) return '';

	if (testType === 'string') {
		const lettersTestOutput = anything_but_test(stringPattern, value);
		return lettersTestOutput ? error : (queryDataObj[key] = value);
	} else if (testType === 'number') {
		const intTestOutput = anything_but_test(intPattern, value);
		return intTestOutput ? error : (queryDataObj[key] = value);
	}

	return { ERROR: 'Testtype Error' };
};

const check_for_error = (result /*, next, error*/) => {
	if (result === { ERROR: 'INCORRECT INPUT PROVIDED' }) {
		//next(error);
		return 'ERROR TEST';
	}
	return;
};

const validateInputs = (req) => {
	const reqData = req;

	const queryData = {};

	// walk through obj k/v pairs, and validate each one via a switch statement which will call the necessary functions containing validation for each input
	for (let prop in reqData) {
		let result = validate_data(
			prop,
			reqData[prop],
			queryData,
			typeof reqData[prop],
		);

		console.log(queryData);
		if (check_for_error(result) === 'ERROR') return 'ERROR BREAKING LOOP';
	}
	return 'A-OK';
	// if props pass validation, return non-empty fields in obj to post req route
	// if a prop does not pass validation, respond with err
	// if queryData is empty, respond with error msg
};

// console.log(
// 	validateInputs({
// 		first_name: 'Jon',
// 		last_name: 'K',
// 		dob: '1/1/1900',
// 		ssn: 123456789,
// 		complaint: 123456,
// 		docket: 1234567890,
// 	}),
// );

module.exports = validateInputs;
