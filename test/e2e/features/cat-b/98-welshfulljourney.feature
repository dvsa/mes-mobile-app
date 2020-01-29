@catb
Feature: Full Welsh end to end journey

   @welsh
   Scenario: Examiner completes a passed welsh test with no faults
      Given I am logged in as "mobexaminer1" and I have a test for "Captain Montague Smythe"
      When I check candidate details for "Captain Montague Smythe"
      When I start the test for "Captain Montague Smythe"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Datganiad - Montague Smythe" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Montague Smythe" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Montague Smythe" page
      And I complete the test with controlled stop
      And I continue to debrief
      Then I should see the Debrief page with outcome "Wedi pasio"
      When I end the welsh debrief
      Then I should see the "Test debrief - Montague Smythe" page
      And I complete the pass details 
      Then I should see the "Ôl-drafodaeth y prawf - Montague Smythe" page
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Captain Montague Smythe" is "1"

      @smoke
   Scenario: Examiner completes a failed test with various faults
      Given I am logged in as "mobexaminer1" and I have a test for "Captain Montague Smythe"
      When I check candidate details for "Captain Montague Smythe"
      And I start the test for "Captain Montague Smythe"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Datganiad - Montague Smythe" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Montague Smythe" page
      And I complete the waiting room to car page with a tell me driver fault
      Then I should see the "Test report - Montague Smythe" page
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

      # Existing driver fault should prevent a second fault from being added
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

      # Test that a driver fault cannot be added on competency with serious fault
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
      Then I should see the "Finalise outcome - Montague Smythe" page
      When I continue to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And there are "2" driver faults listed for "Move off - Safety"
      And there is "1" driver fault listed for "Controls - Accelerator"
      And there is "1" driver fault listed for "Reverse right - Control"
      And there is "1" driver fault listed for "Controlled Stop"
      And there is "1" driver fault listed for "Show Me/Tell Me"
      When I complete the office write up
      And I enter a comment for "dangerous" fault "Use of speed"
      And I enter a comment for "serious" fault "Controls - Accelerator"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Captain Montague Smythe" is "2"

    # WIP
   Scenario: Examiner terminates test as candidate failed eye sight test
      Given I am logged in as "mobexaminer1" and I have a test for "Mr James Brown"
      When I check candidate details for "Mr James Brown"
      And I start the test for "Mr James Brown"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Datganiad - James Brown" page
      And the candidate requests to receive results by post
      And I proceed to the car
      Then I should see the "James Brown" page
      And I fail the eye sight test
      Then I should see the Debrief page with outcome "Aflwyddiannus"
      And I see a "serious" fault for "Prawf Golwg"
      When I end the welsh debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - James Brown" page
      When I continue to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And the office activity code should be "3 - Fail due to eyesight"
      When I enter a candidate description
      And I complete the weather conditions
      And I enter a comment for "serious" fault "Eyesight Test"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr James Brown" is "3"