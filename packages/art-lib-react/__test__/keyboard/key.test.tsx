import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Key } from '../../src/components/keyboard/Key';

/**
 * 标签正确 i
 * props传值text onPress
 * 绑定的events
 * 绑定的class name
 */
const testOnPress = jest.fn((msg) => {return msg; });

const keyText = 'my key';
const newKeyText = 'new key';

const wrapper = shallow(<Key text={keyText} onPress={testOnPress} />);

test('create correct snapShot', () => {
  expect(toJson(wrapper)).toMatchSnapshot();
});

/**
 * 标签正确，为 i 标签
 */
describe('have correct tag and content', () => {
  test('have one tag of i and text from props', () => {
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('div').length).toBe(0);
    expect(wrapper.text()).toBe(keyText);
  });
});

/**
 * wrapper.instance().props vs wrapper.props()
 */
describe('have correct props of key instance', () => {
  test('have correct props', () => {
    expect(wrapper.instance().props).toEqual({
      text: keyText,
      onPress: testOnPress
    });

    wrapper.setProps({text: newKeyText});
    expect(wrapper.instance().props).toEqual({
      text: newKeyText,
      onPress: testOnPress
    });
  });
});

describe('have correct props', () => {
  test('have correct props property', () => {
    expect(wrapper.props()).toHaveProperty('className');
    expect(wrapper.props()).toHaveProperty('onTouchStart');
    expect(wrapper.props()).toHaveProperty('onTouchMove');
    expect(wrapper.props()).toHaveProperty('onTouchEnd');
    expect(wrapper.props()).toHaveProperty('style', undefined);
  });

  test('have correct class name', () => {
    expect(wrapper.prop('className')).toBe('v-board-key');

    wrapper.setState({ active: true });
    expect(wrapper.prop('className')).toBe('v-board-key v-board-key-active');

    wrapper.setState({ active: false });
    wrapper.setProps({ className: 'custom' });
    expect(wrapper.prop('className')).toBe('v-board-key custom');
  });
});

describe('bind correct events', () => {
  test('have touchstart events', () => {
    wrapper.find('i').simulate('touchstart');
    expect(wrapper.state('active')).toBeTruthy();
    expect(testOnPress).toBeCalled();
  });

  // Currently, event simulation for the shallow renderer does not propagate as one would normally expect in a real environment. As a result, one must call .simulate() on the actual node that has the event handler set.
  test('have touchmove events', () => {
    wrapper.find('i').simulate('touchmove', {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    });
    expect(wrapper.state('active')).toBeFalsy();
  });
});
