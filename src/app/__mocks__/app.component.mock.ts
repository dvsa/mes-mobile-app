import { NavControllerMock } from '../../providers/navigation-state/__mocks__/nav-controller.mock';

export class MockAppComponent {

  getTextZoomClass() {
    return 'text-zoom-regular';
  }

  getRootNavs = () => [new NavControllerMock()];

}
