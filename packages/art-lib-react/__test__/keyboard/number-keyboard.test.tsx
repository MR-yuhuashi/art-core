import React from 'react';
import NumberKeyboard from '../../src/components/keyboard/NumberKeyboard';
import { render, shallow } from 'enzyme';

const wrapper = render(<NumberKeyboard></NumberKeyboard>);
const shallowWrapper = shallow(<NumberKeyboard></NumberKeyboard>);

describe('number keyboard', () => {
  test('', () => {
    console.log(wrapper);
    console.log(shallowWrapper);
  });
});