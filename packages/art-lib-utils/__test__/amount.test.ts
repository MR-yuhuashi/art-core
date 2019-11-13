import { numberFormat } from '../src/utils/amount';

/**
 * 5个参数
 * number -金额数字 number
 * decimals -保留的小数点位数 number
 * dec_point -小数点位置的分隔符 string
 * thousands_sep -千分位的分隔符 string
 * useRound -是否采用四舍五入，否则采用向下取整 boolean
 */
describe('Formats a number with grouped thousands', () => {
  test('negative 0 wil be changed to positive 0', () => {
    expect(numberFormat(-0, 3, '.', ',')).toBe('0.000');
  });

  test('negative number can be format', () => {
    expect(numberFormat(-3112.9876, 3, '.', ',')).toBe('-3,112.988');
  });

  test('decimals pass 5 and it will return 5 decimals amount', () => {
    expect(numberFormat(12.9876598, 5)).toBe('12.98765');
  });

  test('decimals pass negative number and the decimals will be changed to positive number', () => {
    expect(numberFormat(12.9876598, -5)).toBe('12.98765');
  });

  test('if not pass dec_point,it will use . to as default separator', () => {
    expect(numberFormat(12.9876, 2)).toBe('12.98');
  });

  test('if pass dec_point *, it will use * to as separator', () => {
    expect(numberFormat(12.9876, 2, '*')).toBe('12*98');
  });

  test('if not pass thousands_sep, it will use , to as default separator', () => {
    expect(numberFormat(3112.9876, 2)).toBe('3,112.98');
  });

  test('if pass thousands_sep #, it will use # to as separator', () => {
    expect(numberFormat(3112.9876, 2, '.', '#')).toBe('3#112.98');
  });

  test('if you do dot want to have thousands division, you can pass thousands_sep empty string', () => {
    expect(numberFormat(3112.9876, 2, '.', '')).toBe('3112.98');
  });

  test('if you want to use Math.round, you can pass true for useRound param', () => {
    expect(numberFormat(3112.9876, 2, '.', ',', true)).toBe('3,112.99');
  });

  test('if you do dot pass true for useRound param, it will use Math.floor to handle your amount', () => {
    expect(numberFormat(3112.9876, 2, '.', ',')).toBe('3,112.98');
  });

  test('if amount is infinite and the amount will be changed to 0', () => {
    expect(numberFormat(1000 / 0, 2, '.', ',')).toBe('0.00');
  });

  test('if decimals is infinite and the decimals will be changed to 0', () => {
    expect(numberFormat(3112.9876, 1000 / 0, '.', ',')).toBe('3,112');
  });
});