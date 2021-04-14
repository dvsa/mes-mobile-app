export var ORDIT_CHANGED = '[WRTC] [CatADIPart2] Ordit Trained changed';
export var TRAINING_RECORDS_CHANGED = '[WRTC] [CatADIPart2] Training Records changed';
export var TRAINER_REGISTRATION_NUMBER_CHANGED = '[WRTC] Trainer registration number changed';
var OrditTrainedChanged = /** @class */ (function () {
    function OrditTrainedChanged(orditChanged) {
        this.orditChanged = orditChanged;
        this.type = ORDIT_CHANGED;
    }
    return OrditTrainedChanged;
}());
export { OrditTrainedChanged };
var TrainingRecordsChanged = /** @class */ (function () {
    function TrainingRecordsChanged(trainingRecordChanged) {
        this.trainingRecordChanged = trainingRecordChanged;
        this.type = TRAINING_RECORDS_CHANGED;
    }
    return TrainingRecordsChanged;
}());
export { TrainingRecordsChanged };
var TrainerRegistrationNumberChanged = /** @class */ (function () {
    function TrainerRegistrationNumberChanged(trainerRegistrationNumber) {
        this.trainerRegistrationNumber = trainerRegistrationNumber;
        this.type = TRAINER_REGISTRATION_NUMBER_CHANGED;
    }
    return TrainerRegistrationNumberChanged;
}());
export { TrainerRegistrationNumberChanged };
//# sourceMappingURL=trainer-details.cat-adi-part2.actions.js.map