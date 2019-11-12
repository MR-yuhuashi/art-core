import { trim } from '../src/utils/string';

/**
 * 去掉前后空格
 * param must be string
 */
describe('trim string', () => {
  test('empty string will return empty', () => {
    expect(trim('')).toBe('');
  });

  test('string only include one space will return empty', () => {
    expect(trim(' ')).toBe('');
  });

  test('it will delete front space ', () => {
    expect(trim(' 0abc')).toBe('0abc');
  });

  test('it will delete end space ', () => {
    expect(trim('0abc  ')).toBe('0abc');
  });

  test('it will delete front and end space ', () => {
    expect(trim('   0abc  ')).toBe('0abc');
  });

  test('it will not delete the space between string', () => {
    expect(trim('   0 abc  ')).toBe('0 abc');
  });
});