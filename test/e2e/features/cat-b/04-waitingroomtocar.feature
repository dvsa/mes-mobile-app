@catb
Feature: Waiting Room to Car

   @smoke
   Scenario: Waiting room to Car validation
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Theresa Shaw"
      When I check candidate details for "Miss Theresa Shaw"
      And I start the test for "Miss Theresa Shaw"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Theresa Shaw" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Theresa Shaw" page
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

   Scenario: Adding a Tell me question fault carries through to test
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
      When I start the test for "Miss Florence Pearson"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Florence Pearson" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Florence Pearson" page
      When I complete the waiting room to car page with a tell me driver fault
      Then the driver fault count is "1"
      And the competency "Show me / Tell me" driver fault count is "1"