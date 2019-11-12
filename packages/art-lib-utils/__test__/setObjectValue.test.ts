import { setObjectValue } from '../src/utils/setObjectValue';

/**
 * return an object
 * source must be object
 * result can be any type
 * path must be string joined by . or it won't be split correctly
 */
describe('set object value', () => {
  test('pass an object and it will return an object', () => {
    const result = setObjectValue({a: 1}, 'x.y', 12);

    expect(result).toEqual({
      a: 1,
      x: {
        y: 12
      }
    });
  });

  test('source not be plain object and it will return the source unchanged', () => {
    const source = [1, 2, 3];
    const result = setObjectValue(source, 'x.y.z', 12);

    expect(result).toBe(source);
  });

  test('result can beany type', () => {
    const fn = jest.fn();
    const result = setObjectValue({}, 'x.y.z', fn);

    expect(result).toMatchObject({
      x: {
        y: {
          z: fn
        }
      }
    });
  });

  test('path must be joined by . otherwise it will not be split as object key', () => {
    const result = setObjectValue({}, 'x.y/z', 12);

    expect(result).toEqual({
      x: {
        'y/z': 12
      }
    });
  });

  test('path string can include many types and can be very deep', () => {
    const result = setObjectValue({}, 'x.y.{}.@.0.[].-', 12);

    expect(result).toEqual({
      x: {
        y: {
          '{}': {
            '@': {
              0: {
                '[]': {
                  '-': 12
                }
              }
            }
          }
        }
      }
    });
  });
});
