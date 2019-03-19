Feature: Waiting Room

   Scenario: Waiting room screen populated for candidate
    Given I am on the journal page as "mobexaminer1"
     When I start the test for "Captain Montague Smythe"
     Then the waiting room candidate name should be "Captain Montague Smythe"
      And the waiting room candidate driver number should be "SMYTH 37522 0A99HC"
    