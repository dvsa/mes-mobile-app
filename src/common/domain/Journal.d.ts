/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The type of vehicle gearbox, if captured
 */
export type VehicleGearbox = "Manual" | "Semi-Automatic" | "Automatic";

/**
 * JSON Schema definition for Examiner Work Schedule
 */
export interface ExaminerWorkSchedule {
  /**
   * The examiner details
   */
  examiner?: {
    /**
     * The examiner's DSA staff number
     */
    staffNumber?: string;
    examinerName?: Name;
    permTestCentre?: TestCentre;
    [k: string]: any;
  };
  /**
   * A test slot, possibly populated with booking data
   */
  testSlot?: {
    slotDetail?: SlotDetail;
    /**
     * A short description of the Vehicle Slot Type, e.g. B57mins, Voc90mins, Hometest, if any
     */
    vehicleSlotType?: string;
    testCentre?: TestCentre;
    /**
     * If this slot is booked, this contains the details
     */
    booking?: {
      candidate?: Candidate;
      application?: Application;
      /**
       * The details of any previous test cancellations
       */
      previousCancellation?: any[];
      /**
       * The business details, only for tests that are booked by a business or trainer booker
       */
      business?: {
        /**
         * The business id
         */
        businessId?: number;
        /**
         * The business name
         */
        businessName?: string;
        businessAddress?: Address;
        /**
         * The business telephone number, if any
         */
        telephone?: string;
        [k: string]: any;
      };
      [k: string]: any;
    };
    [k: string]: any;
  }[];
  [k: string]: any;
}
/**
 * Details of the individual's name
 */
export interface Name {
  /**
   * The individual's title
   */
  title: string;
  /**
   * The individual's forename
   */
  firstName: string;
  /**
   * The individual's second name
   */
  secondName?: string;
  /**
   * The individual's third name
   */
  thirdName?: string;
  /**
   * The individual's surname
   */
  lastName: string;
  [k: string]: any;
}
/**
 * Details of the test centre
 */
export interface TestCentre {
  /**
   * Identifier for the test centre
   */
  centreId?: number;
  /**
   * Name of the test centre
   */
  centreName?: string;
  /**
   * Cost centre code for the test centre
   */
  costCode?: string;
  [k: string]: any;
}
/**
 * Details of the test slot
 */
export interface SlotDetail {
  /**
   * Unique identifier for the test slot
   */
  slotId?: number;
  /**
   * Start time of the test slot
   */
  start?: string;
  /**
   * The length in minutes of the test slot
   */
  duration?: number;
  [k: string]: any;
}
/**
 * Details of the candidate booked into the test slot
 */
export interface Candidate {
  /**
   * The id of the test candidate
   */
  candidateId?: number;
  /**
   * The age of the test candidate on the day of the test
   */
  age?: number;
  candidateName?: Name;
  /**
   * The candidate's driver number if any, typically (though not always) 16 characters if UK, or 8 digits if NI
   */
  driverNumber?: string;
  /**
   * The candidate's gender
   */
  gender?: string;
  candidateAddress?: Address;
  /**
   * The candidate's primary telephone number, if any (and consent to leave voicemail has been given)
   */
  primaryTelephone?: string;
  /**
   * The candidate's secondary telephone number, if any (and consent to leave voicemail has been given)
   */
  secondaryTelephone?: string;
  /**
   * The candidate's mobile telephone number, if any (and consent to leave voicemail has been given)
   */
  mobileTelephone?: string;
  /**
   * The candidate's ADI PRN (potential register number), if an ADI test
   */
  prn?: number;
  /**
   * The number of previous test attempts, if an ADI test
   */
  previousADITests?: number;
  [k: string]: any;
}
/**
 * Details of the address
 */
export interface Address {
  /**
   * First line of address
   */
  addressLine1?: string;
  /**
   * Second line of address
   */
  addressLine2?: string;
  /**
   * Third line of address
   */
  addressLine3?: string;
  /**
   * Fourth line of address
   */
  addressLine4?: string;
  /**
   * Fifth line of address
   */
  addressLine5?: string;
  /**
   * The address postcode
   */
  postcode?: string;
  [k: string]: any;
}
/**
 * Details of the test application
 */
export interface Application {
  /**
   * The application's id
   */
  applicationId?: number;
  /**
   * The application's booking sequence number
   */
  bookingSequence?: number;
  /**
   * The application's reference checksum
   */
  checkDigits?: number;
  /**
   * Whether the test is to be conducted using the welsh language
   */
  welshTest?: boolean;
  /**
   * Whether this is an extended test
   */
  extendedTest?: boolean;
  /**
   * Offsite Test location, if any
   */
  meetingPlace?: string;
  /**
   * Whether this is a progressive access test
   */
  progressiveAccess?: boolean;
  /**
   *  The candidate's special test needs, if any
   */
  specialNeeds?: string;
  /**
   * Indicates whether the examiner needs to check the candidates entitlement evidence(e.g. test application has not been checked with DVLA)
   */
  entitlementCheck?: boolean;
  /**
   * The number of seats in the vehicle, if captured
   */
  vehicleSeats?: number;
  /**
   * The height of the vehicle in metres, if captured
   */
  vehicleHeight?: number;
  /**
   * The width of the vehicle in metres, if captured
   */
  vehicleWidth?: number;
  /**
   * The length of the vehicle in metres, if captured
   */
  vehicleLength?: number;
  /**
   * The test category reference, if any
   */
  testCategory?: string;
  vehicleGearbox?: VehicleGearbox;
  [k: string]: any;
}
