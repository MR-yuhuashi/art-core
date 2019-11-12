import merge from '../src/utils/merge';

/**
 * merge object, compare to the extends function of jquery 
 * 1、一个参数
 * 2、两个参数
 * 3、多余两个参数（浅合并，深合并）
 * 4、合并会改变target本身，如果不想改变，可把target设置成{}
 * 4、也可以合并数组(TODO 数组和对象合并呢？？？没有意义是不是不用考虑)
 */

describe('merge function', () => {
  test('only pass true, not pass target and source then it will return {}', () => {
    expect(merge(true)).toEqual({});
  });

  test('only pass false, not pass target and source then it will return {}', () => {
    expect(merge(false)).toEqual({});
  });

  test('pass target, not pass source then it will return the target', () => {
    const target = {country: 'china'};
    expect(merge(true, target)).toBe(target);
  });

  test('deep flag is false and it will return shallow merge result', () => {
    const obj = {
      country: 'china',
      people: 200,
      age: 30
    };

    expect(merge(false, obj, {
      country: 'English',
      people: 200
    })).toEqual({
      country: 'English',
      people: 200,
      age: 30
    });
  });

  test('deep flag is true and it will return deep merge result', () => {
    const deepObj = {
      country: 'china',
      set: {
        people: 200,
        age: 30
      }
    };

    expect(merge(true, deepObj, {
      country: 'English',
      people: 200,
      set: {
        age: 40,
        money: 99
      }
    })).toEqual({
      country: 'English',
      people: 200,
      set: {
        people: 200,
        age: 40,
        money: 99
      }
    });
  });

  test('source include null and it will skip null', () => {
    const deepObj = {
      country: 'china',
      set: {
        people: 200,
        age: 30
      }
    };

    expect(merge(true, deepObj, {
      country: 'English',
      people: 200,
    }, null, {set: {
        age: 40,
        money: 99
      }
    })).toEqual({
      country: 'English',
      people: 200,
      set: {
        people: 200,
        age: 40,
        money: 99
      }
    });
  });

  test('source include undefined and it will not cover the target', () => {
    const deepObj = {
      country: 'china',
    };

    expect(merge(true, deepObj, {
      country: undefined,
      people: 200,
    })).toEqual({
      country: 'china',
      people: 200
    });
  });

  test('the second param is {} and it will not change the target', () => {
    const deepObj = {
      country: 'china',
      people: 200,
      set: {
        people: 200,
        age: 30
      }
    };

    merge(false, {}, deepObj, {
      country: 'English',
      set: {
        money: 999,
        age: 30
      }
    });

    expect(deepObj).toEqual({
      country: 'china',
      people: 200,
      set: {
        people: 200,
        age: 30
      }
    });
  });

  test('the second param is not {} and it will change the target', () => {
    const deepObj = {
      country: 'china',
      people: 200,
      set: {
        people: 200,
        age: 30
      }
    };

    merge(false, deepObj, {
      country: 'English',
      set: {
        money: 999,
        age: 30
      }
    });

    expect(deepObj).not.toEqual({
      country: 'china',
      people: 200,
      set: {
        people: 200,
        age: 30
      }
    });
  });

  test('target and source can be array', () => {
    expect(merge(true, [1, 2, ['a', 'b']], [3, 2, ['a', 'c', 'd']])).toEqual([3, 2, ['a', 'c', 'd']]);
  });
});

// describe('it also can merge array', () => {
//   test('shadow merge', () => {
//     const targetArr = [{
//       name: 'aaa'
//     }, {
//       name: 'bbb'
//     }, {
//       name: 'ccc',
//       sex: 1
//     }];
//     expect(merge(false, targetArr, [{
//       age: 'aaa'
//     }, {
//       age: 'bbb'
//     }, {
//       age: 'ccc'
//     }])).toEqual([{
//       age: 'aaa'
//     }, {
//       age: 'bbb'
//     }, {
//       age: 'ccc'
//     }]);
//   });
//   test('deep merge', () => {
//     const targetArr = [{
//       name: 'aaa'
//     }, {
//       name: 'bbb'
//     }, {
//       name: 'ccc',
//       sex: 1
//     }];
//     expect(merge(true, targetArr, [{
//       age: 'aaa'
//     }, {
//       age: 'bbb'
//     }, {
//       age: 'ccc'
//     }])).toEqual([{
//       age: 'aaa',
//       name: 'aaa'
//     }, {
//       age: 'bbb',
//       name: 'bbb'
//     }, {
//       age: 'ccc',
//       name: 'ccc',
//       sex: 1
//     }]);
//   });
//   test('deep merge', () => {
//     const targetArr = {
//       name: 'ccc',
//       sex: 1
//     };
//     expect(merge(true, targetArr, [{
//       age: 'aaa'
//     }, {
//       age: 'bbb'
//     }, {
//       age: 'ccc'
//     }])).toEqual({
//       0: { age: 'aaa' },
//       1: { age: 'bbb' },
//       2: { age: 'ccc' },
//       name: 'ccc',
//       sex: 1
//     });
//   });
// });
