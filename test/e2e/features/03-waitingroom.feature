Feature: Comms Capture and Waiting Room

   Scenario: Comms Capture screen populated for candidate
      Given I am on the journal page as "mobexaminer1"
      When I start the test for "Mrs Jane Doe"
      Then the communication page candidate name should be "Mrs Jane Doe"
      And the communication page candidate driver number should be "DOEXX 625220 A99HC"

   Scenario: Waiting room screen populated for candidate
      Given I am on the journal page as "mobexaminer1"
      When I start the test for "Mrs Jane Doe"
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      Then the waiting room candidate name should be "Mrs Jane Doe"
      And the waiting room candidate driver number should be "DOEXX 625220 A99HC"

   @smoke
   Scenario: Communications and Waiting room validation
      Given I am on the journal page as "mobexaminer1"
      When I start the test for "Miss Florence Pearson"
      # Communications page validation
      Then validation item "communication-new-email-validation-text" should not be visible
      When the candidate confirms their communication preference
      Then validation item "communication-new-email-validation-text" should be "Please enter a valid email"
      And validation item "communication-new-email-validation-text" should be visible
      When the candidate enters a new email address
      And the candidate confirms their communication preference
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

   Scenario: Candidate completes declaration and examiner proceeds to waiting room to car stage. Note using default email address
      Given I am on the journal page as "mobexaminer1"
      When I start the test for "Mrs Jane Doe"
      Then I should see the "Declaration - Jane Doe" page
      And the candidate confirms their communication preference
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Jane Doe" page