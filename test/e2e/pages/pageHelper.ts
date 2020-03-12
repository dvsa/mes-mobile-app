import Page from './page';
import JournalPage from './journalPage';
import LoginPage from './loginPage';
import LandingPage from './landingPage';
import DashboardPage from './dashboardPage';

 /**
 * Temporary page to allow access to functions in Page base class
 */
class PageHelper extends Page {
  resetApp(username) {
     // Go back to dashboard
    this.waitForOverlay('click-block-active');
    JournalPage.clickBackButton();
     // Logout
    LoginPage.logout();
     // Login
    LoginPage.login(username);
     // Refresh application
    LandingPage.loadApplication().then(() => {
      LandingPage.waitForActionToInitiate();
    });

     // I should first hit the landing page
     // LandingPage.getEmployeeId(username);
    LandingPage.isCurrentPage(username);

     // Navigate to journal page
    DashboardPage.clickGoToMyJournalButton();
    JournalPage.isCurrentPage();
  }
}

export default new PageHelper();
