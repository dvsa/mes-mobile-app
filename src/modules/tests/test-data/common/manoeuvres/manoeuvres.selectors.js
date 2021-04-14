import { get } from 'lodash';
export var getReverseLeftSelected = function (manoeuvres) {
    return get(manoeuvres, 'reverseLeft.selected', false);
};
//# sourceMappingURL=manoeuvres.selectors.js.map