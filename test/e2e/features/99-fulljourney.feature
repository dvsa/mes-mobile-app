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
