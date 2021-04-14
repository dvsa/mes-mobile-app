var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatCPage } from './post-debrief-holding.cat-c.page';
var PostDebriefHoldingCatCPageModule = /** @class */ (function () {
    function PostDebriefHoldingCatCPageModule() {
    }
    PostDebriefHoldingCatCPageModule = __decorate([
        NgModule({
            declarations: [
                PostDebriefHoldingCatCPage,
            ],
            imports: [
                IonicPageModule.forChild(PostDebriefHoldingCatCPage),
                ComponentsModule,
            ],
        })
    ], PostDebriefHoldingCatCPageModule);
    return PostDebriefHoldingCatCPageModule;
}());
export { PostDebriefHoldingCatCPageModule };
//# sourceMappingURL=post-debrief-holding.cat-c.page.module.js.map