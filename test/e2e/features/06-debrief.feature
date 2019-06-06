Feature: Debrief including Health Declaration

   Scenario: On a pass the correct candidate details are displayed
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
      When I start the test for "Miss Florence Pearson"
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Florence Pearson" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Florence Pearson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Florence Pearson" page
      And I complete the test
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Florence Pearson" page
      And the debrief candidate name should be "Miss Florence Pearson"
      And the debrief candidate driver number should be "PEARS 015220 A99HC"
      And I should see "manual" transmission is selected
      # And I chould see the application reference "123456731" - MES-2529 means this is not displayed correctly

   Scenario: The transmission value from the WRTC is carried through to the pass test debrief
      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
      When I start the test for "Mrs Jane Doe"
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Jane Doe" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Jane Doe" page
      And I complete the waiting room to car page with automatic transmission
      Then I should see the "Test report - Jane Doe" page
      And I complete the test
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Jane Doe" page
      And I should see "automatic" transmission is selected
      
   Scenario: Validation is enforced on the pass test debrief page
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Theresa Shaw"
      When I start the test for "Miss Theresa Shaw"
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Theresa Shaw" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Theresa Shaw" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Theresa Shaw" page
      And I complete the test
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Theresa Shaw" page
      And validation item "pass-finalisation-licence-received-validation-text" should not be visible
      And validation item "pass-finalisation-certificate-number-validation-text" should not be visible
      When I try to confirm the pass certificate details
      Then validation item "pass-finalisation-licence-received-validation-text" should be "Select a response"
      And validation item "pass-finalisation-licence-received-validation-text" should be visible
      And validation item "pass-finalisation-certificate-number-validation-text" should be "Enter a certificate number"
      And validation item "pass-finalisation-certificate-number-validation-text" should be visible
