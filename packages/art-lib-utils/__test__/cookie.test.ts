import cookie from '../src/utils/storage/cookie';

describe('', () => {
	test('get cookie method when pass a key and it will return the value', () => {
		Object.defineProperty(document, 'cookie', {
			writable: true,
			value: 'myCookie=123; analyse_id=CpoW3F3eQoZWwGoLHbmeAg==',
		});
		expect(cookie.get('myCookie')).toBe('123');
		expect(cookie.get('yourCookie')).toBe('');
		expect(cookie.get('analyse_id')).toBe('CpoW3F3eQoZWwGoLHbmeAg==');
	});

	test('support method and it will return whether the navigation\'s cookie is enable', () => {
		Object.defineProperty(navigator, 'cookieEnabled', {
			writable: true,
			value: true
		});
		expect(cookie.support()).toBeTruthy();
	});
});
