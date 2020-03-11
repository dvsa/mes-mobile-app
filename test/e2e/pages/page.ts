import BasePage from './basePage';

 /**
 * Concrete class to allow access to functions in BasePage class from generic-steps.ts.
 * Should not be used in the Page objects.  Page objects should extend BasePage to access methods.
 */
class Page extends BasePage {}

export default new Page();
