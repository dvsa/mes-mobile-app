import { FaultStoreProvider } from './fault-store';
import { TestResult } from '../../components/test-summary/enums/TestResult';

const generateFaultStoreData = function(
  drivingFaults: number,
  seriousFaults: number,
  dangerousFaults: number
) {
  const faults: any = {
    lastFault: {
      action: 'ADD',
      id: 'signalNecessary',
      faultType: 'fault',
      faultText: 'necessary'
    }
  };
  if (drivingFaults > 0) {
    faults.signalCorrect = {
      fault: drivingFaults,
      faultText: 'correctly'
    };
  }

  if (seriousFaults > 0) {
    faults.mirrorCorrect = {
      serious: seriousFaults,
      faultText: 'correctly'
    };
  }

  if (dangerousFaults > 0) {
    faults.observation = {
      dangerous: dangerousFaults,
      faultText: 'correctly'
    };
  }
  return { faults };
};

describe('Fault store - ', () => {
  let faultStore: FaultStoreProvider;

  const faultActionsMock: any = {
    loadFaults: jest.fn(() => {})
  };

  const devToolsMock: any = {
    isEnabled: jest.fn(() => {})
  };

  it('should return "Pass" for a test with no faults', () => {
    const faults = generateFaultStoreData(0, 0, 0);
    const storeMock: any = {
      select: jest.fn(() => {}),
      configureStore: jest.fn(() => {}),
      getState: jest.fn(() => {
        return faults;
      })
    };

    faultStore = new FaultStoreProvider(storeMock, faultActionsMock, devToolsMock);

    faultStore.calculateFaultTotals();
    expect(faultStore.getTestResult()).toEqual(TestResult.Pass);

    expect(faultStore.drivingFaultsNumber).toEqual(0);
    expect(faultStore.dangerousFaultsNumber).toEqual(0);
    expect(faultStore.seriousFaultsNumber).toEqual(0);
  });

  it('should return "Pass" for a test with 15 driving faults', () => {
    const faults = generateFaultStoreData(15, 0, 0);
    const storeMock: any = {
      select: jest.fn(() => {}),
      configureStore: jest.fn(() => {}),
      getState: jest.fn(() => {
        return faults;
      })
    };

    faultStore = new FaultStoreProvider(storeMock, faultActionsMock, devToolsMock);

    faultStore.calculateFaultTotals();
    expect(faultStore.getTestResult()).toEqual(TestResult.Pass);

    expect(faultStore.drivingFaultsNumber).toEqual(15);
    expect(faultStore.dangerousFaultsNumber).toEqual(0);
    expect(faultStore.seriousFaultsNumber).toEqual(0);
  });

  it('should return "Fail" for a test with a dangerous fault', () => {
    const faults = generateFaultStoreData(0, 0, 1);
    const storeMock: any = {
      select: jest.fn(() => {}),
      configureStore: jest.fn(() => {}),
      getState: jest.fn(() => {
        return faults;
      })
    };

    faultStore = new FaultStoreProvider(storeMock, faultActionsMock, devToolsMock);
    faultStore.calculateFaultTotals();

    expect(faultStore.drivingFaultsNumber).toEqual(0);
    expect(faultStore.dangerousFaultsNumber).toEqual(1);
    expect(faultStore.seriousFaultsNumber).toEqual(0);
    expect(faultStore.getTestResult()).toEqual(TestResult.Fail);
  });

  it('should return "Fail" for a test with a serious fault', () => {
    const faults = generateFaultStoreData(0, 1, 0);
    const storeMock: any = {
      select: jest.fn(() => {}),
      configureStore: jest.fn(() => {}),
      getState: jest.fn(() => {
        return faults;
      })
    };

    faultStore = new FaultStoreProvider(storeMock, faultActionsMock, devToolsMock);

    faultStore.calculateFaultTotals();

    expect(faultStore.drivingFaultsNumber).toEqual(0);
    expect(faultStore.dangerousFaultsNumber).toEqual(0);
    expect(faultStore.seriousFaultsNumber).toEqual(1);
    expect(faultStore.getTestResult()).toEqual(TestResult.Fail);
  });

  it('should return "Fail" for a test with 16 driving faults', () => {
    const faults = generateFaultStoreData(16, 0, 0);
    const storeMock: any = {
      select: jest.fn(() => {}),
      configureStore: jest.fn(() => {}),
      getState: jest.fn(() => {
        return faults;
      })
    };

    faultStore = new FaultStoreProvider(storeMock, faultActionsMock, devToolsMock);

    faultStore.calculateFaultTotals();

    expect(faultStore.drivingFaultsNumber).toEqual(16);
    expect(faultStore.dangerousFaultsNumber).toEqual(0);
    expect(faultStore.seriousFaultsNumber).toEqual(0);
    expect(faultStore.getTestResult()).toEqual(TestResult.Fail);
  });
});
