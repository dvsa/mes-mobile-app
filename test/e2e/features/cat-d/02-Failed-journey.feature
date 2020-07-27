@catd @full_smoke @regression

  Feature: Driver Examiner failed the test journey for category D with serious fault

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
  And I add a "PCV Exercise" driver fault
  And the driver fault count is "1"
  When I add a "Accelerator" driver fault
  And the driver fault count is "2"
  When I add a "Safety" driver fault
  And the driver fault count is "3"
  When I add a "Correctly" driver fault
  And the driver fault count is "4"
  When I add a "Control" serious fault with a long press
  Then the "Control" button displays the serious badge
  And I complete the test with controlled stop
  And I continue to debrief
  Then I should see the Debrief page with outcome "Unsuccessful"
  And I see a "serious" fault for "Move off - Control"
  And I see a "driving" fault for "Control - Accelerator"
  And I see a "driving" fault for "Signals - Correctly"
  And I see a "driving" fault for "Move off - Safety"
  And I see a "driving" fault for "PCV Door Exercise"
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
  And the test result for "Mr Right Ford" is "2"
