import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

export const categoryBTestResultMock: CatBUniqueTypes.TestResult = {
   rekey:false,
   version:'3.15.0',
   category:'EUAM1',
   testData:{
      ETA:{

      },
      avoidance:{
         firstAttempt:'999',
         speedNotMetSeriousFault:false
      },
      drivingFaults:{
         useOfStand:1,
         slalomFigure8:1,
         uTurnExercise:1,
         manualHandling:1
      },
      emergencyStop:{
         outcome:'DF',
         firstAttempt:'99',
         speedNotMetSeriousFault:false
      },
      seriousFaults:{

      },
      dangerousFaults:{

      }
   },
   journalData:{
      examiner:{
         staffNumber:'10000000',
         individualId:10000000
      },
      candidate:{
         gender:'M',
         candidateId:100,
         dateOfBirth:'1982-06-25',
         driverNumber:'CATA123456789DO1',
         emailAddress:'mobexaminer@gmail.com',
         candidateName:{
            title:'Mr',
            lastName:'Colon',
            firstName:'Fred'
         },
         ethnicityCode:'D',
         mobileTelephone:'(936) 552-2157',
         candidateAddress:{
            postcode:'BR82 0DE',
            addressLine1:'33 Montgomery Street',
            addressLine2:'Coventry Road',
            addressLine3:'Fuller Place',
            addressLine4:'Salix',
            addressLine5:'Address Line 5'
         },
         primaryTelephone:'(882) 408-3344'
      },
      testCentre:{
         centreId:54321,
         costCode:'EXTC1',
         centreName:'Example Test Centre'
      },
      testSlotAttributes:{
         start:'2020-02-06T07:50:00',
         slotId:1000,
         slotType:'Standard Test',
         welshTest:false,
         extendedTest:false,
         specialNeeds:false,
         vehicleTypeCode:'C',
         entitlementCheck:false,
         examinerVisiting:false,
         specialNeedsCode:'NONE',
         specialNeedsArray:[
            'None'
         ],
         previousCancellation:[
            'Act of nature'
         ]
      },
      applicationReference:{
         checkDigit:1,
         applicationId:10123400,
         bookingSequence:1
      }
   },
   rekeyReason:{
      other:{
         reason:'',
         selected:false
      },
      transfer:{
         selected:false
      },
      ipadIssue:{
         lost:false,
         broken:false,
         stolen:false,
         selected:false,
         technicalFault:false
      }
   },
   testSummary:{
      D255:false,
      debriefWitnessed:true
   },
   activityCode:'1',
   changeMarker:false,
   accompaniment:{
      ADI:true,
      interpreter:true
   },
   examinerKeyed:10000000,
   examinerBooked:10000000,
   passCompletion:{
      passCertificateNumber:'A123456x'
   },
   vehicleDetails:{
      gearboxCategory:'Automatic',
      registrationNumber:'I JUST '
   },
   examinerConducted:10000000,
   preTestDeclarations:{
      preTestSignature:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xvdW5kIj48L3BhdGg+PC9zdmc+',
      DL196CBTCertNumber:'I just don’t have ',
      insuranceDeclarationAccepted:true,
      residencyDeclarationAccepted:true
   },
   postTestDeclarations:{
      postTestSignature:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNzA2IDI1NiIgd2lkdGg9IjcwNiIgaGVpZ2h0PSIyNTYiPjxjaXJjbGUgcj0iMS43NSIgY3g9IjU2NSIgY3k9IjEyMiIgZmlsbD0iYmxhY2siPjwvY2lyY2xlPjwvc3ZnPg==',
      healthDeclarationAccepted:false,
      passCertificateNumberReceived:true
   },
   communicationPreferences:{
      updatedEmail:'mobexaminer@gmail.com',
      conductedLanguage:'English',
      communicationMethod:'Email'
   }
}
