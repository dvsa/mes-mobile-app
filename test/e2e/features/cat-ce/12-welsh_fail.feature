@catce @full_smoke @regression
Feature: A Driving Examiner Completes a Welsh Failed User Journey in Category CE

    Scenario: Examiner completes a failed welsh test with various faults
        Given I am logged in as "desexaminerce" and I have a test for "Mr Hendricks Parsons"
        When I check candidate details for "Mr Hendricks Parsons"
        When I start the test for "Mr Hendricks Parsons"
        And the candidate completes the declaration page
        And the candidate confirms their declaration
        Then I should see the "Datganiad - Hendricks Parsons" page
        And the candidate enters a new email address
        And I proceed to the car
        Then I should see the "Hendricks Parsons" page
        And I complete the waiting room to car page with the following vehicle checks
        | show_me_1 | show_me_2 |
        | true      | false     |
        Then I should see the "Test report - Hendricks Parsons" page
        And the driver fault count is "1"
        When I end the test
        Then the legal requirements pop up is present
        And the required test observation is present "NS (normal stop)"
        And the required test observation is present "UH (uphill start)"
        And the required test observation is present "AS/CS (angled start/ controlled stop)"
        And the required test observation is present "Manoeuvres"
        And the required test observation is present "Eco (control and planning)"
        And the required test observation is present "Uncouple / Recouple"
        Then I return to the test report page
        And I should see the "Test report - Hendricks Parsons" page
        And I enter the legal requirements
        When I add a "Meeting" driver fault
        And the driver fault count is "2"
        When I add a "Footbrake" driver fault
        And the driver fault count is "3"
        When I add the Uncouple and Recouple fault
        And the driver fault count is "4"
        When I add a "Control" serious fault with a long press
        Then the "Control" button displays the serious badge
        When I end the test
        And I continue to debrief
        Then I should see the Debrief page with outcome "Aflwyddiannus"
        And I see a "serious" fault for "Symud i ffwrdd - dan reolaeth"
        And I see a "driving" fault for "Rheolaeth - brêc troed"
        And I see a "driving" fault for "Doethineb - dod i gyfarfod cerbydau"
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
        And I enter a comment for "serious" fault "Move off - Control"
        And I upload the test
        Then I should see the "Journal" page
        And the test result for "Mr Hendricks Parsons" is "2"
