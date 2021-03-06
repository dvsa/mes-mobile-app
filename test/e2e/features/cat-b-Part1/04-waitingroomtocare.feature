@catb @full_smoke @regression
Feature: Waiting Room to Car

  Scenario: Waiting room to Car validation

    Given I am logged in as "mobexaminer1" and I have a test for "Miss Mcclaining Misha"
    When I start the test for "Miss Mcclaining Misha"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Mcclaining Misha" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Mcclaining Misha" page
    And validation item "waiting-room-to-car-eyesight-validation-text" should not be visible
    And validation item "waiting-room-to-car-tell-me-validation-text" should not be visible
    And validation item "waiting-room-to-car-registration-validation-text" should not be visible
    And validation item "transmission-validation-text" should not be visible
    When I click on the "continue-to-test-report-button" button
    Then validation item "waiting-room-to-car-eyesight-validation-text" should be "Select the eyesight test outcome"
    And validation item "waiting-room-to-car-eyesight-validation-text" should be visible
    And validation item "waiting-room-to-car-tell-me-validation-text" should be "Select a 'Tell me' question"
    And validation item "waiting-room-to-car-tell-me-validation-text" should be visible
    And validation item "waiting-room-to-car-registration-validation-text" should be "Enter the registration number"
    And validation item "waiting-room-to-car-registration-validation-text" should be visible
    And validation item "transmission-validation-text" should be "Select the transmission of the vehicle"
    And validation item "transmission-validation-text" should be visible
    When I select a tell me question
    Then validation item "waiting-room-to-car-tell-me-validation-text" should not be visible
    And validation item "waiting-room-to-car-tell-me-outcome-validation-text" should be "Select a 'Tell me' question outcome"
    And validation item "waiting-room-to-car-tell-me-outcome-validation-text" should be visible
