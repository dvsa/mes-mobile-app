@catmod1 @full_smoke @regression
Feature: A Driving Examiner Completes a pass test for category Mod A1

  Scenario: Examiner completes a passed test with no faults
    Given I am logged in as "desexaminera" and I have a test for "Ms Alisa Garza"
    When I start the test for "Ms Alisa Garza"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Alisa Garza" page
    And I proceed to the car
    Then I should see the "Alisa Garza" page
    And I click on the "Select cat type.." button

#    Then I should see the "Alisa Garza" page
#    And I click on the "Manual" button
#    And I click on the "Vehicle registration number" button
#    And I click on the "Supervisor" button
#    And I click on the "School bike" button
#    Then I should see the "Test report - Alisa Garza" page
#    And I complete the test with controlled stop
#    And I continue to debrief
#    Then I should see the Debrief page with outcome "Passed"
#    When I end the debrief
#    Then I should see the "Test debrief - Alisa Garza" page
#    And I complete the pass details
#    And I complete the health declaration
#    Then I am on the back to office page
#    And I continue to the office write up
#    Then I should see the "Office" page
#    And the office page test outcome is "Passed"
#    When I complete the office write up
#    And I upload the test
#    Then I should see the "Journal" page
#    And the test result for "Ms Alisa Garza" is "1"
