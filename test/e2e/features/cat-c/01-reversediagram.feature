@catc
Feature: Category C Reversing Digram

   Scenario: Examiner gets to the test report page and opens the reversing diagran
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