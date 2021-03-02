@catbe @full_smoke @regression
Feature: Cat B+E waiting room to car

   Scenario: adding five failures to the show me tell me marks the test as unsuccesfull

      Given I am logged in as "mobexaminer2" and I have a test for "Mr Dillon Jennings"
      When I check candidate details for "Mr Dillon Jennings"
      And I start the test for "Mr Dillon Jennings"
      And the candidate completes the declaration page
     And the candidate confirms their declaration
     Then I should see the "Declaration - Dillon Jennings" page
     And the candidate enters a new email address
     And I proceed to the car
      Then I should see the "Dillon Jennings" page
      And I complete the waiting room to car page with the following vehicle checks
         | show_me_1   | show_me_2   | show_me_3   | show_me_4   | show_me_5   |
         | true        | true        | true        | true        | true        |
      Then I should see the "Test report - Dillon Jennings" page
      And a serious fault is present along the driver fault count of "4"
