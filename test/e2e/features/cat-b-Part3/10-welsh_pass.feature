@catb @full_smoke @regression
Feature: Full Welsh end to end journey

   Scenario: Examiner completes a passed welsh test with no faults

      Given I am logged in as "desexaminerw" and I have a test for "Dr Lupe Buck"
      When I check candidate details for "Dr Lupe Buck"
      When I start the test for "Dr Lupe Buck"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Datganiad - Lupe Buck" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Lupe Buck" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Lupe Buck" page
      And I complete the test with controlled stop
      And I continue to debrief
      Then I should see the Debrief page with outcome "Wedi pasio"
      When I end the welsh debrief
      Then I should see the "Test debrief - Lupe Buck" page
      And I complete the pass details
      Then I should see the "Ôl-drafodaeth y prawf - Lupe Buck" page
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Dr Lupe Buck" is "1"
