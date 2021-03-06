@catcpc @full_smoke @regression

Feature: Driver Examiner terminate CPC journey

  Scenario: Driving Examiner terminate the test for category CCPC

    Given I am logged in as "desexaminerbe" and I have a test for "Mr Steve Auston"
    When I view candidate details for "Mr Steve Auston"
    Then I should see the "Test details - Mr Steve Auston" page
    And I should see the "Test category" contains "Category CCPC"
    And I should see the "Slot type" contains "Special Needs Extra Time"
    And I should see the "Special requirements" contains "None"
    When I close the candidate test details modal
    Then I should see the "Journal" page
    When I start the test for "Mr Steve Auston"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Steve Auston" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Steve Auston" page
    And I enter the vehicle registration number "SG54BN"
    And I select the vehicle details
    And I select the Combination options "LGV4 - LSDT & Fire ex"
    Then I continue to test report
    Then I should see the "Test report - Steve Auston" page
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    And I select CPC module assessment question "3"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    And I select CPC module assessment question "3"
    When I click on Next Question button
    And I select CPC module assessment question "1"
    And I select CPC module assessment question "2"
    And I select CPC module assessment question "3"
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
    And I terminate the test
    Then I should see the Debrief page with outcome "Terminated"
    And I should see the "Debrief - Steve Auston" page
    When I end the debrief
    And I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Steve Auston" page
    When I select activity code "20 - Documents not produced"
    And I continue to the back to office page
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    Then the office page test outcome is "Terminated"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Steve Auston" is "20"
