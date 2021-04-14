import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { AppModule } from '../../../../../../app/app.module';
import { RecordManoeuvresSelection, AddManoeuvreDrivingFault, AddManoeuvreSeriousFault, AddManoeuvreDangerousFault, } from '../../../../../../modules/tests/test-data/cat-adi-part2/manoeuvres/manoeuvres.actions';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { ManoeuvreCompetencyComponentAdiPart2 } from '../../manoeuvre-competency/manoeuvre-competency';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../../modules/tests/test-data/test-data.constants';
import { DrivingFaultsBadgeComponent, } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { NavControllerMock } from 'ionic-mocks';
import { NavigationStateProvider } from '../../../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock, } from '../../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { configureTestSuite } from 'ng-bullet';
import { testReportReducer } from '../../../../test-report.reducer';
import { ManoeuvresPopoverComponentAdiPart2 } from '../manoeuvres-popover';
describe('ADI2 ManoeuvresPopoverComponent', function () {
    var fixture;
    var component;
    var store$;
    var mockTestData = {
        dangerousFaults: {},
        drivingFaults: {},
        manoeuvres: [{ reverseRight: { selected: true } }, {}],
        seriousFaults: {},
        testRequirements: {},
        ETA: {},
        eco: {},
        vehicleChecks: {
            showMeQuestion: [
                {
                    code: 'S3',
                    description: '',
                    outcome: 'P',
                },
            ],
            tellMeQuestion: [
                {
                    code: 'T4',
                    description: '',
                    outcome: 'DF',
                },
            ],
        },
        eyesightTest: {},
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ManoeuvresPopoverComponentAdiPart2,
                MockComponent(DrivingFaultsBadgeComponent),
                MockComponent(ManoeuvreCompetencyComponentAdiPart2),
            ],
            imports: [
                IonicModule,
                AppModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                testData: mockTestData,
                                postTestDeclarations: {
                                    healthDeclarationAccepted: false,
                                    passCertificateNumberReceived: false,
                                    postTestSignature: '',
                                },
                                journalData: {},
                                category: 'ADI2',
                                communicationPreferences: {
                                    updatedEmail: '',
                                    communicationMethod: 'Not provided',
                                    conductedLanguage: 'Not provided',
                                },
                            },
                        },
                    }); },
                    testReport: testReportReducer,
                }),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ManoeuvresPopoverComponentAdiPart2);
        component = fixture.componentInstance;
        fixture.detectChanges();
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch').and.callThrough();
    }));
    describe('Class', function () {
        it('should display the correct competencies against each manoeuvre', function () {
            component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad, 0);
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('#reverseRight-controlFault1'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseRight-observationFault1'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseParkRoad-controlFault1'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseParkRoad-observationFault1'))).not.toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseParkCarpark-controlFault1'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#reverseParkCarpark-observationFault1'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#forwardPark-controlFault1'))).toBeNull();
            expect(fixture.debugElement.query(By.css('#forwardPark-observationFault1'))).toBeNull();
        });
        describe('record manoeuvre', function () {
            it('should dispatch a RECORD_MANOEUVRES_SELECTION action', function () {
                component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad, 0);
                expect(store$.dispatch).toHaveBeenCalledWith(new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad, 0));
            });
        });
        describe('hiding manoeuvres', function () {
            it('should hide a manoeuvre in position 2 when already selected in position 1', function () {
                component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad, 0);
                component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkCarpark, 1);
                component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkCarpark, 0);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio2'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio2'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio2'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio2'))
                    .nativeElement.disabled).toBe(false);
            });
        });
        describe('disabling manoeuvres', function () {
            it('should not disable manoeuvres when a manoeuvre is selected', function () {
                component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad, 0);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio1'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio1'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio1'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio1'))
                    .nativeElement.disabled).toBe(false);
            });
            it('should disable other manoeuvres from being selected when a driving fault is added', function () {
                store$.dispatch(new AddManoeuvreDrivingFault({
                    manoeuvre: ManoeuvreTypes.reverseRight,
                    competency: ManoeuvreCompetencies.controlFault,
                }, 0));
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio1'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio1'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio1'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio1'))
                    .nativeElement.disabled).toBe(true);
            });
            it('should disable other manoeuvres from being selected when a serious fault is added', function () {
                store$.dispatch(new AddManoeuvreSeriousFault({
                    manoeuvre: ManoeuvreTypes.reverseRight,
                    competency: ManoeuvreCompetencies.controlFault,
                }, 0));
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio1'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio1'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio1'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio1'))
                    .nativeElement.disabled).toBe(true);
            });
            it('should disable other manoeuvres from being selected when a dangerous fault is added', function () {
                store$.dispatch(new AddManoeuvreDangerousFault({
                    manoeuvre: ManoeuvreTypes.reverseRight,
                    competency: ManoeuvreCompetencies.controlFault,
                }, 0));
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio1'))
                    .nativeElement.disabled).toBe(false);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio1'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio1'))
                    .nativeElement.disabled).toBe(true);
                expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio1'))
                    .nativeElement.disabled).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=manoeuvres-popover.spec.js.map