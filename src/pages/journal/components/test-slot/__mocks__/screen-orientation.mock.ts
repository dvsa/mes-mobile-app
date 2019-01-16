import { Observable } from 'rxjs/Observable';
export class ScreenOrientationMock  {

    ORIENTATIONS: {
        PORTRAIT_PRIMARY: string;
        PORTRAIT_SECONDARY: string;
        LANDSCAPE_PRIMARY: string;
        LANDSCAPE_SECONDARY: string;
        PORTRAIT: string;
        LANDSCAPE: string;
        ANY: string;
    } = {
      PORTRAIT_PRIMARY: 'portrait-primary',
      PORTRAIT_SECONDARY: 'portrait-secondary',
      LANDSCAPE_PRIMARY: 'landscape-primary',
      LANDSCAPE_SECONDARY: 'landscape-secondry',
      PORTRAIT: 'portrait',
      LANDSCAPE: 'landscape',
      ANY: 'any'
    };

    type: string;

    onChange(): Observable<void> {
      return;
    };

    lock(orientation: string): Promise<any> {
      return;
    };

    unlock(): void {
    };
}
