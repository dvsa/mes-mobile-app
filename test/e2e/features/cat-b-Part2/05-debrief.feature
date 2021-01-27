@catb @full_smoke @regression
Feature: Debrief including Health Declaration

  Scenario: On a pass test debrief the correct candidate details are displayed and validation is enforced

    Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
    When I start the test for "Miss Florence Pearson"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Florence Pearson" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Florence Pearson" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Florence Pearson" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Florence Pearson" page
    When I end the debrief
    Then I should see the "Test debrief - Florence Pearson" page
    And the debrief candidate name should be "Miss Florence Pearson"
    And the debrief candidate driver number should be "PEARS 015220 A99HC"
    And I should see the application reference "1234567031"
    And validation item "pass-finalisation-licence-received-validation-text" should not be visible
    And validation item "pass-finalisation-certificate-number-validation-text" should not be visible
    When I try to confirm the pass certificate details
    Then validation item "pass-finalisation-licence-received-validation-text" should be "Select a response"
    And validation item "pass-finalisation-licence-received-validation-text" should be visible
    And validation item "pass-finalisation-certificate-number-validation-text" should be "Enter a valid certificate number (8 characters)"
    And validation item "pass-finalisation-certificate-number-validation-text" should be visible

  Scenario: The transmission value from the WRTC is carried through to the pass test debrief

    Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
    When I check candidate details for "Mrs Jane Doe"
    And I start the test for "Mrs Jane Doe"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Jane Doe" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Jane Doe" page
    And I complete the waiting room to car page with automatic transmission
    Then I should see the "Test report - Jane Doe" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Jane Doe" page
    When I end the debrief
    Then I should see the "Test debrief - Jane Doe" page

  Scenario: For a pass the health declaration shows the correct information and validation is enforced

    Given I am logged in as "mobexaminer1" and I have a test for "Mr Ali Campbell"
    When I check candidate details for "Mr Ali Campbell"
    And I start the test for "Mr Ali Campbell"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Ali Campbell" page
    And the candidate requests to receive results by post
    And the candidate confirms their communication preference
    And I proceed to the car
    Then I should see the "Ali Campbell" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Ali Campbell" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Ali Campbell" page
    When I end the debrief
    Then I should see the "Test debrief - Ali Campbell" page
    And I complete the pass details
    Then I should see the "Test debrief - Ali Campbell" page
    And the health declaration candidate name should be "Mr Ali Campbell"
    And the health declaration candidate driver number should be "CAMPB 803120 A89HC"
    And the pass certificate number should be "A123456X"
    And validation item "pass-certificate-receipt-validation-text" should not be visible
    And validation item "waiting-room-signature-validation-text" should not be visible
    When I try to confirm the health declaration
    Then validation item "pass-certificate-receipt-validation-text" should be "Confirm that you have received the pass certificate number"
    And validation item "pass-certificate-receipt-validation-text" should be visible
    And validation item "waiting-room-signature-validation-text" should be "Enter a signature"
    And validation item "waiting-room-signature-validation-text" should be visible
