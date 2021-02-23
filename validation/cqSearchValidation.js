const anything_but_test = (pattern, data) => {
	const pattern = new RegExp(pattern);
	return pattern.test(data);
};

const validate_data = (key, value, queryDataObj, testType = 'string') => {
	const stringPattern = /[^A-Za-z ]/;
	const intPattern = /[^\d]/;
	const error = { ERROR: 'INCORECT INPUT PROVIDED' };

	if (value === '' || value === null || value === undefined) return '';

	if (testType === 'string') {
		const lettersTestOutput = anything_but_test(stringPattern, value);
		return lettersTestOutput
			? error
			: (queryDataObj = { ...queryDataObj, key: value });
	} else if (testType === 'int') {
		const intTestOutput = anything_but_test(intPattern, value);
		return intTestOutput ? error : (queryDataObj[key] = value);
	}

	return;
};

const dob_validation = () => {};

const ssn_validation = () => {};

const complaint_validation = () => {};

const docket_validation = () => {};

// make a error function where if error occurs, then next(err) is called and have an err middleware function send back the error to the client (error func in seperate module)
const check_for_error = (result, next, error) => {
	if (result === { ERROR: 'INCORRECT INPUT PROVIDED' }) {
		next(result);
	}
	return;
};

console.log('name_validation:', name_validation('first_name', 'J2n', {}));

const validateInputs = (req, res, next) => {
	const reqData = req.body;

	const queryData = {};

	// walk through obj k/v pairs, and validate each one via a switch statement which will call the necessary functions containing validation for each input
	for (let prop in reqData) {
		validate_data(prop, reqData[prop], queryData);

		switch (prop) {
			case 'first_name':
			case 'last_name':
				let result = name_validation(prop, reqData[prop], queryData);
				check_for_error(result);
				break;
			case 'dob':
				dob_validation(reqData[prop]);
				break;
			case 'ssn':
				ssn_validation(reqData[prop]);
				break;
			case 'complaint':
				complaint_validation(reqData[prop]);
				break;
			case 'docket':
				docket_validation(reqData[prop]);
				break;
			default:
				console.error('error: reqData prop not receieved');
				break;
		}
	}
	// if props pass validation, return non-empty fields in obj to post req route
	// if a prop does not pass validation, respond with err
	// if queryData is empty, respond with error msg
};

module.exports = validateInputs;
