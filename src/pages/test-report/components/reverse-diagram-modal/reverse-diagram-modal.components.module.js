var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ReverseLeftComponent } from '../reverse-left/reverse-left';
import { CommonModule } from '@angular/common';
import { ReverseDiagramLinkComponent } from '../reverse-diagram-link/reverse-diagram-link';
import { ReverseLeftPopoverComponent } from '../reverse-left-popover/reverse-left-popover';
import { TestReportComponentsModule } from '../test-report-components.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { IonicModule } from 'ionic-angular';
var ReverseDiagramModalComponentsModule = /** @class */ (function () {
    function ReverseDiagramModalComponentsModule() {
    }
    ReverseDiagramModalComponentsModule = __decorate([
        NgModule({
            declarations: [
                ReverseLeftComponent,
                ReverseDiagramLinkComponent,
                ReverseLeftPopoverComponent,
            ],
            imports: [
                CommonModule,
                TestReportComponentsModule,
                ComponentsModule,
                IonicModule,
            ],
            exports: [
                ReverseLeftComponent,
                ReverseDiagramLinkComponent,
                ReverseLeftPopoverComponent,
            ],
        })
    ], ReverseDiagramModalComponentsModule);
    return ReverseDiagramModalComponentsModule;
}());
export { ReverseDiagramModalComponentsModule };
//# sourceMappingURL=reverse-diagram-modal.components.module.js.map