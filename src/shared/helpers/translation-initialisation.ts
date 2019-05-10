import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');
