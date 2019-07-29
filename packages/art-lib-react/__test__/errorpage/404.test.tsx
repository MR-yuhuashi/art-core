import React from 'react';
import { shallow } from 'enzyme';
import Page404 from '../../src/components/errorpage/404';
import toJson from 'enzyme-to-json';

test('404 page test', () => {
  const wrapper = shallow(<Page404 />);
  expect(wrapper.find('div').length).toBe(1);
  expect(wrapper.find('.error-page').exists()).toBeTruthy();
  expect(toJson(wrapper)).toMatchSnapshot();
});