@catd

  Feature: Driver Examiner failed the test journy for category D

Scenario: Examiner completes a passed test with no faults
  Given I am logged in as "desexaminerd" and I have a test for "Mr Right Ford"
  When I start the test for "Mr Right Ford"
  And the candidate completes the declaration page
  And the candidate confirms their declaration
  Then I should see the "Declaration - Right Ford" page
  And the candidate enters a new email address
  And I proceed to the car
  Then I should see the "Right Ford" page
  And I complete the waiting room to car page
  Then I should see the "Test report - Right Ford" page
  When I open the reversing diagram
  Then I should see the reversing diagram modal
  And I close the reversing diagram modal
  Then I close the reversing diagram drop down
  And I complete the test with controlled stop
  And I add a "PCV Exercise" driver fault
  And the driver fault count is "1"
#  And I complete the test with controlled stop
  When I add a "Accelerator" driver fault
  And the driver fault count is "2"
  When I add a "Correctly" driver fault
  And the driver fault count is "5"
  When I add a "Safety" driver fault
  And the driver fault count is "6"
  When I add a "Control" serious fault with a long press
  Then the "Control" button displays the serious badge
  When I end the test
  And I continue to debrief
  Then I should see the Debrief page with outcome "Unsuccessful"
  And I see a "serious" fault for "Move Away - Control"
  And I see a "driving" fault for "Signals - Timed"
  And I see a "driving" fault for "Signals - Correctly"
  And I see a "driving" fault for "Move Away - Safety"
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
  And I enter a comment for "serious" fault "Move Away - Control"
  And I upload the test
  Then I should see the "Journal" page
  And the test result for "Mr Tanner Holman" is "2"












And I continue to debrief
Then I should see the Debrief page with outcome "Passed"
And I should see the "Debrief - Right Ford" page
When I end the debrief
Then I should see the "Test debrief - Right Ford" page
And I select the code 78 yes option
And I complete the pass details
And I complete the health declaration
Then I am on the back to office page
And I continue to the office write up
Then I should see the "Office" page
And the office page test outcome is "Passed"
When I complete the office write up
And I upload the test
Then I should see the "Journal" page
And the test result for "Mr Right Ford" is "1"
