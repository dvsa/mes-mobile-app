export class IncompleteTestsMock {
  countIncompleteTests = jasmine.createSpy('countIncompleteTests').and.returnValue(Promise.resolve(0));
}
