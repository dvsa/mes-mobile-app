@catb
Feature: Comms Capture and Waiting Room

   Scenario: Waiting room screen populated for candidate
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Theresa Shaw"
      When I check candidate details for "Miss Theresa Shaw"
      And I start the test for "Miss Theresa Shaw"
      Then the waiting room candidate name should be "Miss Theresa Shaw"
      And the waiting room candidate driver number should be "SHAWX 744220 A99HC"

   Scenario: Comms Capture screen populated for candidate
      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
      When I check candidate details for "Mrs Jane Doe"
      And I start the test for "Mrs Jane Doe"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Jane Doe" page
      Then the communication page candidate name should be "Mrs Jane Doe"
      And the communication page candidate driver number should be "DOEXX 625364 A99HC"
      And the email "jane.doe@example.com" has been provided and is preselected
   
   @morning_build
   Scenario: Communications and Waiting room validation
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
      When I start the test for "Miss Florence Pearson"
      # Waiting room page validation
      Then validation item "waiting-room-insurance-validation-text" should not be visible
      And validation item "waiting-room-residency-validation-text" should not be visible
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
      # Communications page validation
      Then validation item "communication-new-email-validation-text" should not be visible
      When the candidate confirms their communication preference
      Then validation item "communication-new-email-validation-text" should be "Please enter a valid email"
      And validation item "communication-new-email-validation-text" should be visible
