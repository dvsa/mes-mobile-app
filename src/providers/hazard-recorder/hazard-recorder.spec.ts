import { HazardRecorderProvider } from './hazard-recorder';

describe('HazardRecorder - ', () => {
  let hazardRecorder: HazardRecorderProvider;

  beforeEach(() => {
    hazardRecorder = new HazardRecorderProvider();
  });

  it('should be able to enable serious recording', () => {
    hazardRecorder.enableSeriousRecording(() => true);

    expect(hazardRecorder.isSeriousRecordingEnabled).toBe(true);
  });

  it('should be able to enable serious removing', () => {
    hazardRecorder.enableSeriousRemoving(() => true);

    expect(hazardRecorder.isSeriousRemovingEnabled).toBe(true);
  });

  it('should be able to enable dangerous recording', () => {
    hazardRecorder.enableDangerousRecording(() => true);

    expect(hazardRecorder.isDangerousRecordingEnabled).toBe(true);
  });

  it('should be able to enable dangerous removing', () => {
    hazardRecorder.enableDangerousRemoving(() => true);

    expect(hazardRecorder.isDangerousRemovingEnabled).toBe(true);
  });

  it('should be able to enable removing faults', () => {
    hazardRecorder.enableRemovingFaults(() => true);

    expect(hazardRecorder.isRemovingFaultsEnabled).toBe(true);
  });

  it('should return that dangerous recording is enabled when it is', () => {
    hazardRecorder.enableDangerousRecording(() => true);

    expect(hazardRecorder.getEnabled()).toEqual('dangerous');
  });

  it('should return that removing faults is enabled when it is', () => {
    hazardRecorder.enableRemovingFaults(() => true);

    expect(hazardRecorder.getEnabled()).toEqual('remove');
  });

  it('should return that serious recording is enabled when it is', () => {
    hazardRecorder.enableSeriousRecording(() => true);

    expect(hazardRecorder.getEnabled()).toEqual('serious');
  });

  it('should return null when nothing is enabled', () => {
    expect(hazardRecorder.getEnabled()).toBeNull();
  });

  it('should disable all recording when disableRecording() is called', () => {
    hazardRecorder.enableSeriousRecording(() => true);
    hazardRecorder.enableSeriousRemoving(() => true);
    hazardRecorder.enableDangerousRecording(() => true);
    hazardRecorder.enableDangerousRemoving(() => true);
    hazardRecorder.enableRemovingFaults(() => true);
    hazardRecorder.disableRecording();

    expect(hazardRecorder.isSeriousRecordingEnabled).toBe(false);
    expect(hazardRecorder.isSeriousRemovingEnabled).toBe(false);
    expect(hazardRecorder.isDangerousRecordingEnabled).toBe(false);
    expect(hazardRecorder.isDangerousRemovingEnabled).toBe(false);
    expect(hazardRecorder.isRemovingFaultsEnabled).toBe(false);
  });

  it('should turn off serious and dangerous recording when reset() is called', () => {
    hazardRecorder.enableSeriousRecording(() => true);
    hazardRecorder.enableDangerousRecording(() => true);
    hazardRecorder.resetHazardRecording();

    expect(hazardRecorder.isSeriousRecordingEnabled).toBe(false);
    expect(hazardRecorder.isDangerousRecordingEnabled).toBe(false);
  });

  it('should return true when serious recording is enabled', () => {
    hazardRecorder.enableSeriousRecording(() => true);

    expect(hazardRecorder.isRecordingEnabled()).toBe(true);
  });

  it('should return true when dangerous recording is enabled', () => {
    hazardRecorder.enableDangerousRecording(() => true);

    expect(hazardRecorder.isRecordingEnabled()).toBe(true);
    expect(hazardRecorder.isRecordingOrRemoving()).toBe(true);
  });

  it('should return true when serious removing is enabled', () => {
    hazardRecorder.enableSeriousRemoving(() => true);

    expect(hazardRecorder.isRecordingOrRemoving()).toBe(true);
  });

  it('should return true when dangerous removing is enabled', () => {
    hazardRecorder.enableDangerousRemoving(() => true);

    expect(hazardRecorder.isRecordingOrRemoving()).toBe(true);
  });

  it('should return true when removing faults is enabled', () => {
    hazardRecorder.enableRemovingFaults(() => true);

    expect(hazardRecorder.isRecordingOrRemoving()).toBe(true);
  });
});
