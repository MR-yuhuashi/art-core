import { getObjectValue } from '../src/utils/getObjectValue';

describe('getObjectValue', () => {
  test('get value from deep object', () => {
    expect(getObjectValue({x: {y: 111}}, 'x.y', 'default')).toBe(111);
    expect(getObjectValue({x: {y: {z: 111}}}, 'x.y', 'default')).toEqual({z: 111});
  });
  test('path should be split by .', () => {
    expect(getObjectValue({x: {y: {z: 111}}}, 'x/y/z', 'default')).toEqual('default');
    expect(getObjectValue({x: {y: {z: 111}}}, 'x.y.z', 'default')).toBe(111);
  });
  test('path should from the outest children', () => {
    expect(getObjectValue({x: {y: {z: [111]}}}, 'y.z', 'default')).not.toEqual([111]);
    expect(getObjectValue({x: {y: {z: [111]}}}, 'y.z', 'default')).toEqual('default');
  });
});