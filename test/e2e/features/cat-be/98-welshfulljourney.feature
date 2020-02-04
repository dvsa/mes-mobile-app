@catbe
Feature: Full Welsh end to end journey

   @welsh 
  Scenario: Examiner completes a failed test with various faults
      Given I am logged in as "mobexaminer2" and I have a test for "Mr Dillon Jennings"
      When I check candidate details for "Mr Dillon Jennings"
      And I start the test for "Mr Dillon Jennings"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Datganiad - Dillon Jennings" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Dillon Jennings" page
      And I complete the waiting room to car page with the following vehicle checks
        | show_me_1   | show_me_2   | show_me_3   | show_me_4   | show_me_5   |
        | true        | true        | true        | false       | false       |   
      Then I should see the "Test report - Dillon Jennings" page
      And the driver fault count is "3"
      When I end the test
      Then the legal requirements pop up is present
      And the required test observation is present "NS (normal start)"
      And the required test observation is present "UH (uphill start)"
      And the required test observation is present "AS/CS (angled start/ controlled stop)"
      And the required test observation is present "Manoeuvres"
      And the required test observation is present "Eco (control and planning)"
      And the required test observation is present "Uncouple / Recouple"
      Then I return to the test report page
      And I should see the "Test report - Dillon Jennings" page
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
      Then I should see the Debrief page with outcome "Aflwyddiannus"
      And I see a "serious" fault for "Clirio"
      And I see a "driving" fault for "Signalau - amseru"
      And I see a "driving" fault for "Signalau - yn gywir"
      And I see a "driving" fault for "Symud i ffwrdd - diogelwch"
      And I see a "driving" fault for "Dadfachu / Ailfachu"
      And I see a "driving" fault for "Gwirio’r cerbyd"
      When I end the welsh debrief
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
      And the test result for "Mr Dillon Jennings" is "2"