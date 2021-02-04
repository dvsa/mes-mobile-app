@catcpc @full_smoke @regression

Feature: A Driving Examiner Rekeys Category cpc tests

  Scenario: User can rekey a test pass for the previous day

    Given I am logged in as "desexaminerbe" and I have a test for "Miss Jean Shorts"
    When I navigate to 1 day previously
    And I rekey a test for "Miss Jean Shorts"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Jean Shorts" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Jean Shorts" page
    And I enter the vehicle registration number "SG54BN"
    And I select the vehicle details
    And I select the Combination options "LGV4 - LSDT & Fire ex"
    Then I continue to test report
    Then I should see the "Test report - Jean Shorts" page
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    And I select CPC module assessment question "3"
    And I select CPC module assessment question "4"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    And I select CPC module assessment question "3"
    And I select CPC module assessment question "4"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    And I select CPC module assessment question "3"
    And I select CPC module assessment question "4"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    And I select CPC module assessment question "3"
    And I select CPC module assessment question "4"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    And I select CPC module assessment question "3"
    And I select CPC module assessment question "4"
    And I select CPC module assessment question "5"
    And I select CPC module assessment question "6"
    And I select CPC module assessment question "7"
    And I select CPC module assessment question "8"
    When I click on View Test Summary button
    And I continue to debrief
    Then I should see the "Debrief - Jean Shorts" page
    And I should see the Debrief page with outcome "Passed"
    When I end the debrief
    Then I should see the "Test debrief - Jean Shorts" page
    And I complete the pass details
    And I complete the health declaration
    And I continue to the office write up
    When I complete the office write up
    And I complete the rekey
    Then the rekey is successfully uploaded
    And I return to the journal
    Then I should see the "Journal" page
    And the test result for "Miss Jean Shorts" is "1"
