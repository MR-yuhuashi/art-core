import { isEmpty } from '../src/utils/isEmpty';

/**
 * array object map generate and basic data
 */

describe('Checks whether a value is empty', () => {
	test('[] will return true', () => {
		expect(isEmpty([])).toBeTruthy();
	});

	test('array length is not 0 and it will return false', () => {
		expect(isEmpty([1, '2'])).toBeFalsy();
	});

	test('{} will return true', () => {
		const Person = {};

		expect(isEmpty(Person)).toBeTruthy();
	});

	test('an object has property will return false', () => {
		const Person = {
			name: 'lily'
		};

		expect(isEmpty(Person)).toBeFalsy();
	});
});

describe('Checks basic type', () => {
	test('string empty will return true', () => {
		expect(isEmpty('')).toBeTruthy();
	});

	test('number empty will return true', () => {
		expect(isEmpty(0)).toBeTruthy();
	});

	test('boolean empty will return true', () => {
		expect(isEmpty(false)).toBeTruthy();
	});

	test('null will return true', () => {
		expect(isEmpty(null)).toBeTruthy();
	});

	test('undefined will return true', () => {
		expect(isEmpty(undefined)).toBeTruthy();
	});
});