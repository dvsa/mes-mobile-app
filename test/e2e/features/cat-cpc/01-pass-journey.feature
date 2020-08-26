@catcpc @full_smoke @regression

Feature: Driver Examiner complete the pass journey for CPC

  Scenario: Driving Examiner completes a passed test for category CCPC

    Given I am logged in as "desexaminerbe" and I have a test for "Miss Jennifer Aniston"
    When I view candidate details for "Miss Jennifer Aniston"
    Then I should see the "Test details - Miss Jennifer Aniston" page
    And I should see the "Test category" contains "Category CCPC"
    And I should see the "Slot type" contains "Standard Test"
    And I should see the "Special requirements" contains "None"
    When I close the candidate test details modal
    Then I should see the "Journal" page
    When I start the test for "Miss Jennifer Aniston"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Jennifer Aniston" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Jennifer Aniston" page
    And I enter the vehicle registration number "SG54BN"
    And I select the vehicle details
    And I select the Combination options "LGV4 - LSDT & Fire ex"
    Then I continue to test report
    Then I should see the "Test report - Jennifer Aniston" page
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
    Then I should see the "Debrief - Jennifer Aniston" page
    And I should see the Debrief page with outcome "Passed"
    When I end the debrief
    Then I should see the "Test debrief - Jennifer Aniston" page
    And I complete the pass details
    And I complete the health declaration
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Miss Jennifer Aniston" is "1"

  Scenario: Driving Examiner completes a passed test for category DCPC

    Given I am logged in as "desexaminerbe" and I have a test for "Mr Johny Bravo"
    When I view candidate details for "Mr Johny Bravo"
    Then I should see the "Test details - Mr Johny Bravo" page
    And I should see the "Test category" contains "Category DCPC"
    And I should see the "Slot type" contains "Standard Test"
    And I should see the "Special requirements" contains "None"
    When I close the candidate test details modal
    Then I should see the "Journal" page
    When I start the test for "Mr Johny Bravo"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Johny Bravo" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Johny Bravo" page
    And I enter the vehicle registration number "SG54BN"
    And I select the Combination options "LGV4 - LSDT & Fire ex"
    Then I continue to test report
    Then I should see the "Test report - Johny Bravo" page
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
    Then I should see the "Debrief - Johny Bravo" page
    And I should see the Debrief page with outcome "Passed"
    When I end the debrief
    Then I should see the "Test debrief - Johny Bravo" page
    And I complete the pass details
    And I complete the health declaration
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Johny Bravo" is "1"


  Scenario: A Driving Examiner Completes a pass test for autosave

    Given I am on the "Journal" page
    And  I click the back button
    Then I should see the "My dashboard" page
    When I click search completed tests
    When I search for a completed test with the application reference of "22123466011"
    And the search result is clicked
    Then I should see the "Test information" page
    And the test result outcome is "Passed"
    And the test result has the following data present
      | label                             | value                                  |
      | Application reference             | 22123466011                            |
      | Test category                     | CCPC                                   |
      | Slot type                         | Standard Test                          |
      | Vehicle details                   | Rigid                                  |
      | Certificate number                | A123456X                               |
    And I should see the "Test information" page
    When I click the close button
    Then I should see the "Search submitted test" page
    When I click the back button on the search submitted test page
    Then I should see the "My dashboard" page


