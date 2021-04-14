import { getOrditTrained, getTrainerRegistrationNumber, getTrainingRecords, } from '../trainer-details.cat-adi-part2.selector';
describe('Trainer details Cat ADI PT2 selectors', function () {
    var state = {
        orditTrainedCandidate: false,
        trainerRegistrationNumber: 23456,
        trainingRecords: true,
    };
    describe('getOrditTrained', function () {
        it('should retrieve the ordit trained from the trainer details', function () {
            expect(getOrditTrained(state)).toBe(false);
        });
    });
    describe('getTrainerRegistrationNumber', function () {
        it('should retrieve the trainer registration number', function () {
            expect(getTrainerRegistrationNumber(state)).toBe(23456);
        });
    });
    describe('getTrainingRecords', function () {
        it('should retrieve the training recorded', function () {
            expect(getTrainingRecords(state)).toBe(true);
        });
    });
});
//# sourceMappingURL=trainer-details.cat-adi-part2.spec.js.map