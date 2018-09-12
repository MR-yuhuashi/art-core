import { Controller, Get } from 'routing-controllers';

@Controller('/app/201804/mainPage')
export default class MainPageController {

  @Get('/testme')
  public mockApi() {
    return {
      code: '200',
      message: 'suceess',
      data: {
        mockData: 'biz mock data!'
      }
    };
  }
}