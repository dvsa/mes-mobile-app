import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, NavParams, Config } from "ionic-angular";
import { NavControllerMock, NavParamsMock, ConfigMock } from "ionic-mocks-jest";

import { AppModule } from "../../../app/app.module";
import { DebriefPage } from "../debrief";

describe("DebriefPage", () => {
  let fixture: ComponentFixture<DebriefPage>;
  let component: DebriefPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebriefPage],
      imports: [IonicModule, AppModule],
      providers: [
        {
          provide: NavController,
          useFactory: () => NavControllerMock.instance()
        },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DebriefPage);
        component = fixture.componentInstance;
      });
  }));

  describe("Class", () => {
    // Unit tests for the components TypeScript class
    it("should create", () => {
      expect(component).toBeDefined();
    });
  });

  describe("DOM", () => {
    //Unit tests for the components template
  });
});
