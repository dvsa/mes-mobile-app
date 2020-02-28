@catbe @full_smoke @regression
Feature: Autosave end to end failed journey for Category B+E

   Scenario: Examiner completes a failed test for autosave
   Given I am logged in as "mobexaminer2" and I have a test for "Mr Dillon Jennings"
   When I check candidate details for "Mr Dillon Jennings"
   And I start the test for "Mr Dillon Jennings"
   And the candidate completes the declaration page
   And the candidate confirms their declaration
   Then I should see the "Declaration - Dillon Jennings" page
   And the candidate enters a new email address
   And I proceed to the car
   Then I should see the "Dillon Jennings" page
   And I complete the waiting room to car page with the following vehicle checks
      | show_me_1   | show_me_2   | show_me_3   | show_me_4   | show_me_5   |
      | true        | true        | true        | false       | false       |   
   Then I should see the "Test report - Dillon Jennings" page
   And the driver fault count is "3"
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
   When I end the debrief
   Then I am on the post debrief holding page
   When I continue to the non pass finalisation page
   And I complete the fail details
   Then I am on the back to office page
   Then I return to the Journal Page
   And I should see the "Journal" page
   When I click the back button
   Then I should see the "My dashboard" page
   When I click search completed tests
   When I search for a completed test with the application reference of "22345622011"
   And the search result is clicked
   Then I should see the "Test information" page
   And the test result outcome is "Unsuccessful"
   And the test result has the following data present
      | label                             | value                    |
      | Application reference             | 22345622011              |
      | Vehicle registration number       | AB12CDE                  |
      | Test category                     | B+E                      |
      | Slot type                         | Standard Test            |
      | ETA                               | None                     |
      | Route number                      | None                     |
      | Physical description of candidate | None                     |
      | Weather conditions                | None                     |
   When I click the close button
   Then I should see the "Search submitted test" page
   When I click the back button on the search submitted test page
   Then I should see the "My dashboard" page
   When I click go to my Journal
   And I should see the "Journal" page
   Then I continue the write up for "Mr Dillon Jennings"
   Then I should see the "Office" page
   And the office page test outcome is "Unsuccessful"
   When I complete the office write up
   And I enter a comment for "serious" fault "Clearance"
   And I upload the test
   Then I should see the "Journal" page
   And the test result for "Mr Dillon Jennings" is "2"
