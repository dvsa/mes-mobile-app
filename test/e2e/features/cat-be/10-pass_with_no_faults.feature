@catbe @full_smoke @regression
Feature: Driving Exmainer Completes a Pass Journey With no Faults for Category B+E

   Scenario: Examiner completes a passed test with no faults
      Given I am logged in as "mobexaminer2" and I have a test for "Mr Callahan Eaton"
      When I check candidate details for "Mr Callahan Eaton"
      And I start the test for "Mr Callahan Eaton"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Callahan Eaton" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Callahan Eaton" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Callahan Eaton" page
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      And I should see the "Debrief - Callahan Eaton" page
      When I end the debrief
      Then I should see the "Test debrief - Callahan Eaton" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Callahan Eaton" is "1"
