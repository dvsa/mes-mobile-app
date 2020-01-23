@catb
Feature: Autosave end to end journey

   @smoke
   Scenario: Examiner completes a passed test for autosave
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
      When I start the test for "Miss Florence Pearson"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Florence Pearson" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Florence Pearson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Florence Pearson" page
      And I complete the test with controlled stop
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Florence Pearson" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      Then I return to the Journal Page
      And I should see the "Journal" page
      When I click the back button
      Then I should see the "My dashboard" page
      When I click search completed tests
      When I search for a completed test with the application reference of "1234567031"

   
     
