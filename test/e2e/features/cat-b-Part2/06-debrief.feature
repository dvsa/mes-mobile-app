@catb @full_smoke @regression
Feature: Debrief including Health Declaration

  Scenario: On a pass test debrief the correct candidate details are displayed and validation is enforced

    Given I am logged in as "mobexaminer1" and I have a test for "Mr Wolf Base"
    When I start the test for "Mr Wolf Base"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Wolf Base" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Wolf Base" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Wolf Base" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Wolf Base" page
    When I end the debrief
    Then I should see the "Test debrief - Wolf Base" page
    And the debrief candidate name should be "Mr Wolf Base"
    And the debrief candidate driver number should be "COOPE 015220 A99HC"
    And I should see the application reference "20654333031"
    And validation item "pass-finalisation-licence-received-validation-text" should not be visible
    And validation item "pass-finalisation-certificate-number-validation-text" should not be visible
    When I try to confirm the pass certificate details
    Then validation item "pass-finalisation-licence-received-validation-text" should be "Select a response"
    And validation item "pass-finalisation-licence-received-validation-text" should be visible
    And validation item "pass-finalisation-certificate-number-validation-text" should be "Enter a valid certificate number (8 characters)"
    And validation item "pass-finalisation-certificate-number-validation-text" should be visible

  Scenario: The transmission value from the WRTC is carried through to the pass test debrief

    Given I am logged in as "mobexaminer1" and I have a test for "Mr Miz Kiff"
    When I start the test for "Mr Miz Kiff"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Miz Kiff" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Miz Kiff" page
    And I complete the waiting room to car page with automatic transmission
    Then I should see the "Test report - Miz Kiff" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Miz Kiff" page
    When I end the debrief
    Then I should see the "Test debrief - Miz Kiff" page

  Scenario: For a pass the health declaration shows the correct information and validation is enforced

    Given I am logged in as "mobexaminer1" and I have a test for "Mr Daniel Craig"
    When I check candidate details for "Mr Daniel Craig"
    And I start the test for "Mr Daniel Craig"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Daniel Craig" page
    And the candidate requests to receive results by post
    And the candidate confirms their communication preference
    And I proceed to the car
    Then I should see the "Daniel Craig" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Daniel Craig" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Daniel Craig" page
    When I end the debrief
    Then I should see the "Test debrief - Daniel Craig" page
    And I complete the pass details
    Then I should see the "Test debrief - Daniel Craig" page
    And the health declaration candidate name should be "Mr Daniel Craig"
    And the health declaration candidate driver number should be "COOPE 015220 A99HC"
    And the pass certificate number should be "A123456X"
    And validation item "pass-certificate-receipt-validation-text" should not be visible
    And validation item "waiting-room-signature-validation-text" should not be visible
    When I try to confirm the health declaration
    Then validation item "pass-certificate-receipt-validation-text" should be "Confirm that you have received the pass certificate number"
    And validation item "pass-certificate-receipt-validation-text" should be visible
    And validation item "waiting-room-signature-validation-text" should be "Enter a signature"
    And validation item "waiting-room-signature-validation-text" should be visible
