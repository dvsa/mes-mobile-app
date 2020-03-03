@catce @regression
Feature: A Driving Examiner Terminates a test in Category CE

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