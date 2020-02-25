@catc1
Feature: Full end to end journey for Category C1

   Scenario: Examiner completes a passed test with no faults
      Given I am logged in as "mobexaminer5" and I have a test for "Ms Deanna Wolf"
      When I start the test for "Ms Deanna Wolf"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Deanna Wolf" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Deanna Wolf" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Deanna Wolf" page
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Deanna Wolf" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Ms Deanna Wolf" is "1"

   Scenario: Examiner completes a failed test with various faults
      Given I am logged in as "desexaminerc1" and I have a test for "Mr Bright Wilson"
      When I check candidate details for "Mr Bright Wilson"
      And I start the test for "Mr Bright Wilson"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Bright Wilson" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Bright Wilson" page
      And I complete the waiting room to car page with the following vehicle checks
        | show_me_1   | show_me_2   | show_me_3   | show_me_4   | show_me_5   |
        | true        | true        | true        | false       | false       |   
      Then I should see the "Test report - Bright Wilson" page
      And the driver fault count is "3"
      When I end the test
      Then the legal requirements pop up is present
      And the required test observation is present "NS (normal start)"
      And the required test observation is present "UH (uphill start)"
      And the required test observation is present "AS/CS (angled start/ controlled stop)"
      And the required test observation is present "Manoeuvres"
      And the required test observation is present "Eco (control and planning)"
      Then I return to the test report page
      And I should see the "Test report - Bright Wilson" page
      And I enter the legal requirements
      When I add a "Timed" driver fault
      And the driver fault count is "4"
      When I add a "Correctly" driver fault
      And the driver fault count is "5"
      When I add a "Safety" driver fault
      And the driver fault count is "6"
      When I add a "Control" serious fault with a long press
      Then the "Control" button displays the serious badge
      When I end the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Unsuccessful"
      And I see a "serious" fault for "Move off - Control"
      And I see a "driving" fault for "Signals - Timed"
      And I see a "driving" fault for "Signals - Correctly"
      And I see a "driving" fault for "Move off - Safety"
      And I see a "driving" fault for "Vehicle checks"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      And I complete the fail details
      And I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      When I complete the office write up
      And I enter a comment for "serious" fault "Move off - Control"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Bright Wilson" is "2"
