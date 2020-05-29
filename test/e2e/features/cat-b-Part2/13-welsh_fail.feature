@catb @full_smoke @regression
Feature: A Driving Examiner Completes An Failed Journey for Category B in Welsh

   Scenario: Examiner completes a failed test with various faults in Welsh
      Given I am logged in as "desexaminerw" and I have a test for "Mr Bright Wilson"
      When I check candidate details for "Mr Bright Wilson"
      And I start the test for "Mr Bright Wilson"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Datganiad - Bright Wilson" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Bright Wilson" page
      And I complete the waiting room to car page with a tell me driver fault
      Then I should see the "Test report - Bright Wilson" page
      And the driver fault count is "1"
      When I end the test
      Then the legal requirements pop up is present
      And the required test observation is present "NS (normal start)"
      And the required test observation is present "NS (normal start)"
      And the required test observation is present "AS (angled start)"
      And the required test observation is present "HS / DS (hill or designated start)"
      And the required test observation is present "Manoeuvres"
      And the required test observation is present "Show me / Tell me"
      And the required test observation is present "Eco (control and planning)"
      Then I return to the test report page
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
      And the driver fault count is "7"
      When I add an ETA with type "Physical"
      And I complete the test
      Then the ETA invalid modal is shown
      When I close the ETA modal
      And I add a "Accelerator" serious fault
      Then the "Accelerator" button displays the serious badge
      When I add a "Use of speed" dangerous fault
      Then the "Use of speed" button displays the dangerous badge
      When I add a "Accelerator" driver fault
      Then the driver fault count is "7"
      When I add a "Approach speed" serious fault with a long press
      Then the "Approach speed" button displays the serious badge
      When I remove a serious fault for "Approach speed" with a tap
      Then the "Approach speed" button does not display the serious badge
      When I add a "Safety" driver fault
      And I remove a driver fault for "Safety" with a long press
      Then the driver fault count is "7"
      When I remove a driver fault for "Lane discipline" with a tap
      Then the competency "Lane discipline" driver fault count is not displayed
      And the driver fault count is "6"
      When I add a "Approach speed" serious fault
      And I remove a serious fault for "Approach speed" with a tap
      Then the "Approach speed" button does not display the serious badge
      When I end the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Aflwyddiannus"
      And I see a "dangerous" fault for "Defnyddio cyflymder"
      And I see a "serious" fault for "Rheolaeth - sbardun"
      And I see a "driving" fault for "Symud i ffwrdd - diogelwch"
      And I see a "driving" fault for "Rheolaeth - sbardun"
      And I see a "driving" fault for "Bacio i’r dde - dan reolaeth"
      And I see a "driving" fault for "Stopio dan Reolaeth"
      And I see a "driving" fault for "Gwirio’r cerbyd"
      When I end the welsh debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Bright Wilson" page
      When I continue to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And there are "2" driver faults listed for "Move Away - Safety"
      And there is "1" driver fault listed for "Control - Accelerator"
      And there is "1" driver fault listed for "Reverse right - Control"
      And there is "1" driver fault listed for "Controlled Stop"
      And there is "1" driver fault listed for "Show Me/Tell Me"
      When I complete the office write up
      And I enter a comment for "dangerous" fault "Use of speed"
      And I enter a comment for "serious" fault "Control - Accelerator"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Bright Wilson" is "2"
