import { getObjectValue } from '../src/utils/getObjectValue';

/**
 * 从对象中返回存在key的value
 */
describe('get value from object', () => {

  test('key path existed and it will return the correct value', () => {
    expect(getObjectValue({x: {y: {z: 111}}}, 'x.y', 'default')).toEqual({z: 111});
  });

  test('key path not existed and it will return the default value', () => {
    expect(getObjectValue({x: {y: {z: 111}}}, 'x.y.w', 'default')).toBe('default');
  });

  test('key path not existed and the default value is not passed then it will return undefined', () => {
    expect(getObjectValue({x: {y: {z: 111}}}, 'x.y.w')).toBeUndefined();
  });

  test('path should be joined with only . otherwise it will return the default value', () => {
    expect(getObjectValue({x: {y: {z: 111}}}, 'x.y/z')).toBeUndefined();
  });

  test('path should start from first braces otherwise it will return the default value', () => {
    expect(getObjectValue({x: {y: {z: [111]}}}, 'y.z', 'default value')).toBe('default value');
  });

  test('path is empty string and it will return the default value', () => {
    expect(getObjectValue({x: {y: {z: [111]}}}, '', 'default value')).toBe('default value');
  });

  test('source is an empty object and it will return the default value', () => {
    expect(getObjectValue({}, 'x.y', 'default value')).toBe('default value');
  });
});