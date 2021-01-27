@catHome @full_smoke @regression

Feature: Driver Examiner complete the pass journey for Home test H

  Scenario: Driving Examiner completes a passed test for category H with wrong vehicle checks answers

    Given I am logged in as "desexaminerbe" and I have a test for "Miss Florence Pearson"
    When I start the test for "Miss Florence Pearson"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Florence Pearson" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Florence Pearson" page
    And I select the Eyesight test result "Pass"
    And I enter the vehicle registration number "AB12CDE"
    And I select the "Vehicle checks - Florence Pearson" page
      |H1 - Direction indicators |H15 - Tyre pressures |
      |false                     |false                |
    Then I continue to test report
    Then I should see the "Test report - Florence Pearson" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Florence Pearson" page
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
    And the test result for "Florence Pearson" is "1"

