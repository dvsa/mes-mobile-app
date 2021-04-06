import { Then, When } from 'cucumber';
import confirmationPage from '../pages/confirmationPage';

When('I complete the Confirmation page', async () => {
  confirmationPage.completeConfrimationPage();
});
