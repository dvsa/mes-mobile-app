@catcpc @full_smoke @regression

Feature: Driver Examiner fail the CPC journey

  Scenario: Driving Examiner fail the test for category CCPC

    Given I am logged in as "desexaminerbe" and I have a test for "Mrs Ken Doe"
    When I view candidate details for "Mrs Ken Doe"
    Then I should see the "Test details - Mrs Ken Doe" page
    And I should see the "Test category" contains "Category CCPC"
    And I should see the "Slot type" contains "Standard Test"
    And I should see the "Special requirements" contains "- Candidate has dyslexia"
    When I close the candidate test details modal
    Then I should see the "Journal" page
    When I start the test for "Mrs Ken Doe"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Ken Doe" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Ken Doe" page
    And I enter the vehicle registration number "SG54BN"
    And I select the vehicle details
    And I select the Combination options "LGV4 - LSDT & Fire ex"
    Then I continue to test report
    Then I should see the "Test report - Ken Doe" page
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    And I select CPC module assessment question "3"
    And I select CPC module assessment question "4"
    When I click on View Test Summary button
    And I continue to debrief
    Then I should see the "Debrief - Ken Doe" page
    And I should see the Debrief page with outcome "Unsuccessful"
    And I end the debrief
    When I continue to the non pass finalisation page
    And I should see the "Finalise outcome - Ken Doe" page
    And I continue to the back to office page
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And  the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter assessment report description
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mrs Ken Doe" is "2"
