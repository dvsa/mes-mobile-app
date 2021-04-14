import { testsCatBReducer } from './tests.cat-b.reducer';
import { testsCatBEReducer } from './tests.cat-be.reducer';
import { testsCatCReducer } from './tests.cat-c.reducer';
import { testsCatCEReducer } from './tests.cat-ce.reducer';
import { testsCatC1Reducer } from './tests.cat-c1.reducer';
import { testsCatC1EReducer } from './tests.cat-c1e.reducer';
import { testsCatAMod1Reducer } from './tests.cat-a-mod1.reducer';
import { testsCatAMod2Reducer } from './tests.cat-a-mod2.reducer';
import { testsCatDReducer } from './tests.cat-d.reducer';
import { testsCatDEReducer } from './tests.cat-de.reducer';
import { testsCatD1Reducer } from './tests.cat-d1.reducer';
import { testsCatD1EReducer } from './tests.cat-d1e.reducer';
import { testsCatFReducer } from './tests.cat-f.reducer';
import { testsCatGReducer } from './tests.cat-g.reducer';
import { testsCatHReducer } from './tests.cat-h.reducer';
import { testsCatKReducer } from './tests.cat-k.reducer';
import { testsCatADIPart2Reducer } from './tests.cat-adi-part2.reducer';
import { testsCatCPCReducer } from './tests.cat-cpc.reducer';
export function testsReducerFactory(category, action, state) {
    switch (category) {
        case "ADI2" /* ADI2 */:
            return testsCatADIPart2Reducer(action, state);
        case "B" /* B */:
            return testsCatBReducer(action, state);
        case "B+E" /* BE */:
            return testsCatBEReducer(action, state);
        case "C" /* C */:
            return testsCatCReducer(action, state);
        case "C+E" /* CE */:
            return testsCatCEReducer(action, state);
        case "C1" /* C1 */:
            return testsCatC1Reducer(action, state);
        case "C1+E" /* C1E */:
            return testsCatC1EReducer(action, state);
        case "CCPC" /* CCPC */:
        case "DCPC" /* DCPC */:
            return testsCatCPCReducer(action, state);
        case "EUAMM1" /* EUAMM1 */:
        case "EUA1M1" /* EUA1M1 */:
        case "EUA2M1" /* EUA2M1 */:
        case "EUAM1" /* EUAM1 */:
            return testsCatAMod1Reducer(action, state);
        case "EUAMM2" /* EUAMM2 */:
        case "EUA1M2" /* EUA1M2 */:
        case "EUA2M2" /* EUA2M2 */:
        case "EUAM2" /* EUAM2 */:
            return testsCatAMod2Reducer(action, state);
        case "D" /* D */:
            return testsCatDReducer(action, state);
        case "D+E" /* DE */:
            return testsCatDEReducer(action, state);
        case "D1" /* D1 */:
            return testsCatD1Reducer(action, state);
        case "D1+E" /* D1E */:
            return testsCatD1EReducer(action, state);
        case "F" /* F */:
            return testsCatFReducer(action, state);
        case "G" /* G */:
            return testsCatGReducer(action, state);
        case "H" /* H */:
            return testsCatHReducer(action, state);
        case "K" /* K */:
            return testsCatKReducer(action, state);
        default:
            // TODO (low priority): throw an exception here instead of using category b reducer
            return testsCatBReducer(action, state);
    }
}
//# sourceMappingURL=tests-reducer-factory.js.map