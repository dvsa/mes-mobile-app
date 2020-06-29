@catk  @full_smoke @regression

Feature: Driver Examiner complete the pass journey for Home test cat K

  Background:
    Given I am logged in as "desexaminerbe" and I have a test for "Mr James Brown"
    When I view candidate details for "Mr James Brown"
    Then I should see the "Test details - Mr James Brown" page
    And I should see the "Test category" contains "Category K"
    And I should see the "Slot type" contains "Extended Test Special Needs"
    And I should see the "Special requirements" contains "- Candidate has dyslexia"
    When I close the candidate test details modal
    Then I should see the "Journal" page
    When I start the test for "Mr James Brown"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - James Brown" page
    When the candidate requests to receive results by post
    And I proceed to the bike

  Scenario: Driving Examiner completes a passed test for category K with wrong vehicle checks answers
    Given I should see the "James Brown" page
    And I select the Eyesight test result "Pass"
    And I enter the vehicle registration number "AB12CDE"
    And I select the "Vehicle checks - James Brown" page
      |H1 - Direction indicators |H15 - Tyre pressures |
      |false                     |false                |
    Then I continue to test report
    Then I should see the "Test report - James Brown" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - James Brown" page
    When I end the debrief
    Then I should see the "Test debrief - James Brown" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr James Brown" is "1"
