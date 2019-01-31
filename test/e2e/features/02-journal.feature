Feature: Journal

   Scenario: Examiner views candidate details
    Given I am on the journal page as "mobexaminer1"
     When I view candidate details for "Miss Florence Pearson"
     Then I should see the "Candidate Details" page

   Scenario: Examiner goes to the waiting room to meet the candidate
    Given I am on the journal page as "mobexaminer1"
     When I start the test for "Miss Florence Pearson"
     Then I should see the "Waiting Room" page

