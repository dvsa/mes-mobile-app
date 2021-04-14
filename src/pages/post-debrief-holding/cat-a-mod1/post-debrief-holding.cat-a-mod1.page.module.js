var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatAMod1Page } from './post-debrief-holding.cat-a-mod1.page';
var PostDebriefHoldingCatAMod1PageModule = /** @class */ (function () {
    function PostDebriefHoldingCatAMod1PageModule() {
    }
    PostDebriefHoldingCatAMod1PageModule = __decorate([
        NgModule({
            declarations: [
                PostDebriefHoldingCatAMod1Page,
            ],
            imports: [
                IonicPageModule.forChild(PostDebriefHoldingCatAMod1Page),
                ComponentsModule,
            ],
        })
    ], PostDebriefHoldingCatAMod1PageModule);
    return PostDebriefHoldingCatAMod1PageModule;
}());
export { PostDebriefHoldingCatAMod1PageModule };
//# sourceMappingURL=post-debrief-holding.cat-a-mod1.page.module.js.map