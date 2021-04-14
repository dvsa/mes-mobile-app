import { ManoeuvresByCategoryProvider } from '../manoeuvres-by-category';
import { getManoeuvres as getManoeuvresBE } from '../../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { getManoeuvres as getManoeuvresC, } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
import { getManoeuvres as getManoeuvresD, } from '../../../modules/tests/test-data/cat-d/test-data.cat-d.selector';
import { getManoeuvres as getManoeuvresHomeTest, } from '../../../modules/tests/test-data/cat-home-test/test-data.cat-home.selector';
describe('ManoeuvresByCategoryProvider', function () {
    var provider;
    beforeEach(function () {
        provider = new ManoeuvresByCategoryProvider();
    });
    describe('getManoeuvresByCategoryCode', function () {
        var categories = {
            BE: [
                { category: "B+E" /* BE */ },
            ],
            C: [
                { category: "C" /* C */ },
                { category: "C1" /* C1 */ },
                { category: "C+E" /* CE */ },
                { category: "C1+E" /* C1E */ },
            ],
            D: [
                { category: "D" /* D */ },
                { category: "D1" /* D1 */ },
                { category: "D+E" /* DE */ },
                { category: "D1+E" /* D1E */ },
            ],
            Home: [
                { category: "F" /* F */ },
                { category: "G" /* G */ },
                { category: "H" /* H */ },
                { category: "K" /* K */ },
            ],
        };
        describe('CAT BE', function () {
            categories.BE.forEach(function (cat) {
                it("should return Cat " + cat.category + " manoeuvre information for a " + cat.category + " Category Code", function () {
                    expect(function () {
                        var manoeuvreData = provider.getManoeuvresByCategoryCode(cat.category);
                        expect(manoeuvreData).toEqual(getManoeuvresBE);
                    }).not.toThrowError('Error getting test category manoeuvres');
                });
            });
        });
        describe('CAT C', function () {
            categories.C.forEach(function (cat) {
                it("should return Cat " + cat.category + " manoeuvre information for a " + cat.category + " Category Code", function () {
                    expect(function () {
                        var manoeuvreData = provider.getManoeuvresByCategoryCode(cat.category);
                        expect(manoeuvreData).toEqual(getManoeuvresC);
                    }).not.toThrowError('Error getting test category manoeuvres');
                });
            });
        });
        describe('CAT D', function () {
            categories.D.forEach(function (cat) {
                it("should return Cat " + cat.category + " manoeuvre information for a " + cat.category + " Category Code", function () {
                    expect(function () {
                        var manoeuvreData = provider.getManoeuvresByCategoryCode(cat.category);
                        expect(manoeuvreData).toEqual(getManoeuvresD);
                    }).not.toThrowError('Error getting test category manoeuvres');
                });
            });
        });
        describe('CAT F,G,H,K', function () {
            categories.Home.forEach(function (cat) {
                it("should return Cat " + cat.category + " manoeuvre information for a " + cat.category + " Category Code", function () {
                    expect(function () {
                        var manoeuvreData = provider.getManoeuvresByCategoryCode(cat.category);
                        expect(manoeuvreData).toEqual(getManoeuvresHomeTest);
                    }).not.toThrowError('Error getting test category manoeuvres');
                });
            });
        });
        it('should throw an error when there is no matching test category', function () {
            expect(function () {
                provider.getManoeuvresByCategoryCode('z');
            }).toThrowError('Error getting test category manoeuvres');
        });
        it('should throw an error when test category is undefined', function () {
            expect(function () {
                provider.getManoeuvresByCategoryCode(undefined);
            }).toThrowError('Error getting test category manoeuvres');
        });
    });
});
//# sourceMappingURL=manoeuvres-by-category.spec.js.map