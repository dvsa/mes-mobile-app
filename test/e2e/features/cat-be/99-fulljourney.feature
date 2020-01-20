@catbe
Feature: Full end to end journey for Cat B+E

   @smoke
   Scenario: Examiner completes a passed test with no faults
      Given I am logged in as "mobexaminer2" and I have a test for "Mr Callahan Eaton"
      When I check candidate details for "Mr Callahan Eaton"
      And I start the test for "Mr Callahan Eaton"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Callahan Eaton" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Callahan Eaton" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Callahan Eaton" page
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Callahan Eaton" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Callahan Eaton" is "1"

   Scenario Outline: Examiner completes a failed test with various faults
      Given I am logged in as "mobexaminer2" and I have a test for "Mr Dixon Clayton"
      When I check candidate details for "Mr Dixon Clayton"
         And I start the test for "Mr Dixon Clayton"
         And the candidate completes the declaration page
         And the candidate confirms their declaration
      Then I should see the "Declaration - Dixon Clayton" page
         And the candidate enters a new email address
         And I proceed to the car
      Then I should see the "Dixon Clayton" page
         And I complete the waiting room to car page with a tell me driver fault
      Then I should see the "Test report - Dixon Clayton" page
         And the driver fault count is "3"
      When I end the test
      Then the legal requirements pop up is present
         And all the required test observations are present "NS (normal start)"
         And all the required test observations are present "UH (uphill start)"
         And all the required test observations are present "AS/CS (angled start/ controlled stop)"
         And all the required test observations are present "Manoeuvres"
         And all the required test observations are present "Eco (control and planning)"
         And all the required test observations are present "Uncouple / Recouple"
      Then I return to the test report page
         And I should see the "Test report - Dixon Clayton" page
         And I enter the legal requirements
      When I add a "Timed" driver fault
         And the driver fault count is "4"
      When I add a "Correctly" driver fault
         And the driver fault count is "5"
      When I add a "Safety" driver fault
         And the driver fault count is "6"
      When I add the Uncouple and Recouple fault
         And the driver fault count is "7"
      When I add a "Clearance" serious fault with a long press
      Then the "Clearance" button displays the serious badge
      When I end the test
         And I continue to debrief
      Then I should see the Debrief page with outcome "Unsuccessful"
         And I see a "serious" fault for "Clearance"
         And I see a "driving" fault for "Signals - Timed"
         And I see a "driving" fault for "Signals - Correctly"
         And I see a "driving" fault for "Move off - Safety"
         And I see a "driving" fault for "Uncouple / Recouple"
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
         And I enter a comment for "serious" fault "Clearance"
         And I upload the test
      Then I should see the "Journal" page

      Examples: show me and tell me questions
         | first_show_me              | second_show_me     | third_show_me | first_tell_me | second_tell_me                     |
         | S01 - Direction indicators | S02 - Doors secure | S03 - Horn    | T01 - Brakes  | T02 - Safety factors while loading |
