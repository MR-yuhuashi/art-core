import { setObjectValue } from '../src/utils/setObjectValue';
describe('setObjectValue', () => {
  test('path contains . can be split to children path', () => {
    const result = setObjectValue({a: 1}, 'x.y', 12);
    const resultNew = setObjectValue({a: 1}, 'x/y', 12);
    expect(result).toEqual({
      a: 1,
      x: {
        y: 12
      }
    });
    expect(resultNew).not.toEqual({
      a: 1,
      x: {
        y: 12
      }
    });
    expect(resultNew).toEqual({
      a: 1,
      'x/y': 12
    });
    const resultTwo = setObjectValue({a: 1}, 'x.y.z.{}', [1, 2, 3]);
    expect(resultTwo).toEqual({
      a: 1,
      x: {
        y: {
          z: {
            '{}': [1, 2, 3]
          }
        }
      }
    });
  });
  test('path can be very deep', () => {
    const result = setObjectValue({a: 1}, 'x.y.z.w', 12);
    expect(result).toEqual({
      a: 1,
      x: {
        y: {
          z: {
            w: 12
          }
        }
      }
    });
  });
  test('value can be any type', () => {
    const result = setObjectValue({a: 1}, 'x.y.z.w', [1, 2, 3]);
    expect(result).toEqual({
      a: 1,
      x: {
        y: {
          z: {
            w: [1, 2, 3]
          }
        }
      }
    });
  });
});
