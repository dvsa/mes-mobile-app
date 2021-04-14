var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Competencies, SingleFaultCompetencyNames } from '../../../../../modules/tests/test-data/test-data.constants';
import { Store, select } from '@ngrx/store';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { map } from 'rxjs/operators';
import { getEmergencyStop } from '../../../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { getAvoidance } from '../../../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.selector';
import { isEmpty } from 'lodash';
import { AddEmergencyStopSeriousFault, RemoveEmergencyStopSeriousFault, RecordEmergencyStopFirstAttempt, RecordEmergencyStopSecondAttempt, } from '../../../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import { RecordAvoidanceFirstAttempt, RecordAvoidanceSecondAttempt, RemoveAvoidanceSeriousFault, AddAvoidanceSeriousFault, } from '../../../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import { merge } from 'rxjs';
import { competencyLabels } from '../../../../../shared/constants/competencies/competencies';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { getSpeedCheckValidator, nonNumericValues, } from '../../../../../shared/constants/field-validators/field-validators';
var SpeedCheckComponent = /** @class */ (function () {
    function SpeedCheckComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.speedCheckValidator = getSpeedCheckValidator();
        this.toggleNotMet = function () {
            if (_this.competency === Competencies.speedCheckEmergency) {
                if (_this.outcome === CompetencyOutcome.S) {
                    _this.store$.dispatch(new RemoveEmergencyStopSeriousFault());
                }
                else {
                    _this.store$.dispatch(new AddEmergencyStopSeriousFault());
                }
            }
            else if (_this.competency === Competencies.speedCheckAvoidance) {
                if (_this.outcome === CompetencyOutcome.S) {
                    _this.store$.dispatch(new RemoveAvoidanceSeriousFault());
                }
                else {
                    _this.store$.dispatch(new AddAvoidanceSeriousFault());
                }
            }
        };
        this.getLabel = function () { return competencyLabels[_this.competency]; };
        this.getFirstAttempt = function () {
            return _this.firstAttempt || null;
        };
        this.getSecondAttempt = function () {
            return _this.secondAttempt || null;
        };
        this.onFirstAttemptChange = function (attemptedSpeed) {
            var firstAttempt = _this.formatSpeedAttempt(attemptedSpeed);
            if (_this.competency === Competencies.speedCheckEmergency) {
                _this.store$.dispatch(new RecordEmergencyStopFirstAttempt(firstAttempt));
            }
            if (_this.competency === Competencies.speedCheckAvoidance) {
                _this.store$.dispatch(new RecordAvoidanceFirstAttempt(firstAttempt));
            }
        };
        this.onSecondAttemptChange = function (attemptedSpeed) {
            var secondAttempt = _this.formatSpeedAttempt(attemptedSpeed);
            if (_this.competency === Competencies.speedCheckEmergency) {
                _this.store$.dispatch(new RecordEmergencyStopSecondAttempt(secondAttempt));
            }
            if (_this.competency === Competencies.speedCheckAvoidance) {
                _this.store$.dispatch(new RecordAvoidanceSecondAttempt(secondAttempt));
            }
        };
        this.formatSpeedAttempt = function (event) {
            if (event.target.value === '')
                return undefined;
            if (!_this.speedCheckValidator.pattern.test(event.target.value)) {
                event.target.value = event.target.value
                    .replace(nonNumericValues, '');
            }
            return Number(event.target.value);
        };
    }
    SpeedCheckComponent.prototype.ngOnInit = function () {
        var _this = this;
        var speedCheckData$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), map(function (testData) {
            var speedCheckData;
            if (_this.competency === Competencies.speedCheckEmergency) {
                speedCheckData = getEmergencyStop(testData);
            }
            if (_this.competency === Competencies.speedCheckAvoidance) {
                speedCheckData = getAvoidance(testData);
            }
            if (isEmpty(speedCheckData)) {
                return;
            }
            _this.firstAttempt = speedCheckData.firstAttempt;
            _this.secondAttempt = speedCheckData.secondAttempt;
            _this.outcome = speedCheckData.outcome;
        }));
        this.subscription = merge(speedCheckData$).subscribe();
    };
    SpeedCheckComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    SpeedCheckComponent.prototype.getNotMet = function () {
        return this.outcome === CompetencyOutcome.S;
    };
    SpeedCheckComponent.prototype.firstAttemptValid = function () {
        return this.firstAttempt !== null && this.firstAttempt >= 0;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SpeedCheckComponent.prototype, "competency", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SpeedCheckComponent.prototype, "pairedCompetency", void 0);
    SpeedCheckComponent = __decorate([
        Component({
            selector: 'speed-check',
            templateUrl: 'speed-check.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], SpeedCheckComponent);
    return SpeedCheckComponent;
}());
export { SpeedCheckComponent };
//# sourceMappingURL=speed-check.js.map