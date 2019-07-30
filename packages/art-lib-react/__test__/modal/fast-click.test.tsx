// 1 渲染内容div(1个)+children
// 2 绑的events（4个），props（className，style， onclick）
// 3 样式，在modal.less里面
import React from 'react';
import FastClick from '../../src/components/fastclick';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const testClick = jest.fn();
const testTouchStart = jest.fn();

const wrapper = shallow(
  <FastClick
    className={'fast-click-test'}
    onClick={testClick}
    onTouchStart={testTouchStart}>
      <p>123</p>
      <span>dddd</span>
  </FastClick>
);

test('create correct snapShot', () => {
  expect(toJson(wrapper)).toMatchSnapshot();
});

test('render one div', () => {
  expect(wrapper.find('div').length).toBe(1);
});

test('component has correct children', () => {
  expect(wrapper.find('p').text()).toBe('123');
  expect(wrapper.contains(<p>123</p>)).toBeTruthy();
  expect(wrapper.contains(<span>dddd</span>)).toBeTruthy();
});

test('have correct props', () => {
  expect(wrapper.prop('className')).toEqual('fast-click-test');
  expect(wrapper.hasClass('fast-click-test')).toBeTruthy();
  expect(wrapper.props()).toMatchObject({
    className: 'fast-click-test',
    onClick: testClick,
    onTouchStart: testTouchStart
  });
});

test('handle correct events', () => {
  wrapper.find('div').simulate('click')
  expect(testClick).toBeCalled();
  wrapper.find('div').simulate('touchstart')
  expect(testTouchStart).toBeCalled();
});