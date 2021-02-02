@catb @full_smoke @regression
Feature: Comms Capture and Waiting Room

  Scenario: Communications and Waiting room validation

    Given I am logged in as "mobexaminer1" and I have a test for " - Shaw"
    When I start the test for " - Shaw"
    Then validation item "waiting-room-insurance-validation-text" should not exist
    And validation item "waiting-room-residency-validation-text" should not exist
    And validation item "waiting-room-signature-validation-text" should not be visible
    When the candidate confirms their declaration
    Then validation item "waiting-room-insurance-validation-text" should be "Confirm that the vehicle is insured for the purpose of the test"
    And validation item "waiting-room-insurance-validation-text" should be visible
    And validation item "waiting-room-residency-validation-text" should be "Confirm that you live in the UK"
    And validation item "waiting-room-residency-validation-text" should be visible
    And validation item "waiting-room-signature-validation-text" should be "Enter a signature"
    And validation item "waiting-room-signature-validation-text" should be visible
    When the candidate completes the declaration page
    And the candidate confirms their declaration
    Then validation item "communication-new-email-validation-text" should not be visible
    When the candidate confirms their communication preference
    Then validation item "communication-new-email-validation-text" should be "Please enter a valid email"
    And validation item "communication-new-email-validation-text" should be visible
