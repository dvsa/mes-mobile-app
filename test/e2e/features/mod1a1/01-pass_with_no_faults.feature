@cata1
Feature: A Driving Examiner Completes a pass test for category a1

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
    And I complete the test with controlled stop
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    When I end the debrief
    Then I should see the "Test debrief - Osborne Wolfe" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Osborne Wolfe" is "1"
