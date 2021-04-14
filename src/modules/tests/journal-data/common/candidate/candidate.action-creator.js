var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { PopulateCandidateDetails } from './candidate.actions';
import { PopulateCandidateDetailsCatBE } from '../../cat-be/candidate/candidate.cat-be.actions';
import { PopulateCandidateDetailsCatC } from '../../cat-c/candidate/candidate.cat-c.actions';
import { PopulateCandidateDetailsCatD } from '../../cat-d/candidate/candidate.cat-d.actions';
import { get } from 'lodash';
import { PopulateCandidateDetailsCatHome } from '../../cat-home/candidate/candidate.cat-home.actions';
export var createPopulateCandidateDetailsAction = function (testCategory, booking) {
    switch (testCategory) {
        case "ADI2" /* ADI2 */:
        case "B" /* B */:
        case "EUAMM1" /* EUAMM1 */:
        case "EUA1M1" /* EUA1M1 */:
        case "EUA2M1" /* EUA2M1 */:
        case "EUAM1" /* EUAM1 */:
        case "EUAMM2" /* EUAMM2 */:
        case "EUA1M2" /* EUA1M2 */:
        case "EUA2M2" /* EUA2M2 */:
        case "EUAM2" /* EUAM2 */:
        case "CCPC" /* CCPC */:
        case "DCPC" /* DCPC */:
            return new PopulateCandidateDetails(booking.candidate);
        case "B+E" /* BE */:
            return new PopulateCandidateDetailsCatBE(__assign(__assign({}, booking.candidate), { businessAddress: get(booking, 'business.businessAddress'), businessName: get(booking, 'business.businessName'), businessTelephone: get(booking, 'business.telephone') }));
        case "C1+E" /* C1E */:
        case "C+E" /* CE */:
        case "C1" /* C1 */:
        case "C" /* C */:
            return new PopulateCandidateDetailsCatC(__assign(__assign({}, booking.candidate), { businessAddress: get(booking, 'business.businessAddress'), businessName: get(booking, 'business.businessName'), businessTelephone: get(booking, 'business.telephone') }));
        case "D" /* D */:
        case "D1" /* D1 */:
        case "D1+E" /* D1E */:
        case "D+E" /* DE */:
            return new PopulateCandidateDetailsCatD(__assign(__assign({}, booking.candidate), { businessAddress: get(booking, 'business.businessAddress'), businessName: get(booking, 'business.businessName'), businessTelephone: get(booking, 'business.telephone') }));
        case "F" /* F */:
        case "G" /* G */:
        case "H" /* H */:
        case "K" /* K */:
            return new PopulateCandidateDetailsCatHome(__assign(__assign({}, booking.candidate), { businessAddress: get(booking, 'business.businessAddress'), businessName: get(booking, 'business.businessName'), businessTelephone: get(booking, 'business.telephone') }));
        default:
            throw new Error('No testCategory has been defined');
    }
};
//# sourceMappingURL=candidate.action-creator.js.map