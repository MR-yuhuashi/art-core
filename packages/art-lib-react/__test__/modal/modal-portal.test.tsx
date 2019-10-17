// 0 显示否以及对应的样式
// 1 渲染内容div(1个)+children（一个fastclick和.modal-portal-wrap）
// 4、是否有遮罩和遮罩的点击事件
// 5 TODO多个modal的层级
import React from 'react';
import ModalPortal from '../../src/components/modal/modal-portal';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const testRequestClose = jest.fn();

const wrapper = shallow(
  <ModalPortal
    defaultStyles={{}}
    onRequestClose={testRequestClose}>
    <p>123</p>
    <span>dddd</span>
  </ModalPortal>
);
test('the state isOpen is false and it render nothing', () => {
  expect(wrapper.find('.modal-portal-overlay').length).toBe(0);
  expect(wrapper.find('.modal-portal-wrap').length).toBe(0);
  expect(wrapper.state('isOpen')).toBeFalsy();
  expect(toJson(wrapper)).toMatchSnapshot();
});

test('the state isOpen is true and it render correct', () => {
  wrapper.setState({
    isOpen: true
  });
  expect(wrapper.find('.modal-portal-overlay').length).toBe(1);
  expect(wrapper.find('.modal-portal-wrap').length).toBe(1);
  expect(wrapper.exists('UnTouchable')).toBeTruthy();
  expect(wrapper.state('isOpen')).toBeTruthy();
  expect(toJson(wrapper)).toMatchSnapshot();
});

test('the props mask and it has different style', () => {
  wrapper.setState({
    isOpen: true
  });
  wrapper.setProps({
    mask: true
  });
  expect(wrapper.find('.modal-portal-overlay').prop('style').backgroundColor).toBeUndefined();
  wrapper.setProps({
    mask: false
  });
  expect(wrapper.find('.modal-portal-overlay').prop('style').backgroundColor).toBe('transparent');
  expect(toJson(wrapper)).toMatchSnapshot();
});


test('open modal portal has different class names', () => {
  wrapper.setState({
    isOpen: true,
    beforeClose: false,
    afterOpen: true
  });
  expect(wrapper.find('.modal-portal-overlay').hasClass('modal-portal-overlay-before-close')).toBeFalsy();
  expect(wrapper.find('.modal-portal-content').hasClass('modal-portal-content-before-close')).toBeFalsy();
  expect(wrapper.find('.modal-portal-overlay').hasClass('modal-portal-overlay-after-open')).toBeTruthy();
  expect(wrapper.find('.modal-portal-content').hasClass('modal-portal-content-after-open')).toBeTruthy();
  expect(toJson(wrapper)).toMatchSnapshot();
});

test('close modal portal has different class names', () => {
  wrapper.setState({
    isOpen: false,
    beforeClose: true,
    afterOpen: false
  });
  expect(wrapper.find('.modal-portal-overlay').hasClass('modal-portal-overlay-before-close')).toBeTruthy();
  expect(wrapper.find('.modal-portal-content').hasClass('modal-portal-content-before-close')).toBeTruthy();
  expect(wrapper.find('.modal-portal-overlay').hasClass('modal-portal-overlay-after-open')).toBeFalsy();
  expect(wrapper.find('.modal-portal-content').hasClass('modal-portal-content-after-open')).toBeFalsy();
  expect(toJson(wrapper)).toMatchSnapshot();
});

test('mask can be clicked', () => {
  wrapper.setState({
    isOpen: true,
    beforeClose: false,
    afterOpen: true
  });
  wrapper.find('.modal-portal-overlay').simulate('click');
  expect(testRequestClose).not.toBeCalled();
  wrapper.setProps({
    shouldCloseOnOverlayClick: true
  });
  wrapper.find('.modal-portal-overlay').simulate('click');
  expect(testRequestClose).toBeCalled();
  expect(testRequestClose).toBeCalledWith(1);
});