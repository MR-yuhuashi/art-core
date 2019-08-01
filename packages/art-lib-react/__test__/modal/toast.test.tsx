import React from 'react';
import Toast from '../../src/components/modal/toast';

const testToast = Toast.show(<div className="test-toast">toast content</div>);

test('show a toast when the showToast be called', () => {
  expect(document.querySelectorAll('.test-toast').length).toBe(1);
  expect(document.querySelectorAll('.test-toast')[0].innerHTML).toBe('toast content');
});