import { async, TestBed } from '@angular/core/testing';
import { ReverseDiagramPage } from '../reverse-diagram-modal';
import { configureTestSuite } from 'ng-bullet';
import { AppModule } from '../../../../../app/app.module';
import { Config, IonicModule, NavController, NavParams, Platform } from 'ionic-angular';
import { ConfigMock, NavControllerMock, NavParamsMock, PlatformMock } from 'ionic-mocks';
import { ReversingDistancesProvider } from '../../../../../providers/reversing-distances/reversing-distances';
import { MockAppComponent } from '../../../../../app/__mocks__/app.component.mock';
import { App } from '../../../../../app/app.component';
import { ReverseDiagramModalMock } from '../__mocks__/reverse-diagram-modal.mock';
import { NavigationProvider } from '../../../../../providers/navigation/navigation';
import { NavigationProviderMock } from '../../../../../providers/navigation/__mocks__/navigation.mock';
import { NavigationStateProvider } from '../../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { Store, StoreModule } from '@ngrx/store';
import { ReverseDiagramLengthChanged, ReverseDiagramWidthChanged } from '../reverse-diagram-modal.actions';
describe('reverseDiagramModal', function () {
    var fixture;
    var component;
    var store$;
    var mockFile = new ReverseDiagramModalMock();
    mockFile.ngOnInit();
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [ReverseDiagramPage],
            imports: [
                AppModule,
                IonicModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                category: "D" /* D */,
                                vehicleDetails: {
                                    vehicleLength: 10,
                                    vehicleWidth: 2.75,
                                },
                                accompaniment: {},
                                testData: {
                                    dangerousFaults: {},
                                    drivingFaults: {},
                                    manoeuvres: {},
                                    seriousFaults: {},
                                    testRequirements: {},
                                    ETA: {},
                                    eco: {},
                                    vehicleChecks: {
                                        showMeQuestions: [{
                                                code: 'S3',
                                                description: '',
                                                outcome: '',
                                            }],
                                        tellMeQuestions: [{
                                                code: '',
                                                description: '',
                                                outcome: '',
                                            }],
                                    },
                                    eyesightTest: {},
                                },
                                activityCode: '28',
                                journalData: {
                                    candidate: {
                                        candidateName: 'Joe Bloggs',
                                        driverNumber: '123',
                                    },
                                },
                                rekey: false,
                            },
                        },
                    }); },
                }),
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: App, useClass: MockAppComponent },
                { provide: NavigationProvider, useClass: NavigationProviderMock },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
                ReversingDistancesProvider,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ReverseDiagramPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        var vehicleDetails = mockFile.getVehicleDetails();
        var vehicleDetailsKeys = Array.from(vehicleDetails.keys());
        var _loop_1 = function (index) {
            var testCategory = vehicleDetailsKeys[index];
            var value = vehicleDetails.get(testCategory);
            var cappedStartDistanceCategories = mockFile.getCappedStartDistanceCategories();
            describe("Category " + testCategory, function () {
                describe("ngOnInit", function () {
                    it('should set the distance based on booked in vehicle length', function (done) {
                        component.category = testCategory;
                        component.ngOnInit();
                        component.componentState.vehicleLength$.subscribe(function (result) {
                            expect(result).toEqual(value.vLength);
                            done();
                        });
                    });
                    it('should set the distance based on booked in vehicle width', function (done) {
                        component.category = testCategory;
                        component.ngOnInit();
                        component.componentState.vehicleWidth$.subscribe(function (result) {
                            expect(result).toEqual(mockFile.vehicleDetails.get(component.category).vWidth);
                            done();
                        });
                    });
                });
                describe('calculateReversingLengths', function () {
                    it("should resolve aAndA1 to " + value.expStartDist, function () {
                        spyOn(component, 'calculateReversingLengths').and.callThrough();
                        component.category = testCategory;
                        component.onLengthKeyup(value.vLength);
                        expect(store$.dispatch).toHaveBeenCalledWith(new ReverseDiagramLengthChanged(undefined, value.vLength));
                        expect(component.calculateReversingLengths).toHaveBeenCalledWith(value.vLength);
                        var result = component.reversingLengthStart;
                        expect(result).toEqual(value.expStartDist);
                    });
                    if (cappedStartDistanceCategories.includes(testCategory)) {
                        it('should override startDistance if vehicleLength > 16.5', function () {
                            component.category = testCategory;
                            component.calculateReversingLengths(17);
                            var result = component.reversingLengthStart;
                            expect(result).toEqual(66);
                        });
                    }
                    it("should resolve b to " + value.expMidDist, function () {
                        spyOn(component, 'calculateReversingLengths').and.callThrough();
                        component.category = testCategory;
                        component.onLengthKeyup(value.vLength);
                        expect(store$.dispatch).toHaveBeenCalledWith(new ReverseDiagramLengthChanged(undefined, value.vLength));
                        expect(component.calculateReversingLengths).toHaveBeenCalledWith(value.vLength);
                        var result = component.reversingLengthMiddle;
                        expect(result).toEqual(value.expMidDist);
                    });
                });
                describe('calculateReversingWidth', function () {
                    it("should resolve aToA1 to " + value.expWidthDist, function () {
                        component.category = testCategory;
                        spyOn(component, 'calculateReversingWidth').and.callThrough();
                        component.category = testCategory;
                        component.onWidthKeyup(value.vWidth);
                        expect(store$.dispatch).toHaveBeenCalledWith(new ReverseDiagramWidthChanged(undefined, value.vWidth));
                        expect(component.calculateReversingWidth).toHaveBeenCalledWith(value.vWidth);
                        var result = component.reversingWidth;
                        expect(result).toEqual(value.expWidthDist);
                    });
                });
                describe('calculateAtoBMultiplierText', function () {
                    it("should return the A to B multiplier text of " + value.expMidDistMultiplier, function () {
                        component.category = testCategory;
                        component.calculateAtoBMultiplierText();
                        var result = component.multiplierText;
                        expect(result).toEqual(value.expMidDistMultiplier);
                    });
                });
            });
        };
        for (var index in vehicleDetailsKeys) {
            _loop_1(index);
        }
        describe('ionViewWillEnter', function () {
            it('should calculate the distances if vehicle dimensions are populated', function () {
                var calculateDistanceLengthSpy = spyOn(component, 'calculateReversingLengths');
                var calculateDistanceWidthSpy = spyOn(component, 'calculateReversingWidth');
                var calculateAtoBMultiplierTextSpy = spyOn(component, 'calculateAtoBMultiplierText');
                component.ngOnInit();
                var result = component.ionViewWillEnter();
                expect(calculateDistanceLengthSpy).toHaveBeenCalled();
                expect(calculateDistanceWidthSpy).toHaveBeenCalled();
                expect(calculateAtoBMultiplierTextSpy).toHaveBeenCalled();
                expect(result).toEqual(true);
            });
        });
        describe('getReversingDiagramLabel', function () {
            it('should return `articulated` when the category is one of BE, CE, C1E, DE, D1E', function () {
                var categories = ["B+E" /* BE */, "C+E" /* CE */, "C1+E" /* C1E */, "D+E" /* DE */, "D1+E" /* D1E */];
                categories.forEach(function (category) {
                    component.category = category;
                    expect(component.getReversingDiagramLabel()).toEqual('articulated');
                });
            });
            it('should return `rigid` when the category is one of C, C1, D, D1', function () {
                var categories = ["C" /* C */, "C1" /* C1 */, "D" /* D */, "D1" /* D1 */];
                categories.forEach(function (category) {
                    component.category = category;
                    expect(component.getReversingDiagramLabel()).toEqual('rigid');
                });
            });
        });
    });
});
//# sourceMappingURL=reverse-diagram-modal.spec.js.map