Feature: Practice mode

  Scenario: User can start marking practice test without a driver fault
    Given I am on the landing page as "mobexaminer1"
    When I start marking a practice test without a driving fault
    Then I should see the "Test report - Practice Mode" page
    And the driver fault count is "0"

  Scenario: User can start marking practice test with a driver fault
    Given I am on the landing page as "mobexaminer1"
    When I start marking a practice test with a driving fault
    Then I should see the "Test report - Practice Mode" page
    And the driver fault count is "1"
    And the competency "Show me / Tell me" driver fault count is "1"