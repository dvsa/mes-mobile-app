Feature: Extended category B test scenarios

   Scenario: Examiner completes a passed test with driver faults
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
      When I start the test for "Miss Florence Pearson"
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Florence Pearson" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Florence Pearson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Florence Pearson" page
      When I add a "Accelerator" driver fault
      And I add a "Timed" driver fault
      And I add a "Clearance" driver fault
      And I add a "Signalling" driver fault
      And I add a "Timed" driver fault
      Then the driver fault count is "5"
      And I complete the test
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
      And there are "2" driver faults listed for "Signals - Timed"
      And there is "1" driver fault listed for "Controls - Accelerator"
      And there is "1" driver fault listed for "Clearance"
      And there is "1" driver fault listed for "Use of mirrors - Signalling"
      And I complete the office write up
      And I upload the test
      Then I should see the "Journal" page

   Scenario: Candidate fails a test with a single dangerous fault
      Given I am logged in as "mobexaminer1" and I have a test for "Mr Ali Campbell"
      When I start the test for "Mr Ali Campbell"
      And the candidate requests to receive results by post
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Ali Campbell" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Ali Campbell" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Ali Campbell" page
      When I add a "Use of speed" dangerous fault
      And I add a "Safety" driver fault
      And I add a "Lane discipline" driver fault
      When I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Unsuccessful"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And I complete the office write up
      And I enter a comment for "dangerous" fault "Use of speed"
      And I upload the test
      Then I should see the "Journal" page

   Scenario: Candidate fails a test with a single serious fault
      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
      When I start the test for "Mrs Jane Doe"
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Jane Doe" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Jane Doe" page
      And I complete the waiting room to car page with a tell me driver fault
      Then I should see the "Test report - Jane Doe" page
      When I add a "Accelerator" serious fault
      When I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Unsuccessful"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And I complete the office write up
      And I enter a comment for "serious" fault "Controls - Accelerator"
      And I upload the test
      Then I should see the "Journal" page

   Scenario: Examiner terminates the test in the interests of public safety
      Given I am logged in as "mobexaminer1" and I have a test for "Mr James Brown"
      When I start the test for "Mr James Brown"
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      Then I should see the "Declaration - James Brown" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "James Brown" page
      And I complete the waiting room to car page
      Then I should see the "Test report - James Brown" page
      When I add a "Use of speed" dangerous fault
      And I end and terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      And I see a "dangerous" fault for "Use of speed"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Terminated"
      When I select activity code "4 - Fail in the interests of public safety"
      Then the office page test outcome is "Unsuccessful"
      When I complete the office write up with Not applicable to independent driving and show me question
      And I enter a comment for "dangerous" fault "Use of speed"
      And I upload the test
      Then I should see the "Journal" page

   Scenario: Candidate passes a test with 15 driver faults
      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
      When I start the test for "Mrs Jane Doe"
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Jane Doe" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Jane Doe" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Jane Doe" page
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
      Then the driver fault count is "15"
      When I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      And I see a "driving" fault for "Use of mirrors - Signalling"
      And I see a "driving" fault for "Move off - Safety"
      And I see a "driving" fault for "Positioning - Lane discipline"
      And I see a "driving" fault for "Controls - Accelerator"
      And I see a "driving" fault for "Junctions - Approach speed"
      And I see a "driving" fault for "Signals - Timed"
      And I see a "driving" fault for "Clearance"
      When I end the debrief
      Then I should see the "Test debrief - Jane Doe" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      And there are "3" driver faults listed for "Move off - Safety"
      And there are "3" driver faults listed for "Positioning - Lane discipline"
      And there are "3" driver faults listed for "Use of mirrors - Signalling"
      And there are "2" driver faults listed for "Controls - Accelerator"
      And there are "2" driver faults listed for "Junctions - Approach speed"
      And there is "1" driver fault listed for "Signals - Timed"
      And there is "1" driver fault listed for "Clearance"
      And I complete the office write up
      And I upload the test
      Then I should see the "Journal" page

   # This will fail until MES-2673 is fixed
   Scenario: Candidate fails a test with a dangerous and 16 driver faults
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Theresa Shaw"
      When I start the test for "Miss Theresa Shaw"
      Then I should see the "Declaration - Theresa Shaw" page
      And the candidate requests to receive results by post
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Theresa Shaw" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Theresa Shaw" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Theresa Shaw" page
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
      And I add a "Use of speed" dangerous fault
      Then the driver fault count is "16"
      When I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Unsuccessful"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And I complete the office write up
      And I enter a comment for "dangerous" fault "Use of speed"
      And I upload the test
      Then I should see the "Journal" page