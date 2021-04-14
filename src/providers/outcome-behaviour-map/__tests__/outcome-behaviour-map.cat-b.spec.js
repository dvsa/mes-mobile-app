import { TestBed } from '@angular/core/testing';
import { OutcomeBehaviourMapProvider } from '../outcome-behaviour-map';
import { behaviourMap } from '../../../pages/office/office-behaviour-map';
import { configureTestSuite } from 'ng-bullet';
describe('OutcomeBehaviourMapProvider', function () {
    var outcomeBehaviourMapProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                OutcomeBehaviourMapProvider,
            ],
        });
    });
    beforeEach(function () {
        outcomeBehaviourMapProvider = TestBed.get(OutcomeBehaviourMapProvider);
        outcomeBehaviourMapProvider.setBehaviourMap(behaviourMap);
    });
    describe('CAT B unique outcome testing', function () {
        describe('outcome 1', function () {
            it("should return visibility Y for all fields but eta,faultComment and eco", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('1', 'routeNumber');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('1', 'independentDriving');
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('1', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('1', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('1', 'identification');
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('1', 'tellMeQuestion');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('1', 'showMeQuestion');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('1', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('1', 'd255');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('1', 'additionalInformation');
                expect(route).toBe('Y');
                expect(independent).toBe('Y');
                expect(candidate).toBe('Y');
                expect(debrief).toBe('Y');
                expect(identification).toBe('Y');
                expect(tellMe).toBe('Y');
                expect(showMe).toBe('Y');
                expect(weather).toBe('Y');
                expect(d255).toBe('Y');
                expect(additional).toBe('Y');
            });
            it("should return visibility A for fields eta,faultComment and eco", function () {
                var eta = outcomeBehaviourMapProvider.getVisibilityType('1', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('1', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('1', 'eco');
                expect(eta).toBe('A');
                expect(faultComment).toBe('A');
                expect(eco).toBe('A');
            });
        });
    });
    describe('outcome testing', function () {
        describe('outcome 3', function () {
            it("should return visibility Y for candidate, debrief, identification, weather, d255 and additionalInfo", function () {
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('3', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('3', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('3', 'identification');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('3', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('3', 'd255');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('3', 'additionalInformation');
                expect(candidate).toBe('Y');
                expect(debrief).toBe('Y');
                expect(identification).toBe('Y');
                expect(weather).toBe('Y');
                expect(d255).toBe('Y');
                expect(additional).toBe('Y');
            });
            it("should return visibility N for fields routeNumber, independentDriving and showMeQuestion ", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('3', 'routeNumber');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('3', 'independentDriving');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('3', 'showMeQuestion');
                expect(route).toBe('N');
                expect(independent).toBe('N');
                expect(showMe).toBe('N');
            });
            it("should return visibility A for fields eta,faultComment and eco", function () {
                var eta = outcomeBehaviourMapProvider.getVisibilityType('3', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('3', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('3', 'eco');
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('3', 'tellMeQuestion');
                expect(eta).toBe('A');
                expect(faultComment).toBe('A');
                expect(eco).toBe('A');
                expect(tellMe).toBe('A');
            });
            it("should return default value of YES for d255", function () {
                var d255 = outcomeBehaviourMapProvider.getDefault('3', 'd255');
                expect(d255).toBe('Yes');
            });
        });
        describe('outcome 4', function () {
            it("should return visibility Y for all fields but eta,faultComment and eco", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('4', 'routeNumber');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('4', 'independentDriving');
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('4', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('4', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('4', 'identification');
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('4', 'tellMeQuestion');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('4', 'showMeQuestion');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('4', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('4', 'd255');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('4', 'additionalInformation');
                expect(route).toBe('Y');
                expect(independent).toBe('Y');
                expect(candidate).toBe('Y');
                expect(debrief).toBe('Y');
                expect(identification).toBe('Y');
                expect(tellMe).toBe('Y');
                expect(showMe).toBe('Y');
                expect(weather).toBe('Y');
                expect(d255).toBe('Y');
                expect(additional).toBe('Y');
            });
            it("should return visibility A for fields eta,faultComment and eco", function () {
                var eta = outcomeBehaviourMapProvider.getVisibilityType('4', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('4', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('4', 'eco');
                expect(eta).toBe('A');
                expect(faultComment).toBe('A');
                expect(eco).toBe('A');
            });
            it("should return showNotApplicable true for fields independentDriving and showMeQuestion", function () {
                var independent = outcomeBehaviourMapProvider.showNotApplicable('4', 'independentDriving');
                var showMe = outcomeBehaviourMapProvider.showNotApplicable('4', 'showMeQuestion');
                expect(independent).toEqual(true);
                expect(showMe).toEqual(true);
            });
        });
        describe('outcome 11', function () {
            it("should return visibility Y for all fields but eta,faultComment and eco", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('11', 'routeNumber');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('11', 'independentDriving');
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('11', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('11', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('11', 'identification');
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('11', 'tellMeQuestion');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('11', 'showMeQuestion');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('11', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('11', 'd255');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('11', 'additionalInformation');
                expect(route).toBe('Y');
                expect(independent).toBe('Y');
                expect(candidate).toBe('Y');
                expect(debrief).toBe('Y');
                expect(identification).toBe('Y');
                expect(tellMe).toBe('Y');
                expect(showMe).toBe('Y');
                expect(weather).toBe('Y');
                expect(d255).toBe('Y');
                expect(additional).toBe('Y');
            });
            it("should return visibility N for fields eta,faultComment and eco", function () {
                var eta = outcomeBehaviourMapProvider.getVisibilityType('11', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('11', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('11', 'eco');
                expect(eta).toBe('N');
                expect(faultComment).toBe('N');
                expect(eco).toBe('N');
            });
            it("should return showNotApplicable true for fields independentDriving and showMeQuestion", function () {
                var independent = outcomeBehaviourMapProvider.showNotApplicable('11', 'independentDriving');
                var showMe = outcomeBehaviourMapProvider.showNotApplicable('11', 'showMeQuestion');
                expect(independent).toEqual(true);
                expect(showMe).toEqual(true);
            });
        });
        describe('outcome 20', function () {
            it("should return visibility Y for candidateDescription and additionalInformation", function () {
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('20', 'candidateDescription');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('20', 'additionalInformation');
                expect(candidate).toBe('Y');
                expect(additional).toBe('Y');
            });
            it("should return visibility N for all other fields", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('20', 'routeNumber');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('20', 'independentDriving');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('20', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('20', 'identification');
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('20', 'tellMeQuestion');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('20', 'showMeQuestion');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('20', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('20', 'd255');
                var eta = outcomeBehaviourMapProvider.getVisibilityType('20', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('20', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('20', 'eco');
                expect(route).toBe('N');
                expect(independent).toBe('N');
                expect(debrief).toBe('N');
                expect(identification).toBe('N');
                expect(tellMe).toBe('N');
                expect(showMe).toBe('N');
                expect(weather).toBe('N');
                expect(d255).toBe('N');
                expect(eta).toBe('N');
                expect(faultComment).toBe('N');
                expect(eco).toBe('N');
            });
        });
        describe('outcome 21', function () {
            // tslint:disable-next-line:max-line-length
            it("should return visibility Y for candidateDescription,additionalInformation,identification, weather and d255", function () {
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('21', 'candidateDescription');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('21', 'additionalInformation');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('21', 'identification');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('21', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('21', 'd255');
                expect(candidate).toBe('Y');
                expect(additional).toBe('Y');
                expect(identification).toBe('Y');
                expect(weather).toBe('Y');
                expect(d255).toBe('Y');
            });
            it("should return visibility A for tellMeQuestion", function () {
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('21', 'tellMeQuestion');
                expect(tellMe).toBe('A');
            });
            it("should return visibility N for all other fields", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('21', 'routeNumber');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('21', 'independentDriving');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('21', 'debriefWitnessed');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('21', 'showMeQuestion');
                var eta = outcomeBehaviourMapProvider.getVisibilityType('21', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('21', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('21', 'eco');
                expect(route).toBe('N');
                expect(independent).toBe('N');
                expect(debrief).toBe('N');
                expect(showMe).toBe('N');
                expect(eta).toBe('N');
                expect(faultComment).toBe('N');
                expect(eco).toBe('N');
            });
        });
        describe('outcome 22', function () {
            it("should return showNotApplicable true for independent driving and showMeQuestion", function () {
                var independent = outcomeBehaviourMapProvider.showNotApplicable('22', 'independentDriving');
                var showMe = outcomeBehaviourMapProvider.showNotApplicable('22', 'showMeQuestion');
                expect(independent).toEqual(true);
                expect(showMe).toEqual(true);
            });
            it("should return visibility A for tellMeQuestion", function () {
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('22', 'tellMeQuestion');
                expect(tellMe).toBe('A');
            });
            it("should return visibility N for eta, eco and faultComment fields", function () {
                var eta = outcomeBehaviourMapProvider.getVisibilityType('22', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('22', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('22', 'eco');
                expect(eta).toBe('N');
                expect(faultComment).toBe('N');
                expect(eco).toBe('N');
            });
            it("should return visibility Y for all other fields", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('22', 'routeNumber');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('22', 'independentDriving');
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('22', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('22', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('22', 'identification');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('22', 'showMeQuestion');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('22', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('22', 'd255');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('22', 'additionalInformation');
                expect(route).toBe('Y');
                expect(independent).toBe('Y');
                expect(candidate).toBe('Y');
                expect(debrief).toBe('Y');
                expect(identification).toBe('Y');
                expect(showMe).toBe('Y');
                expect(weather).toBe('Y');
                expect(d255).toBe('Y');
                expect(additional).toBe('Y');
            });
        });
        describe('outcome 23', function () {
            it("should return showNotApplicable true for independent driving", function () {
                var independent = outcomeBehaviourMapProvider.showNotApplicable('23', 'independentDriving');
                expect(independent).toEqual(true);
            });
            it("should return visibility N for eta, eco and faultComment fields", function () {
                var eta = outcomeBehaviourMapProvider.getVisibilityType('23', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('23', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('23', 'eco');
                expect(eta).toBe('N');
                expect(faultComment).toBe('N');
                expect(eco).toBe('N');
            });
            it("should return visibility Y for all other fields", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('23', 'routeNumber');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('23', 'independentDriving');
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('23', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('23', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('23', 'identification');
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('23', 'tellMeQuestion');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('23', 'showMeQuestion');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('23', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('23', 'd255');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('23', 'additionalInformation');
                expect(route).toBe('Y');
                expect(independent).toBe('Y');
                expect(candidate).toBe('Y');
                expect(debrief).toBe('Y');
                expect(identification).toBe('Y');
                expect(tellMe).toBe('Y');
                expect(showMe).toBe('Y');
                expect(weather).toBe('Y');
                expect(d255).toBe('Y');
                expect(additional).toBe('Y');
            });
        });
        describe('outcome 33', function () {
            it("should return visibility A for tellMeQuestion", function () {
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('33', 'tellMeQuestion');
                expect(tellMe).toBe('A');
            });
            it("should return visibility Y for candidate,debrief,identification,weather,d255 and additional", function () {
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('33', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('33', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('33', 'identification');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('33', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('33', 'd255');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('33', 'additionalInformation');
                expect(candidate).toBe('Y');
                expect(debrief).toBe('Y');
                expect(identification).toBe('Y');
                expect(weather).toBe('Y');
                expect(d255).toBe('Y');
                expect(additional).toBe('Y');
            });
            it("should return visibility N for all other fields", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('33', 'routeNumber');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('33', 'independentDriving');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('33', 'showMeQuestion');
                var eta = outcomeBehaviourMapProvider.getVisibilityType('33', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('33', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('33', 'eco');
                expect(route).toBe('N');
                expect(independent).toBe('N');
                expect(showMe).toBe('N');
                expect(eta).toBe('N');
                expect(faultComment).toBe('N');
                expect(eco).toBe('N');
            });
        });
        describe('outcome 40', function () {
            it("should return visibility Y for route,candidate,debrief,identification,weather,d255 and additional", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('40', 'routeNumber');
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('40', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('40', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('40', 'identification');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('40', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('40', 'd255');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('40', 'additionalInformation');
                expect(route).toBe('Y');
                expect(candidate).toBe('Y');
                expect(debrief).toBe('Y');
                expect(identification).toBe('Y');
                expect(weather).toBe('Y');
                expect(d255).toBe('Y');
                expect(additional).toBe('Y');
            });
            it("should return visibility N for all other fields", function () {
                var independent = outcomeBehaviourMapProvider.getVisibilityType('40', 'independentDriving');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('40', 'showMeQuestion');
                var eta = outcomeBehaviourMapProvider.getVisibilityType('40', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('40', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('40', 'eco');
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('40', 'tellMeQuestion');
                expect(independent).toBe('N');
                expect(showMe).toBe('N');
                expect(eta).toBe('N');
                expect(faultComment).toBe('N');
                expect(eco).toBe('N');
                expect(tellMe).toBe('N');
            });
        });
        describe('outcome 51', function () {
            it("should return visibility Y for additional information", function () {
                var additional = outcomeBehaviourMapProvider.getVisibilityType('51', 'additionalInformation');
                expect(additional).toBe('Y');
            });
            it("should return visibility N for all other fields", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('51', 'routeNumber');
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('51', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('51', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('51', 'identification');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('51', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('51', 'd255');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('51', 'independentDriving');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('51', 'showMeQuestion');
                var eta = outcomeBehaviourMapProvider.getVisibilityType('51', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('51', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('51', 'eco');
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('51', 'tellMeQuestion');
                expect(route).toBe('N');
                expect(candidate).toBe('N');
                expect(debrief).toBe('N');
                expect(identification).toBe('N');
                expect(weather).toBe('N');
                expect(d255).toBe('N');
                expect(independent).toBe('N');
                expect(showMe).toBe('N');
                expect(eta).toBe('N');
                expect(faultComment).toBe('N');
                expect(eco).toBe('N');
                expect(tellMe).toBe('N');
            });
        });
        describe('outcome 69', function () {
            it("should return visibility Y for candidate,debrief,identification and additionalInformation", function () {
                var candidate = outcomeBehaviourMapProvider.getVisibilityType('69', 'candidateDescription');
                var debrief = outcomeBehaviourMapProvider.getVisibilityType('69', 'debriefWitnessed');
                var identification = outcomeBehaviourMapProvider.getVisibilityType('69', 'identification');
                var additional = outcomeBehaviourMapProvider.getVisibilityType('69', 'additionalInformation');
                expect(candidate).toBe('Y');
                expect(debrief).toBe('Y');
                expect(identification).toBe('Y');
                expect(additional).toBe('Y');
            });
            it("should return visibility N for all other fields", function () {
                var route = outcomeBehaviourMapProvider.getVisibilityType('69', 'routeNumber');
                var weather = outcomeBehaviourMapProvider.getVisibilityType('69', 'weatherConditions');
                var d255 = outcomeBehaviourMapProvider.getVisibilityType('69', 'd255');
                var independent = outcomeBehaviourMapProvider.getVisibilityType('69', 'independentDriving');
                var showMe = outcomeBehaviourMapProvider.getVisibilityType('69', 'showMeQuestion');
                var eta = outcomeBehaviourMapProvider.getVisibilityType('69', 'eta');
                var faultComment = outcomeBehaviourMapProvider.getVisibilityType('69', 'faultComment');
                var eco = outcomeBehaviourMapProvider.getVisibilityType('69', 'eco');
                var tellMe = outcomeBehaviourMapProvider.getVisibilityType('69', 'tellMeQuestion');
                expect(route).toBe('N');
                expect(weather).toBe('N');
                expect(d255).toBe('N');
                expect(independent).toBe('N');
                expect(showMe).toBe('N');
                expect(eta).toBe('N');
                expect(faultComment).toBe('N');
                expect(eco).toBe('N');
                expect(tellMe).toBe('N');
            });
        });
    });
});
//# sourceMappingURL=outcome-behaviour-map.cat-b.spec.js.map