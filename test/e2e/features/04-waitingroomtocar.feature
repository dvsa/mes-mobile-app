Feature: Waiting Room to Car

   @smoke
   Scenario: Waiting room to Car validation
      Given I reset the application state for "mobexaminer1"
      When I start the test for "Mrs Jane Doe"
      Then I should see the "Declaration - Jane Doe" page
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Jane Doe" page
      And validation item "waiting-room-to-car-eyesight-validation-text" should not be visible
      And validation item "waiting-room-to-car-tell-me-validation-text" should not be visible
      And validation item "waiting-room-to-car-registration-validation-text" should not be visible
      And validation item "waiting-room-to-car-transmission-validation-text" should not be visible
      When I click on the "continue-to-test-report-button" button
      Then validation item "waiting-room-to-car-eyesight-validation-text" should be "Select the eyesight test outcome"
      And validation item "waiting-room-to-car-eyesight-validation-text" should be visible
      And validation item "waiting-room-to-car-tell-me-validation-text" should be "Select a 'Tell me' question"
      And validation item "waiting-room-to-car-tell-me-validation-text" should be visible
      And validation item "waiting-room-to-car-registration-validation-text" should be "Enter the registration number"
      And validation item "waiting-room-to-car-registration-validation-text" should be visible
      And validation item "waiting-room-to-car-transmission-validation-text" should be "Select the transmission of the vehicle"
      And validation item "waiting-room-to-car-transmission-validation-text" should be visible
      When I select a tell me question
      Then validation item "waiting-room-to-car-tell-me-validation-text" should not be visible
      And validation item "waiting-room-to-car-tell-me-outcome-validation-text" should be "Select a 'Tell me' question outcome"
      And validation item "waiting-room-to-car-tell-me-outcome-validation-text" should be visible