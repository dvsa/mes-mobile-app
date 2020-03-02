Feature: Late start

  Scenario: completes a passed test which is late
    Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
    When I start the test late for "Miss Florence Pearson"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Florence Pearson" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Florence Pearson" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Florence Pearson" page
    And I complete the test with controlled stop
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    When I end the debrief
    Then I should see the "Test debrief - Florence Pearson" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Miss Florence Pearson" is "1"

