import { classNames } from '../src/utils/classnames';
import { isString } from 'util';

/**
 * 返回一个string
 * 入参的个数和类型：基本类型和引用类型
 */

describe('classnames', () => {
  test('pass some valid params and the result will be a string', () => {
    const result = classNames('active', 'btn', 2, '');
    expect(isString(result)).toBeTruthy();
  });

  test('pass valid params and result will be joined with empty space', () => {
    expect(classNames('active', 'btn', '')).toBe('active btn');
  });

  test('boolean params true and false both will be skipped', () => {
    expect(classNames(true, false, 'active')).toBe('active');
  });

  test('string params empty string will be skipped', () => {
    expect(classNames('', 'active', 'btn')).toBe('active btn');
  });

  test('number params 0 will be skipped', () => {
    expect(classNames(+0, -0, 1, -1, 'active', 'btn')).toBe('1 -1 active btn');
  });

  test('undefined and null will be skipped', () => {
    expect(classNames(undefined, null, 'active', 'btn')).toBe('active btn');
  });

  test('array params will be joined', () => {
    expect(classNames(['active', 'btn1'], 'btn2', ['btn3', 'btn4'])).toBe('active btn1 btn2 btn3 btn4');
  });

  test('deep array params will also be joined', () => {
    expect(classNames(['active', ['btn1', 'btn2', ['btn3', 'btn4']]], 'btn5')).toBe('active btn1 btn2 btn3 btn4 btn5');
  });

  test('object params will join the truthy key', () => {
    expect(classNames({active: 1, btn1: true, btn2: '1', btn3: undefined}, 'btn4')).toBe('active btn1 btn2 btn4');
  });

  test('not support deep object params and will skip the children key', () => {
    expect(classNames({active: 1, btn1: true, btn2: '1', btn3: { a: 1, b: 0 }}, 'btn4')).toBe('active btn1 btn2 btn3 btn4');
  });

  test('support any type params and will join together', () => {
    expect(classNames(
      { active: 1, btn1: true, btn2: '1', btn3: { a: 1, b: 0 } },
      'btn4',
      [undefined, [1, 2], ['a', 'b']],
      0))
    .toBe('active btn1 btn2 btn3 btn4 1 2 a b');
  });
});
