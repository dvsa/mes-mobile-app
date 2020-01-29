@catb
Feature: Autosave end to end journey

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
      And the search result is clicked
      Then I should see the "Test information" page
      And the Test Details has the correct test information, "green", "1234567031", "B", "Standard Test"
      And the Defrief has the correct test information, "T5", " - Headlights & tail lights"
      When I click the close button
      Then I should see the "Search submitted test" page
      When I click the back button on the search submitted test page
      Then I should see the "My dashboard" page
      When I click go to my Journal
      And I should see the "Journal" page
      Then I continue the write up for "Miss Florence Pearson"
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Miss Florence Pearson" is "1"
    