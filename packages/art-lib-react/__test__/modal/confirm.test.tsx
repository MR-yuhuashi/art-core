import React from 'react';
import Confirm from '../../src/components/modal/confirm';

function showConfirm(modalProps) {
  return Confirm.show(modalProps);
}

const testComfirm = showConfirm({
  title: 'test the confirm',
  children: <span>content</span>,
});

test('open a confirm when the showConfirm be called', () => {
  expect(document.querySelectorAll('.modal-confirm').length).toBe(1);
  expect(document.querySelectorAll('.modal-confirm-header')[0].innerHTML).toBe('test the confirm');
  expect(document.querySelectorAll('.modal-confirm-content')[0].innerHTML).toBe('<span>content</span>');
  expect(document.querySelectorAll('.modal-confirm-footer button')[0].innerHTML).toBe('取消');
  expect(document.querySelectorAll('.modal-confirm-footer button')[1].innerHTML).toBe('确定');
});