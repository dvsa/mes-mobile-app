import { getTime, getCandidateName, getPhoneNumber, isCandidateCommentsEmpty, getCandidateId, isCandidateSpecialNeeds, isCandidateCheckNeeded, getSlotChanged, processSpecialNeeds, getBusiness, } from '../candidate-details.selector';
import { SlotTypes } from '../../../shared/models/slot-types';
import { SpecialNeedsCode, getSlotType } from '../../../shared/helpers/get-slot-type';
describe('Candidate Details Selector', function () {
    describe('processSpecialNeeds', function () {
        it('returns single item array for string.', function () {
            var slot = {
                booking: {
                    application: {
                        specialNeeds: 'there are some special needs',
                    },
                    previousCancellation: [],
                },
            };
            var result = processSpecialNeeds(slot);
            expect(result).toEqual(['there are some special needs']);
            expect(result.length).toBe(1);
        });
        it('returns multiple element array for semicolon seperated string', function () {
            var slot = {
                booking: {
                    application: {
                        specialNeeds: 'one;two;three',
                    },
                    previousCancellation: [],
                },
            };
            var result = processSpecialNeeds(slot);
            expect(result).toEqual(['one', 'two', 'three']);
            expect(result.length).toBe(3);
        });
        it('returns None string for falsey propery', function () {
            var slot = {
                booking: {
                    application: {},
                    previousCancellation: [],
                },
            };
            var result = processSpecialNeeds(slot);
            expect(result).toEqual('None');
        });
        it('returns None string for empty property', function () {
            var slot = {
                booking: {
                    application: {
                        specialNeeds: '',
                    },
                    previousCancellation: [],
                },
            };
            var result = processSpecialNeeds(slot);
            expect(result).toEqual('None');
        });
        it('returns None string for null property', function () {
            var slot = {
                booking: {
                    application: {
                        specialNeeds: null,
                    },
                    previousCancellation: [],
                },
            };
            var result = processSpecialNeeds(slot);
            expect(result).toEqual('None');
        });
    });
    describe('getTime', function () {
        it('returns the start time of the slot', function () {
            var slotStartTime = Date.now();
            var slot = {
                slotDetail: {
                    start: slotStartTime,
                },
            };
            var result = getTime(slot);
            expect(result).toEqual(slotStartTime);
        });
    });
    describe('isCandidateCommentsEmpty', function () {
        it('returns true if the specialNeeds and previousCancellation are empty', function () {
            var slot = {
                booking: {
                    application: {
                        applicationId: '123456',
                        bookingSequence: '3',
                        checkDigit: '1',
                        specialNeeds: '',
                    },
                    previousCancellation: [],
                },
            };
            var result = isCandidateCommentsEmpty(slot);
            expect(result).toBe(true);
        });
        it('returns false if the previousCancellation is not empty', function () {
            var slot = {
                booking: {
                    application: {
                        applicationId: '123456',
                        bookingSequence: '3',
                        checkDigit: '1',
                        specialNeeds: '',
                    },
                    previousCancellation: ['Act of nature'],
                },
            };
            var result = isCandidateCommentsEmpty(slot);
            expect(result).toBe(false);
        });
    });
    describe('getCandidateName', function () {
        it('returns the combination of candidate name title, firstName and lastName', function () {
            var title = 'Miss';
            var firstName = 'Florence';
            var lastName = 'Pearson';
            var slot = {
                booking: {
                    candidate: {
                        candidateName: {
                            title: title,
                            firstName: firstName,
                            lastName: lastName,
                        },
                    },
                },
            };
            var result = getCandidateName(slot);
            expect(result).toEqual(title + " " + firstName + " " + lastName);
        });
        it('returns the combination of candidate name title, firstName and lastName', function () {
            var firstName = 'Florence';
            var lastName = 'Pearson';
            var slot = {
                booking: {
                    candidate: {
                        candidateName: {
                            firstName: firstName,
                            lastName: lastName,
                        },
                    },
                },
            };
            var result = getCandidateName(slot);
            expect(result).toEqual(firstName + " " + lastName);
        });
    });
    describe('getCandidateId', function () {
        it('returns a candidate id', function () {
            var candidateId = '12354567';
            var slot = {
                booking: {
                    candidate: {
                        candidateId: candidateId,
                    },
                },
            };
            var result = getCandidateId(slot);
            expect(result).toEqual('12354567');
        });
    });
    describe('isCandidateSpecialNeeds', function () {
        it('returns true if special needs exist', function () {
            var slot = {
                booking: {
                    application: {
                        specialNeeds: 'there are some special needs',
                    },
                    previousCancellation: [],
                },
            };
            var result = isCandidateSpecialNeeds(slot);
            expect(result).toEqual(true);
        });
    });
    describe('getSlotType', function () {
        describe('vehicleSlotTypeCode is 6 and specialNeedsCode not NONE', function () {
            it('should return Single Slot (Special Needs)', function () {
                var slot = {
                    vehicleSlotTypeCode: 6,
                    booking: {
                        application: {
                            applicationId: 1234567,
                            bookingSequence: 3,
                            checkDigit: 1,
                            specialNeedsCode: SpecialNeedsCode.YES,
                        },
                    },
                };
                var result = getSlotType(slot);
                expect(result).toBe(SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS);
            });
        });
        describe('vehicleSlotTypeCode is 14 and specialNeedsCode not NONE', function () {
            it('should return Single Slot (Special Needs)', function () {
                var slot = {
                    vehicleSlotTypeCode: 14,
                    booking: {
                        application: {
                            applicationId: 1234567,
                            bookingSequence: 3,
                            checkDigit: 1,
                            specialNeedsCode: SpecialNeedsCode.YES,
                        },
                    },
                };
                var result = getSlotType(slot);
                expect(result).toBe(SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS);
            });
        });
        describe('specialNeedsExtendedTest is true', function () {
            var specialNeedsExtendedTestValue = true;
            describe('specialNeedsCode is NONE', function () {
                var specialNeedsCodeValue = SpecialNeedsCode.NONE;
                it('should return Extended Test', function () {
                    var slot = {
                        booking: {
                            application: {
                                applicationId: 1234567,
                                bookingSequence: 3,
                                checkDigit: 1,
                                specialNeedsExtendedTest: specialNeedsExtendedTestValue,
                                specialNeedsCode: specialNeedsCodeValue,
                            },
                        },
                    };
                    var result = getSlotType(slot);
                    expect(result).toBe(SlotTypes.EXTENDED_TEST);
                });
            });
            describe('specialNeedsCode is YES', function () {
                var specialNeedsCodeValue = SpecialNeedsCode.YES;
                it('should return Extended Test Special Needs', function () {
                    var slot = {
                        booking: {
                            application: {
                                applicationId: 1234567,
                                bookingSequence: 3,
                                checkDigit: 1,
                                specialNeedsExtendedTest: specialNeedsExtendedTestValue,
                                specialNeedsCode: specialNeedsCodeValue,
                            },
                        },
                    };
                    var result = getSlotType(slot);
                    expect(result).toBe(SlotTypes.EXTENDED_TEST_SPECIAL_NEEDS);
                });
            });
            describe('specialNeedsCode is EXTRA', function () {
                var specialNeedsCodeValue = SpecialNeedsCode.EXTRA;
                it('should return Extended Test Special Needs', function () {
                    var slot = {
                        booking: {
                            application: {
                                applicationId: 1234567,
                                bookingSequence: 3,
                                checkDigit: 1,
                                specialNeedsExtendedTest: specialNeedsExtendedTestValue,
                                specialNeedsCode: specialNeedsCodeValue,
                            },
                        },
                    };
                    var result = getSlotType(slot);
                    expect(result).toBe(SlotTypes.EXTENDED_TEST_SPECIAL_NEEDS);
                });
            });
        });
        describe('specialNeedsExtendedTest is false', function () {
            var specialNeedsExtendedTestValue = false;
            describe('specialNeedsCode is NONE', function () {
                var specialNeedsCodeValue = SpecialNeedsCode.NONE;
                it('should return Standard Test', function () {
                    var slot = {
                        booking: {
                            application: {
                                applicationId: 1234567,
                                bookingSequence: 3,
                                checkDigit: 1,
                                specialNeedsExtendedTest: specialNeedsExtendedTestValue,
                                specialNeedsCode: specialNeedsCodeValue,
                            },
                        },
                    };
                    var result = getSlotType(slot);
                    expect(result).toBe(SlotTypes.STANDARD_TEST);
                });
            });
            describe('specialNeedsCode is YES', function () {
                var specialNeedsCodeValue = SpecialNeedsCode.YES;
                it('should return Standard Test', function () {
                    var slot = {
                        booking: {
                            application: {
                                applicationId: 1234567,
                                bookingSequence: 3,
                                checkDigit: 1,
                                specialNeedsExtendedTest: specialNeedsExtendedTestValue,
                                specialNeedsCode: specialNeedsCodeValue,
                            },
                        },
                    };
                    var result = getSlotType(slot);
                    expect(result).toBe(SlotTypes.STANDARD_TEST);
                });
            });
            describe('specialNeedsCode is EXTRA', function () {
                var specialNeedsCodeValue = SpecialNeedsCode.EXTRA;
                it('should return Special Needs Extra Time', function () {
                    var slot = {
                        booking: {
                            application: {
                                applicationId: 1234567,
                                bookingSequence: 3,
                                checkDigit: 1,
                                specialNeedsExtendedTest: specialNeedsExtendedTestValue,
                                specialNeedsCode: specialNeedsCodeValue,
                            },
                        },
                    };
                    var result = getSlotType(slot);
                    expect(result).toBe(SlotTypes.SPECIAL_NEEDS_EXTRA_TIME);
                });
            });
        });
    });
    describe('isCandidateCheckNeeded', function () {
        it('returns true if entitlement check needed', function () {
            var slot = {
                booking: {
                    application: {
                        entitlementCheck: true,
                    },
                    previousCancellation: [],
                },
            };
            var result = isCandidateCheckNeeded(slot);
            expect(result).toEqual(true);
        });
    });
    describe('getSlotChanged', function () {
        it('returns true if slot marked as changed', function () {
            var slot = {
                hasSlotChanged: true,
                booking: {
                    application: {
                        entitlementCheck: true,
                    },
                    previousCancellation: [],
                },
            };
            var result = getSlotChanged(slot);
            expect(result).toEqual(true);
        });
    });
    describe('getPhoneNumber', function () {
        var mobileTelephone = '12453643622';
        var primaryTelephone = '1254326236236';
        var secondaryTelephone = '32543622255452';
        it('returns mobileTelephone if it is provided', function () {
            var candidate = {
                mobileTelephone: mobileTelephone,
                primaryTelephone: primaryTelephone,
                secondaryTelephone: secondaryTelephone,
            };
            var result = getPhoneNumber(candidate);
            expect(result).toEqual(mobileTelephone);
        });
        it('returns primaryTelephone if it is provided and mobileTelephone is not provided', function () {
            var candidate = {
                primaryTelephone: primaryTelephone,
                secondaryTelephone: secondaryTelephone,
            };
            var result = getPhoneNumber(candidate);
            expect(result).toEqual(primaryTelephone);
        });
        it('returns secondaryTelephone if it is probided and mobileTelephone is not provided nor primaryTelephone', function () {
            var candidate = {
                secondaryTelephone: secondaryTelephone,
            };
            var result = getPhoneNumber(candidate);
            expect(result).toEqual(secondaryTelephone);
        });
        it('returns No phone number provided if none of the phone numbers are provided', function () {
            var candidate = {};
            var result = getPhoneNumber(candidate);
            expect(result).toEqual('No phone number provided');
        });
    });
    describe('getBusiness', function () {
        it('should return the business', function () {
            var mockBusiness = {
                businessId: 1234,
                businessName: 'My Business',
            };
            var slot = {
                hasSlotChanged: true,
                booking: {
                    application: {
                        entitlementCheck: true,
                    },
                    previousCancellation: [],
                    business: mockBusiness,
                },
            };
            expect(getBusiness(slot)).toEqual(mockBusiness);
        });
    });
});
//# sourceMappingURL=candidate-details.selector.spec.js.map