var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { get } from 'lodash';
import { FaultCountProvider } from '../fault-count/fault-count';
import { hasManoeuvreBeenCompletedCatADIPart2, hasVehicleChecksBeenCompletedCatADI2, } from '../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.selector';
import { hasManoeuvreBeenCompletedCatB, hasVehicleChecksBeenCompletedCatB, } from '../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { haveSafetyAndBalanceQuestionsBeenCompleted } from '../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.selector';
import { hasManoeuvreBeenCompletedCatBE } from '../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { hasManoeuvreBeenCompletedCatC } from '../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
import { legalRequirementsLabels } from '../../shared/constants/legal-requirements/legal-requirements.constants';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { SpeedCheckState } from './test-report-validator.constants';
var TestReportValidatorProvider = /** @class */ (function () {
    function TestReportValidatorProvider(faultCountProvider) {
        this.faultCountProvider = faultCountProvider;
    }
    TestReportValidatorProvider.prototype.isTestReportValid = function (data, category, isDelegated) {
        if (isDelegated === void 0) { isDelegated = false; }
        switch (category) {
            case "ADI2" /* ADI2 */:
                return this.validateLegalRequirementsCatAdiPart2(data);
            case "B" /* B */:
                return this.validateLegalRequirementsCatB(data);
            case "B+E" /* BE */:
                return this.validateLegalRequirementsCatBE(data, isDelegated);
            case "C1" /* C1 */:
            case "C" /* C */:
                return this.validateLegalRequirementsCNonTrailer(data, isDelegated);
            case "C1+E" /* C1E */:
            case "C+E" /* CE */:
                return this.validateLegalRequirementsCTrailer(data, isDelegated);
            case "D" /* D */:
                return this.validateLegalRequirementsCatD(data, isDelegated);
            case "D1" /* D1 */:
                return this.validateLegalRequirementsCatD1(data, isDelegated);
            case "D+E" /* DE */:
                return this.validateLegalRequirementsCatDE(data, isDelegated);
            case "D1+E" /* D1E */:
                return this.validateLegalRequirementsCatD1E(data, isDelegated);
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                return this.validateLegalRequirementsCatEUAM2(data);
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */:
                return this.validateLegalRequirementsCatHomeTest(data);
            default:
                return false;
        }
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirements = function (data, category, isDelegated) {
        if (isDelegated === void 0) { isDelegated = false; }
        switch (category) {
            case "ADI2" /* ADI2 */:
                return this.getMissingLegalRequirementsCatAdiPart2(data);
            case "B" /* B */:
                return this.getMissingLegalRequirementsCatB(data);
            case "B+E" /* BE */:
                return this.getMissingLegalRequirementsCatBE(data, isDelegated);
            case "C1" /* C1 */:
            case "C" /* C */:
                return this.getMissingLegalRequirementsCNonTrailer(data, isDelegated);
            case "C1+E" /* C1E */:
            case "C+E" /* CE */:
                return this.getMissingLegalRequirementsCTrailer(data, isDelegated);
            case "D" /* D */:
                return this.getMissingLegalRequirementsCatD(data, isDelegated);
            case "D1" /* D1 */:
                return this.getMissingLegalRequirementsCatD1(data, isDelegated);
            case "D+E" /* DE */:
                return this.getMissingLegalRequirementsCatDE(data, isDelegated);
            case "D1+E" /* D1E */:
                return this.getMissingLegalRequirementsCatD1E(data, isDelegated);
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAM2" /* EUAM2 */:
            case "EUAMM2" /* EUAMM2 */:
                return this.getMissingLegalRequirementsCatEUAM2(data);
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
                return this.getMissingLegalRequirementsCatHomeTest(data);
            case "K" /* K */:
                return this.getMissingLegalRequirementsCatK(data);
            default:
                return [];
        }
    };
    TestReportValidatorProvider.prototype.isETAValid = function (data, category) {
        var noEtaFaults = !(get(data, 'ETA.verbal') || get(data, 'ETA.physical'));
        return noEtaFaults ||
            this.faultCountProvider.getDangerousFaultSumCount(category, data) !== 0 ||
            this.faultCountProvider.getSeriousFaultSumCount(category, data) !== 0;
    };
    TestReportValidatorProvider.prototype.validateSpeedChecksCatAMod1 = function (data) {
        var emergencyStopNotMet = get(data, 'emergencyStop.outcome');
        var avoidanceNotMet = get(data, 'avoidance.outcome');
        var emergencyStopFirstAttempt = get(data, 'emergencyStop.firstAttempt');
        var avoidanceFirstAttempt = get(data, 'avoidance.firstAttempt');
        var emergencyStopOutcome = get(data, 'singleFaultCompetencies.emergencyStop');
        var avoidanceOutcome = get(data, 'singleFaultCompetencies.avoidance');
        if (emergencyStopNotMet === CompetencyOutcome.S) {
            if (emergencyStopFirstAttempt === undefined) {
                return SpeedCheckState.EMERGENCY_STOP_MISSING;
            }
            return SpeedCheckState.NOT_MET;
        }
        if (emergencyStopOutcome === CompetencyOutcome.S) {
            return SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT;
        }
        if (emergencyStopOutcome === CompetencyOutcome.D) {
            return SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT;
        }
        if (avoidanceNotMet === CompetencyOutcome.S) {
            if (avoidanceFirstAttempt === undefined) {
                return SpeedCheckState.AVOIDANCE_MISSING;
            }
            return SpeedCheckState.VALID;
        }
        if (emergencyStopFirstAttempt === undefined && avoidanceFirstAttempt === undefined) {
            return SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING;
        }
        if (emergencyStopFirstAttempt === undefined) {
            return SpeedCheckState.EMERGENCY_STOP_MISSING;
        }
        if (avoidanceFirstAttempt === undefined) {
            if (avoidanceOutcome === CompetencyOutcome.S || avoidanceOutcome === CompetencyOutcome.D) {
                return SpeedCheckState.VALID;
            }
            return SpeedCheckState.AVOIDANCE_MISSING;
        }
        return SpeedCheckState.VALID;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCatAdiPart2 = function (data) {
        var normalStart1 = get(data, 'testRequirements.normalStart1', false);
        var normalStart2 = get(data, 'testRequirements.normalStart2', false);
        var angledStart = get(data, 'testRequirements.angledStart', false);
        var uphillStart = get(data, 'testRequirements.uphillStart', false);
        var downhillStart = get(data, 'testRequirements.downhillStart', false);
        var manoeuvre = hasManoeuvreBeenCompletedCatADIPart2(data.manoeuvres) || false;
        var vehicleChecks = hasVehicleChecksBeenCompletedCatADI2(data.vehicleChecks) || false;
        var eco = get(data, 'eco.completed', false);
        return (normalStart1 &&
            normalStart2 &&
            angledStart &&
            uphillStart &&
            downhillStart &&
            manoeuvre &&
            vehicleChecks &&
            eco);
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatAdiPart2 = function (data) {
        var result = [];
        !get(data, 'testRequirements.normalStart1', false) && result.push(legalRequirementsLabels.normalStart1);
        !get(data, 'testRequirements.normalStart2', false) && result.push(legalRequirementsLabels.normalStart2);
        !get(data, 'testRequirements.angledStart', false) && result.push(legalRequirementsLabels.angledStart);
        !get(data, 'testRequirements.uphillStart', false) && result.push(legalRequirementsLabels.uphillStart);
        !get(data, 'testRequirements.downhillStart', false) && result.push(legalRequirementsLabels.downhillStart);
        !hasManoeuvreBeenCompletedCatADIPart2(data.manoeuvres) && result.push(legalRequirementsLabels.manoeuvre);
        !hasVehicleChecksBeenCompletedCatADI2(data.vehicleChecks) && result.push(legalRequirementsLabels.vehicleChecks);
        !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
        return result;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCatB = function (data) {
        var normalStart1 = get(data, 'testRequirements.normalStart1', false);
        var normalStart2 = get(data, 'testRequirements.normalStart2', false);
        var angledStart = get(data, 'testRequirements.angledStart', false);
        var hillStart = get(data, 'testRequirements.hillStart', false);
        var manoeuvre = hasManoeuvreBeenCompletedCatB(data) || false;
        var vehicleChecks = hasVehicleChecksBeenCompletedCatB(data) || false;
        var eco = get(data, 'eco.completed', false);
        return normalStart1 && normalStart2 && angledStart && hillStart && manoeuvre && vehicleChecks && eco;
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatB = function (data) {
        var result = [];
        !get(data, 'testRequirements.normalStart1', false) && result.push(legalRequirementsLabels.normalStart1);
        !get(data, 'testRequirements.normalStart2', false) && result.push(legalRequirementsLabels.normalStart2);
        !get(data, 'testRequirements.angledStart', false) && result.push(legalRequirementsLabels.angledStart);
        !get(data, 'testRequirements.hillStart', false) && result.push(legalRequirementsLabels.hillStart);
        !hasManoeuvreBeenCompletedCatB(data) && result.push(legalRequirementsLabels.manoeuvre);
        !hasVehicleChecksBeenCompletedCatB(data) && result.push(legalRequirementsLabels.vehicleChecks);
        !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
        return result;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCatBE = function (data, isDelegated) {
        var normalStart1 = get(data, 'testRequirements.normalStart1', false);
        var normalStart2 = get(data, 'testRequirements.normalStart2', false);
        var uphillStart = get(data, 'testRequirements.uphillStart', false);
        var angledStartControlledStop = get(data, 'testRequirements.angledStartControlledStop', false);
        var manoeuvre = hasManoeuvreBeenCompletedCatBE(data) || false;
        var eco = get(data, 'eco.completed', false);
        var uncoupleRecouple = get(data, 'uncoupleRecouple.selected', false);
        return !isDelegated ? ((normalStart1 || normalStart2) &&
            uphillStart &&
            angledStartControlledStop &&
            manoeuvre &&
            eco &&
            uncoupleRecouple) : (angledStartControlledStop &&
            manoeuvre &&
            eco);
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatBE = function (data, isDelegated) {
        var result = [];
        if (!isDelegated) {
            !get(data, 'testRequirements.normalStart1', false) && !get(data, 'testRequirements.normalStart2', false)
                && result.push(legalRequirementsLabels.normalStart1);
            !get(data, 'testRequirements.uphillStart', false) && result.push(legalRequirementsLabels.uphillStart);
        }
        !get(data, 'testRequirements.angledStartControlledStop', false)
            && result.push(legalRequirementsLabels.angledStartControlledStop);
        !hasManoeuvreBeenCompletedCatBE(data) && result.push(legalRequirementsLabels.manoeuvre);
        !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
        !get(data, 'uncoupleRecouple.selected', false) && result.push(legalRequirementsLabels.uncoupleRecouple);
        return result;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCNonTrailer = function (data, isDelegated) {
        var normalStart1 = get(data, 'testRequirements.normalStart1', false);
        var normalStart2 = get(data, 'testRequirements.normalStart2', false);
        var uphillStart = get(data, 'testRequirements.uphillStart', false);
        var angledStartControlledStop = get(data, 'testRequirements.angledStartControlledStop', false);
        var manoeuvre = hasManoeuvreBeenCompletedCatC(data) || false;
        var eco = get(data, 'eco.completed', false);
        return !isDelegated ? ((normalStart1 || normalStart2) &&
            uphillStart &&
            angledStartControlledStop &&
            manoeuvre &&
            eco) : (angledStartControlledStop &&
            manoeuvre &&
            eco);
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCNonTrailer = function (data, isDelegated) {
        var result = [];
        if (!isDelegated) {
            (!get(data, 'testRequirements.normalStart1', false) && !get(data, 'testRequirements.normalStart2', false))
                && result.push(legalRequirementsLabels.normalStart1);
            !get(data, 'testRequirements.uphillStart', false) && result.push(legalRequirementsLabels.uphillStart);
        }
        !get(data, 'testRequirements.angledStartControlledStop', false)
            && result.push(legalRequirementsLabels.angledStartControlledStop);
        !hasManoeuvreBeenCompletedCatC(data) && result.push(legalRequirementsLabels.manoeuvre);
        !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
        return result;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCTrailer = function (data, isDelegated) {
        var normalStart1 = get(data, 'testRequirements.normalStart1', false);
        var normalStart2 = get(data, 'testRequirements.normalStart2', false);
        var uphillStart = get(data, 'testRequirements.uphillStart', false);
        var angledStartControlledStop = get(data, 'testRequirements.angledStartControlledStop', false);
        var manoeuvre = hasManoeuvreBeenCompletedCatC(data) || false;
        var eco = get(data, 'eco.completed', false);
        var uncoupleRecouple = get(data, 'uncoupleRecouple.selected', false);
        return !isDelegated ? ((normalStart1 || normalStart2) &&
            uphillStart &&
            angledStartControlledStop &&
            manoeuvre &&
            eco &&
            uncoupleRecouple) : (angledStartControlledStop &&
            manoeuvre &&
            eco &&
            uncoupleRecouple);
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCTrailer = function (data, isDelegated) {
        var result = [];
        if (!isDelegated) {
            (!get(data, 'testRequirements.normalStart1', false) && !get(data, 'testRequirements.normalStart2', false))
                && result.push(legalRequirementsLabels.normalStart1);
            !get(data, 'testRequirements.uphillStart', false) && result.push(legalRequirementsLabels.uphillStart);
        }
        !get(data, 'testRequirements.angledStartControlledStop', false)
            && result.push(legalRequirementsLabels.angledStartControlledStop);
        !hasManoeuvreBeenCompletedCatC(data) && result.push(legalRequirementsLabels.manoeuvre);
        !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
        !get(data, 'uncoupleRecouple.selected', false) && result.push(legalRequirementsLabels.uncoupleRecouple);
        return result;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCatD = function (data, isDelegated) {
        var busStop1 = get(data, 'testRequirements.busStop1', false);
        var busStop2 = get(data, 'testRequirements.busStop2', false);
        var uphillStart = get(data, 'testRequirements.uphillStart', false);
        var angledStartControlledStop = get(data, 'testRequirements.angledStartControlledStop', false);
        var manoeuvre = get(data, 'manoeuvres.reverseLeft.selected', false);
        var eco = get(data, 'eco.completed', false);
        return !isDelegated ? (busStop1 &&
            busStop2 &&
            uphillStart &&
            angledStartControlledStop &&
            manoeuvre &&
            eco) : (angledStartControlledStop &&
            manoeuvre &&
            eco);
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatD = function (data, isDelegated) {
        var result = [];
        if (!isDelegated) {
            !get(data, 'testRequirements.busStop1', false)
                && result.push(legalRequirementsLabels.busStop1);
            !get(data, 'testRequirements.busStop2', false)
                && result.push(legalRequirementsLabels.busStop2);
            !get(data, 'testRequirements.uphillStart', false)
                && result.push(legalRequirementsLabels.uphillStart);
        }
        !get(data, 'testRequirements.angledStartControlledStop', false)
            && result.push(legalRequirementsLabels.angledStartControlledStop);
        !get(data, 'manoeuvres.reverseLeft.selected', false)
            && result.push(legalRequirementsLabels.manoeuvre);
        !get(data, 'eco.completed', false)
            && result.push(legalRequirementsLabels.eco);
        return result;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCatD1 = function (data, isDelegated) {
        var normalStart1 = get(data, 'testRequirements.normalStart1', false);
        var normalStart2 = get(data, 'testRequirements.normalStart2', false);
        var uphillStart = get(data, 'testRequirements.uphillStart', false);
        var angledStartControlledStop = get(data, 'testRequirements.angledStartControlledStop', false);
        var manoeuvre = get(data, 'manoeuvres.reverseLeft.selected', false);
        var eco = get(data, 'eco.completed', false);
        return !isDelegated ? (normalStart1 &&
            normalStart2 &&
            uphillStart &&
            angledStartControlledStop &&
            manoeuvre &&
            eco) : (angledStartControlledStop &&
            manoeuvre &&
            eco);
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatD1 = function (data, isDelegated) {
        var result = [];
        if (!isDelegated) {
            !get(data, 'testRequirements.normalStart1', false)
                && result.push(legalRequirementsLabels.normalStart1);
            !get(data, 'testRequirements.normalStart2', false)
                && result.push(legalRequirementsLabels.normalStart2);
            !get(data, 'testRequirements.uphillStart', false)
                && result.push(legalRequirementsLabels.uphillStart);
        }
        !get(data, 'testRequirements.angledStartControlledStop', false)
            && result.push(legalRequirementsLabels.angledStartControlledStop);
        !get(data, 'manoeuvres.reverseLeft.selected', false)
            && result.push(legalRequirementsLabels.manoeuvre);
        !get(data, 'eco.completed', false)
            && result.push(legalRequirementsLabels.eco);
        return result;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCatDE = function (data, isDelegated) {
        var busStop1 = get(data, 'testRequirements.busStop1', false);
        var busStop2 = get(data, 'testRequirements.busStop2', false);
        var uphillStart = get(data, 'testRequirements.uphillStart', false);
        var angledStartControlledStop = get(data, 'testRequirements.angledStartControlledStop', false);
        var manoeuvre = get(data, 'manoeuvres.reverseLeft.selected', false);
        var eco = get(data, 'eco.completed', false);
        var uncoupleRecouple = get(data, 'uncoupleRecouple.selected', false);
        return !isDelegated ? (busStop1 &&
            busStop2 &&
            uphillStart &&
            angledStartControlledStop &&
            manoeuvre &&
            eco &&
            uncoupleRecouple) : (angledStartControlledStop &&
            manoeuvre &&
            eco &&
            uncoupleRecouple);
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatDE = function (data, isDelegated) {
        var result = [];
        if (!isDelegated) {
            !get(data, 'testRequirements.busStop1', false)
                && result.push(legalRequirementsLabels.busStop1);
            !get(data, 'testRequirements.busStop2', false)
                && result.push(legalRequirementsLabels.busStop2);
            !get(data, 'testRequirements.uphillStart', false)
                && result.push(legalRequirementsLabels.uphillStart);
        }
        !get(data, 'testRequirements.angledStartControlledStop', false)
            && result.push(legalRequirementsLabels.angledStartControlledStop);
        !get(data, 'manoeuvres.reverseLeft.selected', false)
            && result.push(legalRequirementsLabels.manoeuvre);
        !get(data, 'eco.completed', false)
            && result.push(legalRequirementsLabels.eco);
        !get(data, 'uncoupleRecouple.selected', false)
            && result.push(legalRequirementsLabels.uncoupleRecouple);
        return result;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCatD1E = function (data, isDelegated) {
        var normalStart1 = get(data, 'testRequirements.normalStart1', false);
        var normalStart2 = get(data, 'testRequirements.normalStart2', false);
        var uphillStart = get(data, 'testRequirements.uphillStart', false);
        var angledStartControlledStop = get(data, 'testRequirements.angledStartControlledStop', false);
        var manoeuvre = get(data, 'manoeuvres.reverseLeft.selected', false);
        var eco = get(data, 'eco.completed', false);
        var uncoupleRecouple = get(data, 'uncoupleRecouple.selected', false);
        return !isDelegated ? (normalStart1 &&
            normalStart2 &&
            uphillStart &&
            angledStartControlledStop &&
            manoeuvre &&
            eco &&
            uncoupleRecouple) : (angledStartControlledStop &&
            manoeuvre &&
            eco &&
            uncoupleRecouple);
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCatEUAM2 = function (data) {
        var normalStart1 = get(data, 'testRequirements.normalStart1', false);
        var normalStart2 = get(data, 'testRequirements.normalStart2', false);
        var angledStart = get(data, 'testRequirements.angledStart', false);
        var hillStart = get(data, 'testRequirements.hillStart', false);
        var safteyAndBalanceQuestions = haveSafetyAndBalanceQuestionsBeenCompleted(data.safetyAndBalanceQuestions);
        var eco = get(data, 'eco.completed', false);
        return normalStart1 && normalStart2 && angledStart && hillStart && safteyAndBalanceQuestions && eco;
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatD1E = function (data, isDelegated) {
        var result = [];
        if (!isDelegated) {
            !get(data, 'testRequirements.normalStart1', false)
                && result.push(legalRequirementsLabels.normalStart1);
            !get(data, 'testRequirements.normalStart2', false)
                && result.push(legalRequirementsLabels.normalStart2);
            !get(data, 'testRequirements.uphillStart', false)
                && result.push(legalRequirementsLabels.uphillStart);
        }
        !get(data, 'testRequirements.angledStartControlledStop', false)
            && result.push(legalRequirementsLabels.angledStartControlledStop);
        !get(data, 'manoeuvres.reverseLeft.selected', false)
            && result.push(legalRequirementsLabels.manoeuvre);
        !get(data, 'eco.completed', false)
            && result.push(legalRequirementsLabels.eco);
        !get(data, 'uncoupleRecouple.selected', false)
            && result.push(legalRequirementsLabels.uncoupleRecouple);
        return result;
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatEUAM2 = function (data) {
        var result = [];
        !get(data, 'testRequirements.normalStart1', false) && result.push(legalRequirementsLabels.normalStart1);
        !get(data, 'testRequirements.normalStart2', false) && result.push(legalRequirementsLabels.normalStart2);
        !get(data, 'testRequirements.angledStart', false) && result.push(legalRequirementsLabels.angledStart);
        !get(data, 'testRequirements.hillStart', false) && result.push(legalRequirementsLabels.hillStart);
        !haveSafetyAndBalanceQuestionsBeenCompleted(data.safetyAndBalanceQuestions)
            && result.push(legalRequirementsLabels.safetyAndBalanceQuestions);
        !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
        return result;
    };
    TestReportValidatorProvider.prototype.validateLegalRequirementsCatHomeTest = function (data) {
        var normalStart1 = get(data, 'testRequirements.normalStart1', false);
        var normalStart2 = get(data, 'testRequirements.normalStart2', false);
        var angledStart = get(data, 'testRequirements.angledStart', false);
        var controlledStop = get(data, 'controlledStop.selected', false);
        var uphillStartDesignatedStart = get(data, 'testRequirements.uphillStartDesignatedStart', false);
        var hCodeSafetyQuestions = get(data, 'highwayCodeSafety.selected', false);
        var eco = get(data, 'eco.completed', false);
        return normalStart1 && normalStart2 && angledStart &&
            uphillStartDesignatedStart && hCodeSafetyQuestions && eco && controlledStop;
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatHomeTest = function (data) {
        var result = [];
        !get(data, 'testRequirements.normalStart1', false) && result.push(legalRequirementsLabels.normalStart1);
        !get(data, 'testRequirements.normalStart2', false) && result.push(legalRequirementsLabels.normalStart2);
        !get(data, 'testRequirements.angledStart', false) && result.push(legalRequirementsLabels.angledStart);
        !get(data, 'testRequirements.uphillStartDesignatedStart', false)
            && result.push(legalRequirementsLabels.uphillStartDesignatedStart);
        !get(data, 'manoeuvres.reverseLeft.selected', false)
            && result.push(legalRequirementsLabels.manoeuvre);
        !get(data, 'highwayCodeSafety.selected', false) && result.push(legalRequirementsLabels.highwayCodeSafety);
        !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
        !get(data, 'controlledStop.selected', false) && result.push(legalRequirementsLabels.controlledStop);
        return result;
    };
    TestReportValidatorProvider.prototype.getMissingLegalRequirementsCatK = function (data) {
        var result = [];
        !get(data, 'testRequirements.normalStart1', false) && result.push(legalRequirementsLabels.normalStart1);
        !get(data, 'testRequirements.normalStart2', false) && result.push(legalRequirementsLabels.normalStart2);
        !get(data, 'testRequirements.angledStart', false) && result.push(legalRequirementsLabels.angledStart);
        !get(data, 'testRequirements.uphillStartDesignatedStart', false)
            && result.push(legalRequirementsLabels.uphillStartDesignatedStart);
        !get(data, 'highwayCodeSafety.selected', false) && result.push(legalRequirementsLabels.highwayCodeSafety);
        !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
        !get(data, 'controlledStop.selected', false) && result.push(legalRequirementsLabels.controlledStop);
        return result;
    };
    TestReportValidatorProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FaultCountProvider])
    ], TestReportValidatorProvider);
    return TestReportValidatorProvider;
}());
export { TestReportValidatorProvider };
//# sourceMappingURL=test-report-validator.js.map