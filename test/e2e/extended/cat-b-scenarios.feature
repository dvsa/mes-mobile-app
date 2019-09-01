Feature: Extended category B test scenarios

   Scenario: Examiner completes a passed test with driver faults
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
      And the test result for "Miss Florence Pearson" is "1"

   Scenario: Candidate fails a test with a single dangerous fault
      Given I am logged in as "mobexaminer1" and I have a test for "Mr Ali Campbell"
      When I check candidate details for "Mr Ali Campbell"
      And I start the test for "Mr Ali Campbell"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Ali Campbell" page
      And the candidate requests to receive results by post
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
      And the test result for "Mr Ali Campbell" is "2"

   Scenario: Candidate fails a test with a single serious fault
      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
      When I check candidate details for "Mrs Jane Doe"
      And I start the test for "Mrs Jane Doe"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Jane Doe" page
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
      And the test result for "Mrs Jane Doe" is "2"

   Scenario: Examiner terminates the test in the interests of public safety
      Given I am logged in as "mobexaminer1" and I have a test for "Mr James Brown"
      When I check candidate details for "Mr James Brown"
      And I start the test for "Mr James Brown"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - James Brown" page
      And the candidate enters a new email address
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
      And the test result for "Mr James Brown" is "4"

   Scenario: Candidate passes a test with 15 driver faults
      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
      When I check candidate details for "Mrs Jane Doe"
      And I start the test for "Mrs Jane Doe"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Jane Doe" page
      And the candidate enters a new email address
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
      And the test result for "Mrs Jane Doe" is "1"

   Scenario: Candidate fails a test with a dangerous and 16 driver faults
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Theresa Shaw"
      When I check candidate details for "Miss Theresa Shaw"
      And I start the test for "Miss Theresa Shaw"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Theresa Shaw" page
      And the candidate requests to receive results by post
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
      And I see a "driving" fault for "Use of mirrors - Signalling"
      And I see a "driving" fault for "Move off - Safety"
      And I see a "driving" fault for "Positioning - Lane discipline"
      And I see a "driving" fault for "Controls - Accelerator"
      And I see a "driving" fault for "Junctions - Approach speed"
      And I see a "driving" fault for "Signals - Timed"
      And I see a "driving" fault for "Clearance"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And there are "4" driver faults listed for "Use of mirrors - Signalling"
      And there are "3" driver faults listed for "Move off - Safety"
      And there are "3" driver faults listed for "Positioning - Lane discipline"
      And there are "2" driver faults listed for "Controls - Accelerator"
      And there are "2" driver faults listed for "Junctions - Approach speed"
      And there is "1" driver fault listed for "Signals - Timed"
      And there is "1" driver fault listed for "Clearance"
      And I complete the office write up
      And I enter a comment for "dangerous" fault "Use of speed"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Miss Theresa Shaw" is "2"

   Scenario: User can rekey a test pass for the previous day
      Given I am on the journal page as "mobexaminer1"
      When I navigate to previous day
      And I rekey a test for "Miss Doris Pearson"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Doris Pearson" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Doris Pearson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Doris Pearson" page
      When I add a "Undue hesitation" driver fault
      And I add a "Traffic lights" driver fault
      And I add a "Crossing" driver fault
      And I add a "Ancillary controls" driver fault
      And I add a "Gears" driver fault
      Then the driver fault count is "5"
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      And I see a "driving" fault for "Progress - Undue hesitation"
      And I see a "driving" fault for "Response to signs / signals - Traffic lights"
      And I see a "driving" fault for "Judgement - Crossing"
      And I see a "driving" fault for "Ancillary Controls"
      And I see a "driving" fault for "Controls - Gears"
      When I end the debrief
      Then I should see the "Test debrief - Doris Pearson" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      And there is "1" driver fault listed for "Progress - Undue hesitation"
      And there is "1" driver fault listed for "Response to signs / signals - Traffic lights"
      And there is "1" driver fault listed for "Judgement - Crossing"
      And there is "1" driver fault listed for "Ancillary Controls"
      And there is "1" driver fault listed for "Controls - Gears"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Miss Doris Pearson" is "1"

   Scenario: User can rekey a test fail for two days ago
      Given I am on the journal page as "mobexaminer1"
      When I navigate to previous day
      And I navigate to previous day
      And I rekey a test for "Mrs Carly Doe"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Carly Doe" page
      And I proceed to the car
      Then I should see the "Carly Doe" page
      And I complete the waiting room to car page with a tell me driver fault
      Then I should see the "Test report - Carly Doe" page
      When I add a "Turning right" driver fault
      And I add a "Cutting corners" serious fault
      And I add a "Following distance" driver fault
      Then the driver fault count is "3"
      When I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Unsuccessful"
      And I see a "serious" fault for "Junctions - Cutting corners"
      And I see a "driving" fault for "Junctions - Turning right"
      And I see a "driving" fault for "Following distance"
      And I see a "driving" fault for "Vehicle checks"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And there is "1" driver fault listed for "Junctions - Turning right"
      And there is "1" driver fault listed for "Following distance"
      And there is "1" driver fault listed for "Show Me/Tell Me"
      And I complete the office write up
      And I enter a comment for "serious" fault "Junctions - Cutting corners"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mrs Carly Doe" is "2"