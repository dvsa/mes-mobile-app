import { FaultSummaryProvider } from '../fault-summary';
import { TestBed } from '@angular/core/testing';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { FaultSummaryCatCHelper } from '../cat-c/fault-summary.cat-c';
import { FaultSummaryCatBHelper } from '../cat-b/fault-summary.cat-b';
import { FaultSummaryCatBEHelper } from '../cat-be/fault-summary.cat-be';
import { FaultSummaryCatDHelper } from '../cat-d/fault-summary.cat-d';
import { showMe2DFTellMe3DF, showMe2DFTellMe2DF, showMe1DFTellMe1DF, showMe0DFTellMe1DF } from './fault-summary.mock';
import { configureTestSuite } from 'ng-bullet';
import { FaultSummaryCatAM1Helper } from '../cat-a-mod1/fault-summary.cat-a-mod1';
describe('faultSummaryProvider', function () {
    var categoryC = [
        {
            category: "C" /* C */,
            showMeTellMeAllFaults: showMe2DFTellMe3DF,
            showMeTellMeSemiFaults: showMe2DFTellMe2DF,
        },
        { category: "C1" /* C1 */,
            showMeTellMeAllFaults: showMe2DFTellMe3DF,
            showMeTellMeSemiFaults: showMe2DFTellMe2DF,
        },
        { category: "C1+E" /* C1E */,
            showMeTellMeAllFaults: showMe1DFTellMe1DF,
            showMeTellMeSemiFaults: showMe0DFTellMe1DF,
        },
        { category: "C+E" /* CE */,
            showMeTellMeAllFaults: showMe1DFTellMe1DF,
            showMeTellMeSemiFaults: showMe0DFTellMe1DF,
        },
    ];
    var categoryD = [
        {
            category: "D" /* D */,
            showMeTellMeAllFaults: showMe2DFTellMe3DF,
            showMeTellMeSemiFaults: showMe2DFTellMe2DF,
        },
        {
            category: "D1" /* D1 */,
            showMeTellMeAllFaults: showMe2DFTellMe3DF,
            showMeTellMeSemiFaults: showMe2DFTellMe2DF,
        },
        {
            category: "D1+E" /* D1E */,
            showMeTellMeAllFaults: showMe1DFTellMe1DF,
            showMeTellMeSemiFaults: showMe0DFTellMe1DF,
        },
        {
            category: "D+E" /* DE */,
            showMeTellMeAllFaults: showMe1DFTellMe1DF,
            showMeTellMeSemiFaults: showMe0DFTellMe1DF,
        },
    ];
    var categoryAMod1 = [
        {
            category: "EUAM1" /* EUAM1 */,
        },
        {
            category: "EUA1M1" /* EUA1M1 */,
        },
        {
            category: "EUA2M1" /* EUA2M1 */,
        },
        {
            category: "EUAMM1" /* EUAMM1 */,
        },
    ];
    var faultSummaryProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                FaultSummaryProvider,
                FaultCountProvider,
            ],
        });
    });
    beforeEach(function () {
        faultSummaryProvider = TestBed.get(FaultSummaryProvider);
        spyOn(FaultSummaryCatBHelper, 'getDrivingFaultsCatB').and.callThrough();
        spyOn(FaultSummaryCatBHelper, 'getSeriousFaultsCatB').and.callThrough();
        spyOn(FaultSummaryCatBHelper, 'getDangerousFaultsCatB').and.callThrough();
        spyOn(FaultSummaryCatBEHelper, 'getDrivingFaultsCatBE').and.callThrough();
        spyOn(FaultSummaryCatBEHelper, 'getSeriousFaultsCatBE').and.callThrough();
        spyOn(FaultSummaryCatBEHelper, 'getDangerousFaultsCatBE').and.callThrough();
        spyOn(FaultSummaryCatCHelper, 'getDrivingFaultsNonTrailer').and.callThrough();
        spyOn(FaultSummaryCatCHelper, 'getSeriousFaultsNonTrailer').and.callThrough();
        spyOn(FaultSummaryCatCHelper, 'getDangerousFaultsNonTrailer').and.callThrough();
        spyOn(FaultSummaryCatCHelper, 'getDrivingFaultsTrailer').and.callThrough();
        spyOn(FaultSummaryCatCHelper, 'getSeriousFaultsTrailer').and.callThrough();
        spyOn(FaultSummaryCatCHelper, 'getDangerousFaultsTrailer').and.callThrough();
        spyOn(FaultSummaryCatDHelper, 'getDrivingFaultsNonTrailer').and.callThrough();
        spyOn(FaultSummaryCatDHelper, 'getSeriousFaultsNonTrailer').and.callThrough();
        spyOn(FaultSummaryCatDHelper, 'getDangerousFaultsNonTrailer').and.callThrough();
        spyOn(FaultSummaryCatDHelper, 'getDrivingFaultsTrailer').and.callThrough();
        spyOn(FaultSummaryCatDHelper, 'getSeriousFaultsTrailer').and.callThrough();
        spyOn(FaultSummaryCatDHelper, 'getDangerousFaultsTrailer').and.callThrough();
    });
    describe('getDrivingFaultsList', function () {
        describe('Category B', function () {
            it('should return an empty array if there are no driving faults', function () {
                var result = faultSummaryProvider.getDrivingFaultsList({}, "B" /* B */);
                expect(result.length).toEqual(0);
            });
            it('should return an array matching the number of driving faults > 0', function () {
                var data = {
                    drivingFaults: {
                        useOfMirrorsChangeDirection: 1,
                        useOfMirrorsSignalling: 2,
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(2);
            });
            it('should return faults in reverse order of fault count', function () {
                var data = {
                    drivingFaults: {
                        useOfSpeed: 1,
                        controlsSteering: 2,
                        junctionsObservation: 5,
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B" /* B */);
                expect(result[0].faultCount).toEqual(5);
                expect(result[1].faultCount).toEqual(2);
                expect(result[2].faultCount).toEqual(1);
            });
            it('should correctly return any manoeuvre faults', function () {
                var data = {
                    manoeuvres: {
                        forwardPark: {
                            selected: true,
                            controlFault: 'DF',
                            observationFault: 'DF',
                        },
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(2);
            });
            it('should correctly return any controlled stop faults', function () {
                var data = {
                    controlledStop: {
                        fault: 'DF',
                        selected: true,
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(1);
            });
            it('should correctly return any vehicle checks faults', function () {
                var data = {
                    vehicleChecks: {
                        tellMeQuestion: {
                            outcome: 'DF',
                        },
                        showMeQuestion: {
                            outcome: 'DF',
                        },
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(1);
            });
        });
        describe('Category B+E', function () {
            it('should return an empty array if there are no driving faults', function () {
                var result = faultSummaryProvider.getDrivingFaultsList({}, "B+E" /* BE */);
                expect(result.length).toEqual(0);
            });
            it('should return an array matching the number of driving faults > 0', function () {
                var data = {
                    drivingFaults: {
                        useOfMirrorsChangeDirection: 1,
                        useOfMirrorsSignalling: 2,
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(2);
            });
            it('should correctly return any manoeuvre faults', function () {
                var data = {
                    manoeuvres: {
                        reverseLeft: {
                            selected: true,
                            controlFault: 'DF',
                            observationFault: 'DF',
                        },
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(2);
                expect(result[0].competencyDisplayName).toEqual('Reverse - Control');
                expect(result[1].competencyDisplayName).toEqual('Reverse - Observation');
            });
            it('should correctly return any uncouple recouple faults ', function () {
                var data = {
                    uncoupleRecouple: {
                        selected: true,
                        fault: 'DF',
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(1);
            });
            it('should correctly return any vehicle checks faults when there are 4 driving faults', function () {
                var data = {
                    vehicleChecks: {
                        tellMeQuestions: [
                            { outcome: 'DF' },
                            { outcome: 'DF' },
                        ],
                        showMeQuestions: [
                            { outcome: 'DF' },
                            { outcome: 'DF' },
                        ],
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(1);
                expect(result[0].faultCount).toEqual(4);
            });
            it('should correctly return any vehicle checks faults when there are 5 driving faults', function () {
                var data = {
                    vehicleChecks: {
                        tellMeQuestions: [
                            { outcome: 'DF' },
                            { outcome: 'DF' },
                            { outcome: 'DF' },
                        ],
                        showMeQuestions: [
                            { outcome: 'DF' },
                            { outcome: 'DF' },
                        ],
                    },
                };
                var result = faultSummaryProvider.getDrivingFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(1);
                expect(result[0].faultCount).toEqual(4);
            });
        });
        categoryC.forEach(function (cat) {
            describe("Category " + cat.category, function () {
                it('should return an empty array if there are no driving faults', function () {
                    var result = faultSummaryProvider.getDrivingFaultsList({}, cat.category);
                    expect(result.length).toEqual(0);
                });
                it('should return an array matching the number of driving faults > 0', function () {
                    var data = {
                        drivingFaults: {
                            useOfMirrorsChangeDirection: 1,
                            useOfMirrorsSignalling: 2,
                        },
                    };
                    var result = faultSummaryProvider.getDrivingFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
                it('should correctly return any manoeuvre faults', function () {
                    var data = {
                        manoeuvres: {
                            reverseLeft: {
                                selected: true,
                                controlFault: 'DF',
                                observationFault: 'DF',
                            },
                        },
                    };
                    var result = faultSummaryProvider.getDrivingFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                    expect(result[0].competencyDisplayName).toEqual('Reverse - Control');
                    expect(result[1].competencyDisplayName).toEqual('Reverse - Observation');
                });
                it('should correctly return any vehicle checks faults when there are 4 driving faults', function () {
                    var result = faultSummaryProvider.getDrivingFaultsList(cat.showMeTellMeSemiFaults.testData, cat.category);
                    expect(result.length).toEqual(1);
                    expect(result[0].faultCount).toEqual(cat.showMeTellMeSemiFaults.drivingFaults);
                });
                it('should correctly return 4 driving faults as the fault count when there are 5', function () {
                    var result = faultSummaryProvider.getDrivingFaultsList(cat.showMeTellMeAllFaults.testData, cat.category);
                    expect(result.length).toEqual(1);
                    expect(result[0].faultCount).toEqual(cat.showMeTellMeAllFaults.drivingFaults);
                });
            });
        });
        categoryD.forEach(function (cat) {
            describe("Category " + cat.category, function () {
                it('should return an empty array if there are no driving faults', function () {
                    var result = faultSummaryProvider.getDrivingFaultsList({}, cat.category);
                    expect(result.length).toEqual(0);
                });
                it('should return an array matching the number of driving faults > 0', function () {
                    var data = {
                        drivingFaults: {
                            useOfMirrorsChangeDirection: 1,
                            useOfMirrorsSignalling: 2,
                        },
                    };
                    var result = faultSummaryProvider.getDrivingFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
                it('should correctly return any manoeuvre faults', function () {
                    var data = {
                        manoeuvres: {
                            reverseLeft: {
                                selected: true,
                                controlFault: 'DF',
                                observationFault: 'DF',
                            },
                        },
                    };
                    var result = faultSummaryProvider.getDrivingFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                    expect(result[0].competencyDisplayName).toEqual('Reverse - Control');
                    expect(result[1].competencyDisplayName).toEqual('Reverse - Observation');
                });
                it('should correctly return any vehicle checks faults when there are 4 driving faults', function () {
                    var result = faultSummaryProvider.getDrivingFaultsList(cat.showMeTellMeSemiFaults.testData, cat.category);
                    expect(result.length).toEqual(1);
                    expect(result[0].faultCount).toEqual(cat.showMeTellMeSemiFaults.drivingFaults);
                });
                it('should correctly return 4 driving faults as the fault count when there are 5', function () {
                    var result = faultSummaryProvider.getDrivingFaultsList(cat.showMeTellMeAllFaults.testData, cat.category);
                    expect(result.length).toEqual(1);
                    expect(result[0].faultCount).toEqual(cat.showMeTellMeAllFaults.drivingFaults);
                });
            });
        });
        categoryAMod1.forEach(function (cat) {
            describe("Category " + cat.category, function () {
                it('should call correct helper function', function () {
                    var getDrivingFaultsCatAM1Spy = spyOn(FaultSummaryCatAM1Helper, 'getDrivingFaultsCatAM1');
                    var testData = {};
                    faultSummaryProvider.getDrivingFaultsList(testData, cat.category);
                    expect(getDrivingFaultsCatAM1Spy).toHaveBeenCalledWith(testData);
                });
            });
        });
    });
    describe('getSeriousFaultsList', function () {
        describe('Category B', function () {
            it('should return an empty array if there are no serious faults', function () {
                var result = faultSummaryProvider.getSeriousFaultsList({}, "B" /* B */);
                expect(result.length).toEqual(0);
            });
            it('should return an array matching the number of serious faults set to true', function () {
                var data = {
                    seriousFaults: {
                        ancillaryControls: true,
                        awarenessPlanning: true,
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(2);
            });
            it('should return an eyesight fail fault if one exists', function () {
                var data = {
                    eyesightTest: {
                        complete: true,
                        seriousFault: true,
                        faultComments: 'test-fault-comment',
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B" /* B */);
                expect(result[0].competencyIdentifier).toEqual('eyesightTest');
                expect(result[0].comment).toEqual('test-fault-comment');
            });
            it('should correctly return any vehicle checks faults', function () {
                var data = {
                    vehicleChecks: {
                        showMeQuestion: {
                            outcome: 'S',
                        },
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(1);
            });
            it('should correctly return any controlled stop faults', function () {
                var data = {
                    controlledStop: {
                        fault: 'S',
                        selected: true,
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(1);
            });
            it('should return an array length matching the number of manoeuvre driving faults', function () {
                var data = {
                    manoeuvres: {
                        forwardPark: {
                            selected: true,
                            controlFault: 'S',
                            observationFault: 'S',
                        },
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(2);
            });
        });
        describe('Category B+E', function () {
            it('should return an empty array if there are no serious faults', function () {
                var result = faultSummaryProvider.getSeriousFaultsList({}, "B+E" /* BE */);
                expect(result.length).toEqual(0);
            });
            it('should return an array matching the number of serious faults set to true', function () {
                var data = {
                    seriousFaults: {
                        ancillaryControls: true,
                        awarenessPlanning: true,
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(2);
            });
            it('should return an eyesight fail fault if one exists', function () {
                var data = {
                    eyesightTest: {
                        complete: true,
                        seriousFault: true,
                        faultComments: 'test-fault-comment',
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B+E" /* BE */);
                expect(result[0].competencyIdentifier).toEqual('eyesightTest');
                expect(result[0].comment).toEqual('test-fault-comment');
            });
            it('should correctly return any manoeuvre faults', function () {
                var data = {
                    manoeuvres: {
                        reverseLeft: {
                            selected: true,
                            controlFault: 'S',
                            observationFault: 'S',
                        },
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(2);
            });
            it('should correctly return any uncouple recouple faults ', function () {
                var data = {
                    uncoupleRecouple: {
                        selected: true,
                        fault: 'S',
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(1);
            });
            it('should correctly return any vehicle checks faults ', function () {
                var data = {
                    vehicleChecks: {
                        tellMeQuestions: [
                            { outcome: 'DF' },
                            { outcome: 'DF' },
                            { outcome: 'DF' },
                        ],
                        showMeQuestions: [
                            { outcome: 'DF' },
                            { outcome: 'DF' },
                        ],
                    },
                };
                var result = faultSummaryProvider.getSeriousFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(1);
                expect(result[0].faultCount).toEqual(1);
            });
        });
        categoryC.forEach(function (cat) {
            describe("Category " + cat.category, function () {
                it('should return an empty array if there are no serious faults', function () {
                    var result = faultSummaryProvider.getSeriousFaultsList({}, cat.category);
                    expect(result.length).toEqual(0);
                });
                it('should return an array matching the number of serious faults set to true', function () {
                    var data = {
                        seriousFaults: {
                            ancillaryControls: true,
                            awarenessPlanning: true,
                        },
                    };
                    var result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
                it('should correctly return any manoeuvre faults', function () {
                    var data = {
                        manoeuvres: {
                            reverseLeft: {
                                selected: true,
                                controlFault: 'S',
                                observationFault: 'S',
                            },
                        },
                    };
                    var result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
                it('should correctly return any vehicle checks faults ', function () {
                    var result = faultSummaryProvider.getSeriousFaultsList(cat.showMeTellMeAllFaults.testData, cat.category);
                    expect(result.length).toEqual(cat.showMeTellMeAllFaults.seriousFaults);
                    expect(result[0].faultCount).toEqual(cat.showMeTellMeAllFaults.seriousFaults);
                });
            });
        });
        categoryD.forEach(function (cat) {
            describe("Category " + cat.category, function () {
                it('should return an empty array if there are no serious faults', function () {
                    var result = faultSummaryProvider.getSeriousFaultsList({}, cat.category);
                    expect(result.length).toEqual(0);
                });
                it('should return an array matching the number of serious faults set to true', function () {
                    var data = {
                        seriousFaults: {
                            ancillaryControls: true,
                            awarenessPlanning: true,
                        },
                    };
                    var result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
                it('should correctly return any manoeuvre faults', function () {
                    var data = {
                        manoeuvres: {
                            reverseLeft: {
                                selected: true,
                                controlFault: 'S',
                                observationFault: 'S',
                            },
                        },
                    };
                    var result = faultSummaryProvider.getSeriousFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
                it('should correctly return any vehicle checks faults ', function () {
                    var result = faultSummaryProvider.getSeriousFaultsList(cat.showMeTellMeAllFaults.testData, cat.category);
                    expect(result.length).toEqual(cat.showMeTellMeAllFaults.seriousFaults);
                    expect(result[0].faultCount).toEqual(cat.showMeTellMeAllFaults.seriousFaults);
                });
            });
        });
        categoryAMod1.forEach(function (cat) {
            describe("Category " + cat.category, function () {
                it('should call correct helper function', function () {
                    var getSeriousFaultsCatAM1Spy = spyOn(FaultSummaryCatAM1Helper, 'getSeriousFaultsCatAM1');
                    var testData = {};
                    faultSummaryProvider.getSeriousFaultsList(testData, cat.category);
                    expect(getSeriousFaultsCatAM1Spy).toHaveBeenCalledWith(testData);
                });
            });
        });
    });
    describe('getDangerousFaultsList', function () {
        describe('Category B', function () {
            it('should return an empty array if there are no serious faults', function () {
                var result = faultSummaryProvider.getDangerousFaultsList({}, "B" /* B */);
                expect(result.length).toEqual(0);
            });
            it('should return an array matching the number of serious faults set to true', function () {
                var data = {
                    dangerousFaults: {
                        ancillaryControls: true,
                        awarenessPlanning: true,
                    },
                };
                var result = faultSummaryProvider.getDangerousFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(2);
            });
            it('should return an array length matching the number of manoeuvre driving faults', function () {
                var data = {
                    manoeuvres: {
                        forwardPark: {
                            selected: true,
                            controlFault: 'D',
                            observationFault: 'D',
                        },
                    },
                };
                var result = faultSummaryProvider.getDangerousFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(2);
            });
            it('should correctly return any vehicle checks faults', function () {
                var data = {
                    vehicleChecks: {
                        showMeQuestion: {
                            outcome: 'D',
                        },
                    },
                };
                var result = faultSummaryProvider.getDangerousFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(1);
            });
            it('should correctly return any controlled stop faults', function () {
                var data = {
                    controlledStop: {
                        fault: 'D',
                        selected: true,
                    },
                };
                var result = faultSummaryProvider.getDangerousFaultsList(data, "B" /* B */);
                expect(result.length).toEqual(1);
            });
        });
        describe('Category B+E', function () {
            it('should return an empty array if there are no serious faults', function () {
                var result = faultSummaryProvider.getDangerousFaultsList({}, "B+E" /* BE */);
                expect(result.length).toEqual(0);
            });
            it('should return an array matching the number of serious faults set to true', function () {
                var data = {
                    dangerousFaults: {
                        ancillaryControls: true,
                        awarenessPlanning: true,
                    },
                };
                var result = faultSummaryProvider.getDangerousFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(2);
            });
            it('should correctly return any manoeuvre faults', function () {
                var data = {
                    manoeuvres: {
                        reverseLeft: {
                            selected: true,
                            controlFault: 'D',
                            observationFault: 'D',
                        },
                    },
                };
                var result = faultSummaryProvider.getDangerousFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(2);
            });
            it('should correctly return any uncouple recouple faults ', function () {
                var data = {
                    uncoupleRecouple: {
                        selected: true,
                        fault: 'D',
                    },
                };
                var result = faultSummaryProvider.getDangerousFaultsList(data, "B+E" /* BE */);
                expect(result.length).toEqual(1);
            });
        });
        categoryC.forEach(function (cat) {
            describe("Category " + cat.category, function () {
                it('should return an empty array if there are no serious faults', function () {
                    var result = faultSummaryProvider.getDangerousFaultsList({}, cat.category);
                    expect(result.length).toEqual(0);
                });
                it('should return an array matching the number of serious faults set to true', function () {
                    var data = {
                        dangerousFaults: {
                            ancillaryControls: true,
                            awarenessPlanning: true,
                        },
                    };
                    var result = faultSummaryProvider.getDangerousFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
                it('should correctly return any manoeuvre faults', function () {
                    var data = {
                        manoeuvres: {
                            reverseLeft: {
                                selected: true,
                                controlFault: 'D',
                                observationFault: 'D',
                            },
                        },
                    };
                    var result = faultSummaryProvider.getDangerousFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
            });
        });
        categoryD.forEach(function (cat) {
            describe("Category " + cat.category, function () {
                it('should return an empty array if there are no serious faults', function () {
                    var result = faultSummaryProvider.getDangerousFaultsList({}, cat.category);
                    expect(result.length).toEqual(0);
                });
                it('should return an array matching the number of serious faults set to true', function () {
                    var data = {
                        dangerousFaults: {
                            ancillaryControls: true,
                            awarenessPlanning: true,
                        },
                    };
                    var result = faultSummaryProvider.getDangerousFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
                it('should correctly return any manoeuvre faults', function () {
                    var data = {
                        manoeuvres: {
                            reverseLeft: {
                                selected: true,
                                controlFault: 'D',
                                observationFault: 'D',
                            },
                        },
                    };
                    var result = faultSummaryProvider.getDangerousFaultsList(data, cat.category);
                    expect(result.length).toEqual(2);
                });
            });
        });
        categoryAMod1.forEach(function (cat) {
            describe("Category " + cat.category, function () {
                it('should call correct helper function', function () {
                    var getDangerousFaultsCatAM1Spy = spyOn(FaultSummaryCatAM1Helper, 'getDangerousFaultsCatAM1');
                    var testData = {};
                    faultSummaryProvider.getDangerousFaultsList(testData, cat.category);
                    expect(getDangerousFaultsCatAM1Spy).toHaveBeenCalledWith(testData);
                });
            });
        });
    });
});
//# sourceMappingURL=fault-summary.spec.js.map