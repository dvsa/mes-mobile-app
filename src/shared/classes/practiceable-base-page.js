var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { select } from '@ngrx/store';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasePageComponent } from './base-page';
import { getTests } from '../../modules/tests/tests.reducer';
import { isPracticeMode, isTestReportPracticeTest, isEndToEndPracticeTest } from '../../modules/tests/tests.selector';
import { FAKE_JOURNAL_PAGE } from '../../pages/page-names.constants';
var PracticeableBasePageComponent = /** @class */ (function (_super) {
    __extends(PracticeableBasePageComponent, _super);
    function PracticeableBasePageComponent(platform, navController, authenticationProvider, store$, loginRequired) {
        if (loginRequired === void 0) { loginRequired = true; }
        var _this = _super.call(this, platform, navController, authenticationProvider, loginRequired) || this;
        _this.platform = platform;
        _this.navController = navController;
        _this.authenticationProvider = authenticationProvider;
        _this.store$ = store$;
        _this.loginRequired = loginRequired;
        _this.exitPracticeMode = function () {
            // As per bug request for Ionic 3 we need to get and pass in the view controller
            // for the page we want to get back to - https://github.com/ionic-team/ionic/issues/13672
            _this.navController.popTo(_this.navController.getViews().find(function (view) { return view.id === FAKE_JOURNAL_PAGE; }));
        };
        return _this;
    }
    PracticeableBasePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.practiceableBasePageState = {
            isPracticeMode$: this.store$.pipe(select(getTests), select(isPracticeMode)),
            isTestReportPracticeMode$: this.store$.pipe(select(getTests), select(isTestReportPracticeTest)),
            isEndToEndPracticeMode$: this.store$.pipe(select(getTests), select(isEndToEndPracticeTest)),
        };
        var _a = this.practiceableBasePageState, isPracticeMode$ = _a.isPracticeMode$, isTestReportPracticeMode$ = _a.isTestReportPracticeMode$, isEndToEndPracticeMode$ = _a.isEndToEndPracticeMode$;
        var merged$ = merge(isPracticeMode$.pipe(map(function (value) { return _this.isPracticeMode = value; })), isTestReportPracticeMode$.pipe(map(function (value) { return _this.isTestReportPracticeMode = value; })), isEndToEndPracticeMode$.pipe(map(function (value) { return _this.isEndToEndPracticeMode = value; })));
        this.practiceableBasePageSubscription = merged$.subscribe();
    };
    PracticeableBasePageComponent.prototype.ionViewDidLeave = function () {
        if (this.practiceableBasePageSubscription) {
            this.practiceableBasePageSubscription.unsubscribe();
        }
    };
    return PracticeableBasePageComponent;
}(BasePageComponent));
export { PracticeableBasePageComponent };
//# sourceMappingURL=practiceable-base-page.js.map