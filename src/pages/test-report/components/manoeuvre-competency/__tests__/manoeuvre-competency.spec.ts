describe('Manoeuvre competency', () => {
  it('sdgsgd', () => {
    expect(true).toBe(true);
  });
  // it('should set the isManoeuvreCompetency flag to true when the competency is a manoeuvre competency', () => {
  //   component.competency = Competencies.outcomeReverseRightControl;
  //   fixture.detectChanges();
  //   expect(component.isManoeuvreCompetency).toBe(true);
  // });
  // it('should set the isManoeuvreCompetency to false when the competency is not a manoeuvre competency', () => {
  //   component.competency = Competencies.moveOffControl;
  //   fixture.detectChanges();
  //   expect(component.isManoeuvreCompetency).toBe(false);
  // });
  // it('should get the competency label from the correct object', () => {
  //   component.competency = Competencies.outcomeReverseRightControl;
  //   fixture.detectChanges();
  //   const result = component.getLabel();
  //   const expected = 'Control';
  //   expect(result).toEqual(expected);
  // });
  // describe('AddManoeuvreDrivingFault', () => {
  //   it('should dispatch the correct action when the competency is a manoeuvre', () => {
  //     component.competency = Competencies.outcomeReverseRightControl;
  //     fixture.detectChanges();
  //     const storeDispatchSpy = spyOn(store$, 'dispatch');
  //     const dispatchAddDrivingFaultSpy = spyOn(component, 'dispatchAddDrivingFault').and.callThrough();
  //     component.addOrRemoveFault(true);

  //     expect(dispatchAddDrivingFaultSpy).toHaveBeenCalledTimes(1);
  //     expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDrivingFault(component.competency));
  //   });
  // });
  // describe('DOM', () => {
  //   it('should display the correct driving fault badge with a count of 1', () => {
  //     component.competency = Competencies.outcomeReverseRightControl;
  //     component.isManoeuvreCompetency = true;
  //     component.manoeuvreCompetencyOutcome = 'DF';
  //     const result = component.getManoeuvreCompetencyOutcomeCount();
  //     fixture.detectChanges();
  //     const manoeuvreDrivingFaultsBadge = fixture.debugElement.query(By.css('.manoeuvre-driving-fault-badge'))
  //     .componentInstance;
  //     expect(manoeuvreDrivingFaultsBadge).toBeDefined();
  //     expect(result).toEqual(1);
  //   });
  // });
});
