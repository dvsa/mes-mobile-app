import { TestBed } from '@angular/core/testing';
import { TestReportValidatorProvider } from '../test-report-validator';
import { FaultCountProvider } from '../../fault-count/fault-count';
import * as mocks from '../__mocks__/test-result.mock';
import { configureTestSuite } from 'ng-bullet';
import { SpeedCheckState } from '../test-report-validator.constants';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
describe('TestReportValidator', function () {
    var categories = [
        { category: "EUAM2" /* EUAM2 */, validTest: mocks.validTestCatAMod2, legalReqs: mocks.legalRequirementsAMod2 },
        { category: "B" /* B */, validTest: mocks.validTestCatB, legalReqs: mocks.legalRequirementsB },
        { category: "B+E" /* BE */, validTest: mocks.validTestCatBE, legalReqs: mocks.legalRequirementsBE },
        { category: "C" /* C */, validTest: mocks.validTestCatC, legalReqs: mocks.legalRequirementsCatCAndC1 },
        { category: "C1" /* C1 */, validTest: mocks.validTestCatC1, legalReqs: mocks.legalRequirementsCatCAndC1 },
        { category: "C+E" /* CE */, validTest: mocks.validTestCatCE, legalReqs: mocks.legalRequirementsCatCEAndC1E },
        { category: "C1+E" /* C1E */, validTest: mocks.validTestCatC1E, legalReqs: mocks.legalRequirementsCatCEAndC1E },
        { category: "D" /* D */, validTest: mocks.validTestCatD, legalReqs: mocks.legalRequirementsCatD },
        { category: "D1" /* D1 */, validTest: mocks.validTestCatD1, legalReqs: mocks.legalRequirementsCatD1 },
        { category: "D+E" /* DE */, validTest: mocks.validTestCatDE, legalReqs: mocks.legalRequirementsCatDE },
        { category: "D1+E" /* D1E */, validTest: mocks.validTestCatD1E, legalReqs: mocks.legalRequirementsCatD1E },
        { category: "F" /* F */, validTest: mocks.validTestCatF, legalReqs: mocks.legalRequirementsCatF },
        { category: "G" /* G */, validTest: mocks.validTestCatG, legalReqs: mocks.legalRequirementsCatG },
        { category: "H" /* H */, validTest: mocks.validTestCatH, legalReqs: mocks.legalRequirementsCatH },
        { category: "K" /* K */, validTest: mocks.validTestCatK, legalReqs: mocks.legalRequirementsCatK },
        { category: "ADI2" /* ADI2 */, validTest: mocks.validTestCatADIPart2, legalReqs: mocks.legalRequirementsADIPart2 },
    ];
    var delegatedCategories = [
        { category: "B+E" /* BE */, validTest: mocks.validDelegatedTestCatBE,
            delegatedRequirements: mocks.delegatedRequirementsBE },
        { category: "C" /* C */, validTest: mocks.validDelegatedTestCatCAndC1,
            delegatedRequirements: mocks.delegatedRequirementsCatCAndC1 },
        { category: "C1" /* C1 */, validTest: mocks.validDelegatedTestCatCAndC1,
            delegatedRequirements: mocks.delegatedRequirementsCatCAndC1 },
        { category: "C1+E" /* C1E */, validTest: mocks.validDelegatedTestCatCEAndC1E,
            delegatedRequirements: mocks.delegatedRequirementsCatCEAndC1E },
        { category: "C+E" /* CE */, validTest: mocks.validDelegatedTestCatCEAndC1E,
            delegatedRequirements: mocks.delegatedRequirementsCatCEAndC1E },
        { category: "D" /* D */, validTest: mocks.validDelegatedTestCatDAndD1,
            delegatedRequirements: mocks.delegatedRequirementsCatDAndD1 },
        { category: "D1" /* D1 */, validTest: mocks.validDelegatedTestCatDAndD1,
            delegatedRequirements: mocks.delegatedRequirementsCatDAndD1 },
        { category: "D+E" /* DE */, validTest: mocks.validDelegatedTestCatD1AndD1E,
            delegatedRequirements: mocks.delegatedRequirementsCatDEAndD1E },
        { category: "D1+E" /* D1E */, validTest: mocks.validDelegatedTestCatD1AndD1E,
            delegatedRequirements: mocks.delegatedRequirementsCatDEAndD1E },
    ];
    var testReportValidatorProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                TestReportValidatorProvider,
                FaultCountProvider,
            ],
        });
    });
    beforeEach(function () {
        testReportValidatorProvider = TestBed.get(TestReportValidatorProvider);
    });
    describe('isTestReportValid', function () {
        categories.forEach(function (cat) {
            it("should return true if the test report is valid for a Cat " + cat.category + " test", function () {
                var result = testReportValidatorProvider.isTestReportValid(cat.validTest, cat.category);
                expect(result).toEqual(true);
            });
            it("should return false if the test report is not valid for a Cat " + cat.category + " test", function () {
                var result = testReportValidatorProvider.isTestReportValid({}, cat.category);
                expect(result).toEqual(false);
            });
        });
    });
    describe('getMissingLegalRequirements', function () {
        categories.forEach(function (cat) {
            it("should return an empty array if the legal requirements are met for a Cat " + cat.category + " test", function () {
                var result = testReportValidatorProvider.getMissingLegalRequirements(cat.validTest, cat.category);
                expect(result).toEqual([]);
            });
            it("should return any missing legal requirements for a Cat " + cat.category + " test", function () {
                var result = testReportValidatorProvider.getMissingLegalRequirements({}, cat.category);
                expect(result).toEqual(cat.legalReqs);
            });
        });
        delegatedCategories.forEach(function (cat) {
            it("should return an empty array if the legal requirements are met for a Cat " + cat.category + " test", function () {
                var result = testReportValidatorProvider.getMissingLegalRequirements(cat.validTest, cat.category, true);
                expect(result).toEqual([]);
            });
            it("should return any missing legal requirements for a Cat " + cat.category + " test", function () {
                var result = testReportValidatorProvider.getMissingLegalRequirements({}, cat.category, true);
                expect(result).toEqual(cat.delegatedRequirements);
            });
        });
    });
    describe('isETAValid', function () {
        it('should return true if there is no ETA fault', function () {
            var result = testReportValidatorProvider.isETAValid({}, "B" /* B */);
            expect(result).toEqual(true);
        });
        it('should return true if there is a ETA and a Serious Fault', function () {
            var data = {
                ETA: {
                    physical: true,
                },
                seriousFaults: {
                    ancillaryControls: true,
                },
            };
            var result = testReportValidatorProvider.isETAValid(data, "B+E" /* BE */);
            expect(result).toEqual(true);
        });
        it('should return true if there is a ETA and a Dangerous Fault', function () {
            var data = {
                ETA: {
                    verbal: true,
                },
                dangerousFaults: {
                    ancillaryControls: true,
                },
            };
            var result = testReportValidatorProvider.isETAValid(data, "B" /* B */);
            expect(result).toEqual(true);
        });
        it('should return true if there is a Serious Fault and no ETA', function () {
            var data = {
                seriousFaults: {
                    clearance: true,
                },
            };
            var result = testReportValidatorProvider.isETAValid(data, "B+E" /* BE */);
            expect(result).toEqual(true);
        });
        it('should return true if there is a Dangerous Fault and no ETA', function () {
            var data = {
                dangerousFaults: {
                    controlsGears: true,
                },
            };
            var result = testReportValidatorProvider.isETAValid(data, "B" /* B */);
            expect(result).toEqual(true);
        });
        it('should return false if there is a ETA and no Serious or Dangerous Faults', function () {
            var data = {
                ETA: {
                    verbal: true,
                },
            };
            var result = testReportValidatorProvider.isETAValid(data, "B+E" /* BE */);
            expect(result).toEqual(false);
        });
    });
    describe('validateSpeedChecksCatAMod1', function () {
        it('should return EMERGENCY_STOP_MISSING when speed not met is true & speed is not recorded', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: undefined,
                    outcome: CompetencyOutcome.S,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.EMERGENCY_STOP_MISSING);
        });
        it('should return SpeedCheckState.NOT_MET when emergency stop speed not met is true & speed is recorded', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: 48,
                    outcome: CompetencyOutcome.S,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.NOT_MET);
        });
        it('should return AVOIDANCE_MISSING when speed not met is true & speed is not recorded', function () {
            var testData = {
                avoidance: {
                    firstAttempt: undefined,
                    outcome: CompetencyOutcome.S,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.AVOIDANCE_MISSING);
        });
        it('should return SpeedCheckState.VALID when avoidance speed not met is true & speed is recorded', function () {
            var testData = {
                avoidance: {
                    firstAttempt: 48,
                    outcome: CompetencyOutcome.S,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.VALID);
        });
        it('should return VALID when avoidance speed not met first attempt is recorded but has Serious fault', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: 56,
                },
                singleFaultCompetencies: {
                    avoidance: CompetencyOutcome.S,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.VALID);
        });
        it('should return VALID when avoidance speed not met first attempt is recorded but has Dangerous fault', function () {
            var testData = {
                avoidance: {
                    firstAttempt: 48,
                    outcome: CompetencyOutcome.S,
                },
                singleFaultCompetencies: {
                    avoidance: CompetencyOutcome.D,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.VALID);
        });
        it('should return SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT', function () {
            var testData = {
                singleFaultCompetencies: {
                    emergencyStop: CompetencyOutcome.S,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT);
        });
        it('should return SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: 55,
                },
                singleFaultCompetencies: {
                    emergencyStop: CompetencyOutcome.D,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT);
        });
        it('should return SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: undefined,
                },
                avoidance: {
                    firstAttempt: undefined,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING);
        });
        it('should return SpeedCheckState.EMERGENCY_STOP_MISSING', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: undefined,
                },
                avoidance: {
                    firstAttempt: 48,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.EMERGENCY_STOP_MISSING);
        });
        it('should return VALID when avoidance missing but competency has Serious fault', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: 48,
                },
                avoidance: {
                    firstAttempt: undefined,
                },
                singleFaultCompetencies: {
                    avoidance: CompetencyOutcome.S,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.VALID);
        });
        it('should return VALID when avoidance missing but competency has Dangerous fault', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: 48,
                },
                avoidance: {
                    firstAttempt: undefined,
                },
                singleFaultCompetencies: {
                    avoidance: CompetencyOutcome.D,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.VALID);
        });
        it('should return SpeedCheckState.AVOIDANCE_MISSING', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: 48,
                },
                avoidance: {
                    firstAttempt: undefined,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.AVOIDANCE_MISSING);
        });
        it('should return SpeedCheckState.VALID', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: 48,
                },
                avoidance: {
                    firstAttempt: 49,
                },
            };
            var result = testReportValidatorProvider.validateSpeedChecksCatAMod1(testData);
            expect(result).toBe(SpeedCheckState.VALID);
        });
    });
});
//# sourceMappingURL=test-report-validator.spec.js.map