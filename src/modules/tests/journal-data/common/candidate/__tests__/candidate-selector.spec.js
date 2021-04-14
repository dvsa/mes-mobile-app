import { getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName, getPostalAddress, getCandidateId, } from '../candidate.selector';
describe('candidate selector', function () {
    var candidate = {
        candidateName: {
            firstName: 'Joe',
            lastName: 'Bloggs',
            title: 'Mr',
        },
        driverNumber: '123',
        candidateAddress: {
            addressLine1: '1 Example Street',
            addressLine2: '456 Market Square',
            addressLine3: 'Nottingham',
            addressLine4: 'East Midlands',
            addressLine5: 'United Kingdom',
            postcode: 'NG1 6HY',
        },
        candidateId: 1001,
    };
    var candidateNoTitle = {
        candidateName: {
            firstName: 'Joe',
            lastName: 'Bloggs',
        },
        driverNumber: '123',
        candidateAddress: {
            addressLine1: '1 Example Street',
            addressLine2: '456 Market Square',
            addressLine3: 'Nottingham',
            addressLine4: 'East Midlands',
            addressLine5: 'United Kingdom',
            postcode: 'NG1 6HY',
        },
        candidateId: 1001,
    };
    describe('getCandidateName', function () {
        it('should produce first and last name with a title prefix', function () {
            expect(getCandidateName(candidate)).toBe('Mr Joe Bloggs');
        });
        it('should produce first and last name only when no title', function () {
            expect(getCandidateName(candidateNoTitle)).toBe('Joe Bloggs');
        });
    });
    describe('getUntitledCandidateName', function () {
        it('should produce first and last name only, no title prefix', function () {
            expect(getUntitledCandidateName(candidate)).toBe('Joe Bloggs');
        });
    });
    describe('getCandidateDriverNumber', function () {
        it('should extract the driver number', function () {
            expect(getCandidateDriverNumber(candidate)).toBe('123');
        });
    });
    describe('formatDriverNumber', function () {
        it('should output the driver number as-is where it is not long enough', function () {
            expect(formatDriverNumber('123')).toBe('123');
        });
        it('should output the driver number in 3 space separated parts where applicable', function () {
            expect(formatDriverNumber('ABCDE123456Z78YX')).toBe('ABCDE 123456 Z78YX');
        });
    });
    describe('getPostalAddress', function () {
        it('should output the address', function () {
            expect(getPostalAddress(candidate)).toEqual(candidate.candidateAddress);
        });
    });
    describe('getCandidateId', function () {
        it('should output the candidate ID', function () {
            expect(getCandidateId(candidate)).toEqual(1001);
        });
    });
});
//# sourceMappingURL=candidate-selector.spec.js.map