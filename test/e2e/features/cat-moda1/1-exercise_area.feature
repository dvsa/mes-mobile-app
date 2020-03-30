@cata1 @full_smoke @regression
Feature: A Driving Examiner Completes a pass test for category Mod A1

  Scenario: Examiner completes a passed test with no faults
    Given I am logged in as "desexaminera" and I have a test for "Mr Osborne Wolfe"
    When I start the test for "Mr Osborne Wolfe"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Osborne Wolfe" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Osborne Wolfe" page
    And I complete the waiting room to car page with confirmed cat type
    Then I should see the "Test report - Osborne Wolfe" page

