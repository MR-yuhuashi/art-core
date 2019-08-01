/**
 * 插入位置（传不传parentSelector）
 * 绑定正确的class name
 */
import React from 'react';
import Modal from '../../src/components/modal/modal';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';

const wrapper = mount(
  <Modal
    isOpen={true}
    className={'test-modal'}>
    <p>123</p>
    <span>dddd</span>
  </Modal>
);

const hideWrapper = mount(
  <Modal
    isOpen={false}
    className={'test-modal'}>
    <p>123</p>
    <span>dddd</span>
  </Modal>
);

test('open and close', (() => {
  expect(wrapper.hasClass('test-modal')).toBeTruthy();
  expect(hideWrapper.hasClass('test-modal')).toBeTruthy();
  expect(hideWrapper.exists('UnTouchable')).toBeFalsy();
  expect(wrapper.exists('UnTouchable')).toBeTruthy();
  expect(toJson(wrapper)).toMatchSnapshot();
  expect(toJson(hideWrapper)).toMatchSnapshot();
}));