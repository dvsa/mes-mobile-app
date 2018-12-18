
import { Platform, NavController } from 'ionic-angular';
import { PlatformMock, NavControllerMock } from 'ionic-mocks-jest';
import { BasePageComponent } from '../base-page'


describe('Base Page', () => {

  let basePageComponent: BasePageComponent;

  let platform: Platform;
  let navController: NavController;
  // let authenticationService: AuthenticationServiceProvider;
  const loginRequired: boolean = true;

  beforeAll(() => {
    platform = PlatformMock.instance();
    navController = NavControllerMock.instance();
    // authenticationService = new AuthenticationServiceProvider();

    class BasePageClass extends BasePageComponent {
      constructor() {
        super(platform, navController, null, loginRequired);
      }
    }

    basePageComponent = new BasePageClass();
  });

  it('should be an instance of PageUtils', (done) => {
    done();
  });

  it('isIos return true', () => {
    expect(basePageComponent.isIos()).toBe(true);
  });


});
