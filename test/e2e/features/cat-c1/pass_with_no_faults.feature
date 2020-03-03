@catc1 @regression
Feature: A Driving Examiner Completes a Passed User Journey in Category C1

   Scenario: Examiner completes a passed test with no faults
      Given I am logged in as "mobexaminer5" and I have a test for "Ms Deanna Wolf"
      When I start the test for "Ms Deanna Wolf"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Deanna Wolf" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Deanna Wolf" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Deanna Wolf" page
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Deanna Wolf" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Ms Deanna Wolf" is "1"
   