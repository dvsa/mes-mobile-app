@catb
Feature: Full end to end journey

   @smoke
   Scenario: Examiner completes a passed test with no faults
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
      When I start the test for "Miss Florence Pearson"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Florence Pearson" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Florence Pearson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Florence Pearson" page
      And I complete the test with controlled stop
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Florence Pearson" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Miss Florence Pearson" is "1"

   @smoke
   Scenario: Examiner completes a failed test with various faults
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
      When I end the test
      Then the legal requirements pop up is present
      And all the required test observations are present "NS (normal start)"
      And all the required test observations are present "NS (normal start)"
      And all the required test observations are present "AS (angled start)"
      And all the required test observations are present "HS / DS (hill or designated start)"
      And all the required test observations are present "Manoeuvres"
      And all the required test observations are present "Show me / Tell me"
      And all the required test observations are present "Eco (control and planning)"
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
      Then I should see the Debrief page with outcome "Unsuccessful"
      And I see a "dangerous" fault for "Use of speed"
      And I see a "serious" fault for "Controls - Accelerator"
      And I see a "driving" fault for "Move off - Safety"
      And I see a "driving" fault for "Controls - Accelerator"
      And I see a "driving" fault for "Reverse right - Control"
      And I see a "driving" fault for "Controlled stop"
      And I see a "driving" fault for "Vehicle checks"

      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Jane Doe" page
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
      And the test result for "Mrs Jane Doe" is "2"

   @smoke
   Scenario: Examiner terminates test as candidate failed to attend (No mandatory office fields)
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Theresa Shaw"
      When I check candidate details for "Miss Theresa Shaw"
      And I start the test for "Miss Theresa Shaw"
      Then I should see the "Declaration - Theresa Shaw" page
      And I terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Theresa Shaw" page
      When I select activity code "51 - Candidate failed to attend at test centre"
      And I click continue to proceed to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Terminated"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Miss Theresa Shaw" is "51"

   Scenario: Examiner terminates test as candidate failed to present ID (Only physical description mandatory)
      Given I am logged in as "mobexaminer1" and I have a test for "Mr Ali Campbell"
      When I check candidate details for "Mr Ali Campbell"
      And I start the test for "Mr Ali Campbell"
      Then I should see the "Declaration - Ali Campbell" page
      And I terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Ali Campbell" page
      When I select activity code "20 - Documents not produced"
      And I click continue to proceed to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Terminated"
      And I try to upload the test
      Then validation item "office-candidate-description-validation-text" should be "Describe the candidate"
      And validation item "office-candidate-description-validation-text" should be visible
      When I enter a candidate description
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Ali Campbell" is "20"

   Scenario: Examiner terminates test as candidate failed eye sight test
      Given I am logged in as "mobexaminer1" and I have a test for "Mr James Brown"
      When I check candidate details for "Mr James Brown"
      And I start the test for "Mr James Brown"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - James Brown" page
      And the candidate requests to receive results by post
      And I proceed to the car
      Then I should see the "James Brown" page
      And I fail the eye sight test
      Then I should see the Debrief page with outcome "Unsuccessful"
      When I end the debrief
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

   Scenario: Candidate fails a test with 16 driver faults
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
      When I start the test for "Miss Florence Pearson"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Florence Pearson" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Florence Pearson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Florence Pearson" page
      When I add a "Accelerator" driver fault
      And I add a "Safety" driver fault
      And I add a "Safety" driver fault
      And I add a "Lane discipline" driver fault
      And I add a "Accelerator" driver fault
      And I add a "Safety" driver fault
      And I add a "Lane discipline" driver fault
      And I add a "Lane discipline" driver fault
      And I add a "Approach speed" driver fault
      And I add a "Approach speed" driver fault
      And I add a "Signalling" driver fault
      And I add a "Timed" driver fault
      And I add a "Clearance" driver fault
      And I add a "Signalling" driver fault
      And I add a "Signalling" driver fault
      And I add a "Signalling" driver fault
      Then the driver fault count is "16"
      When I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Unsuccessful"
      And I see a "driving" fault for "Use of mirrors - Signalling"
      And I see a "driving" fault for "Move off - Safety"
      And I see a "driving" fault for "Positioning - Lane discipline"
      And I see a "driving" fault for "Controls - Accelerator"
      And I see a "driving" fault for "Junctions - Approach speed"
      And I see a "driving" fault for "Signals - Timed"
      And I see a "driving" fault for "Clearance"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Florence Pearson" page
      When I continue to the back to office page
      And I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And I complete the office write up
      And I enter a comment for "driving" fault "Use of mirrors - Signalling"
      And I enter a comment for "driving" fault "Move off - Safety"
      And I enter a comment for "driving" fault "Positioning - Lane discipline"
      And I enter a comment for "driving" fault "Controls - Accelerator"
      And I enter a comment for "driving" fault "Junctions - Approach speed"
      And I enter a comment for "driving" fault "Signals - Timed"
      And I enter a comment for "driving" fault "Clearance"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Miss Florence Pearson" is "2"