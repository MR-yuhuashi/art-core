import { isEmpty } from '../src/utils/isEmpty';

import each from 'jest-each';

/**
 * array object map generate and basic data
 */

describe('Checks whether a value is empty', () => {
	each(['', 0, -0, false, null, undefined, [], {}]).test('%p is empty value and the function will return true', (value) => {
		expect(isEmpty(value)).toBeTruthy();
	});

	each(['1', 1, -1, true, [1, 2], {age: 18}]).test('%p is not empty value and the function will return false', (value) => {
		expect(isEmpty(value)).toBeFalsy();
	});
});