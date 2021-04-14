var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { GoToJournalCardComponent } from './go-to-journal-card/go-to-journal-card';
import { PracticeTestModalModule } from './practice-test-modal/practice-test-modal.module';
import { TestResultsSearchCardComponent } from './test-results-search-card/test-results-search-card';
import { RekeySearchCardComponent } from './rekey-search-card/rekey-search-card';
import { ProfileHeaderComponent } from './profile-header/profile-header';
import { PracticeTestReportCardComponent } from './practice-test-report-card/practice-test-report-card';
import { PracticeEndToEndCardComponent } from './practice-end-to-end-card/practice-end-to-end-card';
import { StartDelegatedExaminerRekeyComponent } from './start-delegated-examiner-rekey/start-delegated-examiner-rekey';
var DashboardComponentsModule = /** @class */ (function () {
    function DashboardComponentsModule() {
    }
    DashboardComponentsModule = __decorate([
        NgModule({
            declarations: [
                TestResultsSearchCardComponent,
                RekeySearchCardComponent,
                GoToJournalCardComponent,
                ProfileHeaderComponent,
                PracticeTestReportCardComponent,
                PracticeEndToEndCardComponent,
                StartDelegatedExaminerRekeyComponent,
            ],
            imports: [
                CommonModule,
                IonicModule,
                PracticeTestModalModule,
            ],
            exports: [
                TestResultsSearchCardComponent,
                RekeySearchCardComponent,
                GoToJournalCardComponent,
                ProfileHeaderComponent,
                PracticeTestReportCardComponent,
                PracticeEndToEndCardComponent,
                StartDelegatedExaminerRekeyComponent,
            ],
        })
    ], DashboardComponentsModule);
    return DashboardComponentsModule;
}());
export { DashboardComponentsModule };
//# sourceMappingURL=dashboard-components.module.js.map