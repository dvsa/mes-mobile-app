export class IncompleteTestsMock {
  calculateIncompleteTests = jasmine.createSpy('calculateIncompleteTests').and.returnValue(Promise.resolve(0));
}
