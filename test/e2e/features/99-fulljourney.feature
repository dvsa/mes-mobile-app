Feature: Full end to end journey

   Scenario: Examiner completes a passed test with no faults
      Given I reset the application state for "mobexaminer1"
      When I start the test for "Miss Florence Pearson"
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Florence Pearson" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Florence Pearson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Florence Pearson" page
      And I complete the test
      Then I should see the "Debrief" page
      When I end the debrief
      Then I should see the "Test debrief - Florence Pearson" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And I complete the office write up
      Then I should see the "Journal" page

   Scenario: Examiner terminates test as candidate failed to attend (No mandatory office fields)
      Given I reset the application state for "mobexaminer1"
      When I start the test for "Miss Florence Pearson"
      Then I should see the "Declaration - Florence Pearson" page
      And I terminate the test
      Then I should see the "Debrief" page
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      When I select termination code "51 - Candidate failed to attend at test centre"
      And I upload the test
      Then I should see the "Journal" page

   Scenario: Examiner terminates test as candidate failed to present ID (Only physical description mandatory)
      Given I reset the application state for "mobexaminer1"
      When I start the test for "Miss Florence Pearson"
      Then I should see the "Declaration - Florence Pearson" page
      And I terminate the test
      Then I should see the "Debrief" page
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      When I select termination code "20 - Documents not produced"
      And I try to upload the test
      Then validation item "office-candidate-description-validation-text" should be "Describe the candidate"
      And validation item "office-candidate-description-validation-text" should be visible
      When I enter a candidate description
      And I upload the test
      Then I should see the "Journal" page