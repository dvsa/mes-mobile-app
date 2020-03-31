@catb @regression
Feature: Journal

   @full_smoke
    Scenario: Examiner views candidate details
     Given I am on the journal page as "mobexaminer1"
      When I view candidate details for "Mrs Jane Doe"
      Then I should see the "Test details - Mrs Jane Doe" page
       And I should see the "Driver number" contains "DOEXX625364A99HC"
       And I should see the "Slot type" contains "Standard Test"
       And I should see the "Additional information" contains "Previous cancellations"
       And I should see the "Additional information" contains "- DSA"
       And I should see the "Additional information" contains "- Act of nature"

    Scenario: Examiner is informed of a special needs slot
     Given I am on the journal page as "mobexaminer1"
      Then I have a special needs slot for "Miss Theresa Shaw"
      When I view candidate details for "Miss Theresa Shaw"
      Then I should see the "Slot type" contains "Special Needs Extra Time"
       And I should see the "Special requirements" contains "- Candidate has dyslexia"

    Scenario: Examiner is informed of a welsh test
     Given I am on the journal page as "mobexaminer1"
      Then I have a welsh slot for "Captain Montague Smythe"

    Scenario: Examiner is informed that the test is Extended Test
     Given I am on the journal page as "mobexaminer1"
      When I view candidate details for "Mr Ali Campbell"
      Then I should see the "Slot type" contains "Extended Test"
      When I close the candidate test details modal
      Then I should see the "Journal" page

    Scenario: Examiner is informed that the test is Extended Test Special Needs
      Given I am on the journal page as "mobexaminer1"
      When I view candidate details for "Mr James Brown"
      Then I should see the "Slot type" contains "Extended Test Special Needs"
      When I close the candidate test details modal
      Then I should see the "Journal" page

   Scenario: Examiner is informed that the test is Single Slot (Special Needs)
     Given I am on the journal page as "mobexaminer1"
     When I navigate to next day
     And I view candidate details for "Mr Bill Pots"
     Then I should see the "Slot type" contains "Single Slot (Special Needs)"
     When I close the candidate test details modal
     Then I should see the "Journal" page

  Scenario: Examiner views meeting place information
    Given I am on the journal page as "mobexaminer1"
     When I view candidate details for "Miss Florence Pearson"
     Then I should see the "Meeting place" contains "Can we meet in the pub over the road from the corner shop on High Street."
     When I close the candidate test details modal
     Then I should see the "Journal" page

   Scenario: Examiner cannot start a test that isn't today
    Given I am on the journal page as "mobexaminer1"
    When I navigate to next day
    And I start the test for "Miss Alice Cooper"
    Then I should see the "Journal" page

   Scenario: Examiner views various non-test activities they have for the day
    Given I am on the journal page as "mobexaminer"
     Then I have a non-test slot for "Personal development" with code "142" at "08:00"
     And I have a non-test slot for "Motorcycle maintenance/cleaning" with code "94" at "10:00"
     And I have a non-test slot for "Motorcycle changeover period" with code "96" at "11:00"
     And I have a non-test slot for "Travel" with code "91" at "12:00"
     And I have a non-test slot for "Annual leave" with code "81" at "13:00"
     When I navigate to next day
     Then I have a non-test slot for "Training course" with code "107" at "11:45"
     And I have a non-test slot for "Industrial action" with code "125" at "13:30"
     And I have a non-test slot for "Medical appointment" with code "104" at "15:05"
     And I have a non-test slot for "Hospital appointment" with code "180" at "16:05"
     And I have a non-test slot for "Bad Weather" with code "133" at "18:35"
     Then I should see the "Journal" page
