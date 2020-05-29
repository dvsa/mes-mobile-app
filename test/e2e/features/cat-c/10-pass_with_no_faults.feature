@catc @full_smoke @regression
Feature: A Driving Examiner Completes a Passed User Journey in Category C

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
      Then I close the reversing diagram drop down
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Right Ford" page
      And  I select the code 78 no option
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
