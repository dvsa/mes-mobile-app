var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getTestCategory } from '../../../../modules/tests/category/category.reducer';
import { map } from 'rxjs/operators';
import { REVERSE_DIAGRAM_PAGE } from '../../../page-names.constants';
import { ReverseDiagramClosed, ReverseDiagramOpened, } from '../reverse-diagram-modal/reverse-diagram-modal.actions';
import { App } from '../../../../app/app.component';
var ReverseDiagramLinkComponent = /** @class */ (function () {
    function ReverseDiagramLinkComponent(modalController, app, store$) {
        this.modalController = modalController;
        this.app = app;
        this.store$ = store$;
    }
    ReverseDiagramLinkComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var testCategory$ = currentTest$.pipe(select(getTestCategory));
        this.subscription = testCategory$.pipe(map(function (result) { return _this.testCategory = result; })).subscribe();
    };
    ReverseDiagramLinkComponent.prototype.openReverseDiagramModal = function () {
        var diagramPage = REVERSE_DIAGRAM_PAGE;
        this.store$.dispatch(new ReverseDiagramOpened());
        // Modals are at the same level as the ion-nav so are not getting the zoom level class,
        // this needs to be passed in the create options.
        var zoomClass = "modal-fullscreen " + this.app.getTextZoomClass();
        var reverseDiagramModal = this.modalController.create(diagramPage, { onClose: this.closeReverseDiagramModal }, { cssClass: zoomClass });
        reverseDiagramModal.present();
    };
    ReverseDiagramLinkComponent.prototype.closeReverseDiagramModal = function () {
        this.store$.dispatch(new ReverseDiagramClosed());
    };
    ReverseDiagramLinkComponent = __decorate([
        Component({
            selector: 'reverse-diagram-link',
            templateUrl: 'reverse-diagram-link.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            App,
            Store])
    ], ReverseDiagramLinkComponent);
    return ReverseDiagramLinkComponent;
}());
export { ReverseDiagramLinkComponent };
//# sourceMappingURL=reverse-diagram-link.js.map