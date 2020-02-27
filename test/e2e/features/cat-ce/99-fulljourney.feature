@catce
Feature: Full end to end journey for Category C+E

   Scenario: Examiner completes a passed test with no faults
      Given I am logged in as "mobexaminer5" and I have a test for "Mr Right Ford"
      When I start the test for "Mr Right Ford"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Right Ford" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Right Ford" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Right Ford" page
      When I open the reversing diagram
      Then I should see the reversing diagram modal
      And I close the reversing diagram modal
      Then I close the revresing diagram drop down
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Right Ford" page
      And  I select the code 78 option
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Right Ford" is "1"

   Scenario: Examiner terminates a test on the test report due to mechanical failure
      Given I am logged in as "desexaminerce" and I have a test for "Mr Bright Wilson"
      When I check candidate details for "Mr Bright Wilson"
      And I start the test for "Mr Bright Wilson"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Bright Wilson" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Bright Wilson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Bright Wilson" page
      When I terminate the test from the test report page
      Then I should see the Debrief page with outcome "Terminated"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome C - Bright Wilson" page
      When I select activity code "11 - Mechanical failure"
      Then the transmission is selected
      And I continue to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Terminated"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Bright Wilson" is "11"