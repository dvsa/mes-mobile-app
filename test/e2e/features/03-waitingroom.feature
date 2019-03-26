Feature: Waiting Room

   Scenario: Waiting room screen populated for candidate
      Given I am on the journal page as "mobexaminer1"
      When I start the test for "Captain Montague Smythe"
      Then the waiting room candidate name should be "Captain Montague Smythe"
      And the waiting room candidate driver number should be "SMYTH 37522 0A99HC"

   Scenario: Waiting room pre submit validation
      Given I am on the journal page as "mobexaminer1"
      When I start the test for "Captain Montague Smythe"
      And validation item "waiting-room-insurance-validation-text" should not be visible
      And validation item "waiting-room-residency-validation-text" should not be visible
      And validation item "waiting-room-signature-validation-text" should not be visible

   Scenario: Waiting room submit validation
      Given I am on the journal page as "mobexaminer1"
      When I start the test for "Captain Montague Smythe"
      When I click on the "continue-button" button
      Then validation item "waiting-room-insurance-validation-text" should be "Confirm that the vehicle is insured for the purpose of the test"
      And validation item "waiting-room-insurance-validation-text" should be visible
      And validation item "waiting-room-residency-validation-text" should be "Confirm that you live in the UK"
      And validation item "waiting-room-residency-validation-text" should be visible
      And validation item "waiting-room-signature-validation-text" should be "Enter a signature"
      And validation item "waiting-room-signature-validation-text" should be visible
