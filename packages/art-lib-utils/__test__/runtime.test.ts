import runtime from '../src/utils/runtime';
/**
 * jsdom默认的navigator.userAgent是'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0'，所以检测的运行环境是webKit：true；
 * TODO 如何在程序中修改userAgent
 * 如果想要修改userAgent，目前只能通过修改jest.config.js文件，文件中添加配置：
 * testEnvironmentOptions: { userAgent: '想要替换的ua'} },
 */

/**
 * runtime是个对象
 * 四个key：webKit、ios、android、weixin;
 * value是boolean
 */
describe('runtime', () => {
  test('userAgent is webKit', () => {
    expect(runtime).toEqual({
      webKit: true,
      ios: false,
      android: false,
      weixin: false
    });
  });
});