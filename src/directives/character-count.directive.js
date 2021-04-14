var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Return the remaining character count from an input field
 *
 * The `charLimit` property defines the maximum number of characters for the field
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'person-description',
 *   templateUrl: `
 *     <textarea charCount charLimit="10" [value]="description"
 *       (onCharacterCountChanged)="characterCountChanged($event)"
 *       (change)="descriptionChanged($event.target.value)">
 *     <div class="character-count">{{getCharacterCountText}}</div>
 *   `
 * })
 * export class PersonDescriptionComponent {
 *   descriptionCharactersRemaining: number = null;
 *
 *   constructor() {}
 *
 *   characterCountChanged(charactersRemaining: number) {
 *     this.descriptionCharactersRemaining = charactersRemaining;
  *  }
 *   getCharacterCountText() {
 *     const characterString = Math.abs(this.descriptionCharactersRemaining) === 1 ? 'character' : 'characters';
 *     const endString = this.descriptionCharactersRemaining >= 0 ? 'remaining' : 'too many';
 *     return `You have ${Math.abs(this.descriptionCharactersRemaining)} ${characterString} ${endString}`;
 *   }
 * }
 * ```
 *
 **/
import { Directive, Output, ElementRef, EventEmitter } from '@angular/core';
var CharacterCountDirective = /** @class */ (function () {
    function CharacterCountDirective(el) {
        this.el = el;
        this.charLimit = null;
        this.onCharacterCountChanged = new EventEmitter(true);
        this.charLimit = this.el.nativeElement.getAttribute('charLimit');
    }
    CharacterCountDirective.prototype.ngAfterViewInit = function () {
        var valueLength = this.el.nativeElement.value ? this.el.nativeElement.value.length : 0;
        if (this.charLimit) {
            this.onCharacterCountChanged.emit(this.charLimit - valueLength);
        }
    };
    CharacterCountDirective.prototype.onInput = function (e) {
        if (!this.charLimit || e.target.value === undefined)
            return;
        this.onCharacterCountChanged.emit(this.charLimit - e.target.value.length);
    };
    CharacterCountDirective.prototype.onIonChange = function (e) {
        if (!this.charLimit || e.value === undefined)
            return;
        this.onCharacterCountChanged.emit(this.charLimit - e.value.length);
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CharacterCountDirective.prototype, "onCharacterCountChanged", void 0);
    CharacterCountDirective = __decorate([
        Directive({
            selector: '[charCount]',
            host: {
                '(input)': 'onInput($event)',
                '(ionChange)': 'onIonChange($event)',
            },
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], CharacterCountDirective);
    return CharacterCountDirective;
}());
export { CharacterCountDirective };
//# sourceMappingURL=character-count.directive.js.map