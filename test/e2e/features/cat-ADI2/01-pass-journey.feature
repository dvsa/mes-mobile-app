@catADI2  @full_smoke @regression

Feature: Driver Examiner complete the pass journey for ADI2

  Scenario: Driving Examiner completes a passed test for category ADI2 with wrong vehicle checks answers

    Given I am logged in as "desexaminerbe" and I have a test for "miss Anna Firstlis"
    When I view candidate details for "miss Anna Firstlis"
    Then I should see the "Test details - miss Anna Firstlis" page
    And I should see the "Test category" contains "Category ADI2"
    And I should see the "Slot type" contains "Standard Test"
    And I should see the "Special requirements" contains "None"
    When I close the candidate test details modal
    Then I should see the "Journal" page
    When I start the test for "miss Anna Firstlis"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Anna Firstlis" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Anna Firstlis" page
    And I select the Eyesight test result "Pass"
    And I enter the vehicle registration number "AB12CDE"
    And I select the "Tell me questions - Anna Firstlis" page
      |T4 - Sufficient tread |T11 - Dipped to main beam |T13 - Engine coolant |
      |false                 |false                     |false                |
    And I select the Transmission Type "Manual"
    And I select the ordit trainer outcome "Pass"
    And I select the training records outcome "Pass"
    Then I continue to test report
    Then I should see the "Test report - Anna Firstlis" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Anna Firstlis" page
    When I end the debrief
    Then I should see the "Test debrief - Anna Firstlis" page
    And I complete the pass details
    And I should see the "Confirm test details - Anna Firstlis" page
    And I complete the Confirmation page
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "miss Anna Firstlis" is "1"

  Scenario: A Driving Examiner Completes a pass test for auto save

    Given I am on the "Journal" page
    And  I click the back button
    Then I should see the "My dashboard" page
    When I click search completed tests
    When I search for a completed test with the application reference of "22123400011"
    And the search result is clicked
    Then I should see the "Test information" page
    And the test result outcome is "Passed"
    And the test result has the following data present
      | label                             | value                                  |
      | Application reference             | 22123400011                            |
      | Test category                     | ADI2                                   |
      | Slot type                         | Standard Test                          |
      | ORDIT                             | Yes                                    |
      | Physical description of candidate | None                                   |
      | Weather conditions                | Bright / wet roads and Showers         |
    When I click the close button
    Then I should see the "Search submitted test" page
    When I click the back button on the search submitted test page
    Then I should see the "My dashboard" page

