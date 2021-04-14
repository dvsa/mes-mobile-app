import { TestDataByCategoryProvider } from '../test-data-by-category';
describe('TestDataByCategoryProvider', function () {
    var provider;
    beforeEach(function () {
        provider = new TestDataByCategoryProvider();
    });
    describe('getTestDataByCategoryCode()', function () {
        var categories = [
            { category: "B" /* B */ },
            { category: "B+E" /* BE */ },
            { category: "C" /* C */ },
            { category: "C1" /* C1 */ },
            { category: "C+E" /* CE */ },
            { category: "C1+E" /* C1E */ },
            { category: "D" /* D */ },
            { category: "D1" /* D1 */ },
            { category: "D+E" /* DE */ },
            { category: "D1+E" /* D1E */ },
            { category: "F" /* F */ },
            { category: "G" /* G */ },
            { category: "H" /* H */ },
            { category: "K" /* K */ },
            { category: "ADI2" /* ADI2 */ },
        ];
        categories.forEach(function (cat) {
            it("should return " + cat.category + " test data for a " + cat.category + " Category Code", function () {
                expect(function () {
                    provider.getTestDataByCategoryCode(cat.category);
                }).toEqual(jasmine.any(Function));
                expect(function () {
                    provider.getTestDataByCategoryCode(cat.category);
                }).not.toThrowError('Error getting test category');
            });
        });
        it('should throw an error when there is no matching test category', function () {
            expect(function () {
                provider.getTestDataByCategoryCode('z');
            }).toThrowError('Error getting test category');
        });
        it('should throw an error when test category is undefined', function () {
            expect(function () {
                provider.getTestDataByCategoryCode(undefined);
            }).toThrowError('Error getting test category');
        });
    });
});
//# sourceMappingURL=test-data-by-category.spec.js.map