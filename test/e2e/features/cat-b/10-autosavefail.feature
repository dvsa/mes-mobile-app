@catb
Feature: Autosave end to end failed journey

   @smoke
   Scenario: Examiner completes a failed test for autosave
    Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
    When I check candidate details for "Mrs Jane Doe"
    And I start the test for "Mrs Jane Doe"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Jane Doe" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Jane Doe" page
    And I complete the waiting room to car page with a tell me driver fault
    Then I should see the "Test report - Jane Doe" page
    And the driver fault count is "1"
    When I add a Show me / Tell me driver fault
    Then the driver fault count is "1"
    When I add a "Accelerator" driver fault
    Then the driver fault count is "2"
    And the competency "Accelerator" driver fault count is "1"
    When I add a "Safety" driver fault
    Then the driver fault count is "3"
    And the competency "Safety" driver fault count is "1"
    When I add a "Safety" driver fault
    Then the driver fault count is "4"
    And the competency "Safety" driver fault count is "2"
    When I add a "Lane discipline" driver fault
    Then the driver fault count is "5"
    And the competency "Lane discipline" driver fault count is "1"
    When I add a manoeuvre
    And I mark the manoeuvre as a "Control" driver fault
    Then the driver fault count is "6"
    When I click the manoeuvres button
    And I add a Controlled Stop driver fault
    Then the controlled stop requirement is ticked
    And I add a "Accelerator" serious fault
    Then the "Accelerator" button displays the serious badge
    When I add a "Use of speed" dangerous fault
    Then the "Use of speed" button displays the dangerous badge
    When I add a "Accelerator" driver fault
    Then the driver fault count is "7"
    When I add a "Approach speed" serious fault with a long press
    And I complete the test

    # When I end the test
    # And I continue to debrief
    # Then I should see the Debrief page with outcome "Unsuccessful"
    # When I end the debrief
    # Then I am on the post debrief holding page
    # When I continue to the non pass finalisation page
    # And I complete the fail details
    # Then I am on the back to office page
    # Then I return to the Journal Page
    # And I should see the "Journal" page
    # When I click the back button
    # Then I should see the "My dashboard" page
    # When I click search completed tests
    # When I search for a completed test with the application reference of "12345644019"
    # And the search result is clicked
    # Then I should see the "Test information" page
    # And the Test Details has the correct test information, "red", "12345644019", "B", "Standard Test"
    # And the Defrief has the correct test information, "T5", " - Headlights & tail lights"

