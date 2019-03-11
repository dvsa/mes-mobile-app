Feature: Journal

   Scenario: Examiner views candidate details
    Given I am on the journal page as "mobexaminer1"
     When I view candidate details for "Mrs Jane Doe"
     Then I should see the "Test details - Mrs Jane Doe" page
      And I should see the "Driver number" contains "DOEXX625220A99HC"

   Scenario: Examiner is informed of a special needs slot
    Given I am on the journal page as "mobexaminer1"
     Then I have a special needs slot for "Miss Theresa Shaw"
     When I view candidate details for "Miss Theresa Shaw"
     Then I should see the "Slot type" contains "Special Needs Extra Time"
      And I should see the "Comments" contains "Candidate has dyslexia"

   Scenario: Examiner is informed of a welsh test
    Given I am on the journal page as "mobexaminer1"
     Then I have a welsh slot for "Captain Montague Smythe"

   # Note that for the Journal release this should NOT be possible
   Scenario: Examiner goes to the waiting room to meet the candidate
    Given I am on the journal page as "mobexaminer1"
     When I refresh the journal
     And I start the test for "Miss Florence Pearson"
     Then I should see the "Waiting Room" page