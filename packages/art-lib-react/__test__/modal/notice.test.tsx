import React from 'react';
import Notice from '../../src/components/modal/notice';
import { shallow } from 'enzyme';

const wrapper = shallow(
  <Notice
    className="test-notice">
    this is a notice!
  </Notice>
);

test('render a notice', () => {
  expect(wrapper.find('.test-notice').length).toBe(1);
  expect(wrapper.find('.test-notice .modal-notice-content').text()).toBe('this is a notice!');
});