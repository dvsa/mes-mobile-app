var ReverseDiagramModalMock = /** @class */ (function () {
    function ReverseDiagramModalMock() {
    }
    ReverseDiagramModalMock.prototype.getCappedStartDistanceCategories = function () {
        return this.cappedStartDistance;
    };
    ReverseDiagramModalMock.prototype.getVehicleDetails = function () {
        return this.vehicleDetails;
    };
    ReverseDiagramModalMock.prototype.ngOnInit = function () {
        this.cappedStartDistance = ["C1+E" /* C1E */, "C+E" /* CE */, "D+E" /* DE */, "D1+E" /* D1E */];
        this.vehicleDetails = new Map([
            ["B+E" /* BE */, {
                    vLength: 10,
                    vWidth: 2.75,
                    expStartDist: 40,
                    expMidDist: 20,
                    expWidthDist: 4.13,
                    expMidDistMultiplier: '2',
                }],
            ["C" /* C */, {
                    vLength: 10,
                    vWidth: 2.75,
                    expStartDist: 35,
                    expMidDist: 15,
                    expWidthDist: 4.13,
                    expMidDistMultiplier: '1 1/2',
                }],
            ["C+E" /* CE */, {
                    vLength: 10,
                    vWidth: 2.75,
                    expStartDist: 40,
                    expMidDist: 20,
                    expWidthDist: 4.13,
                    expMidDistMultiplier: '2',
                }],
            ["C1" /* C1 */, {
                    vLength: 10,
                    vWidth: 2.75,
                    expStartDist: 35,
                    expMidDist: 15,
                    expWidthDist: 4.13,
                    expMidDistMultiplier: '1 1/2',
                }],
            ["C1+E" /* C1E */, {
                    vLength: 10,
                    vWidth: 2.75,
                    expStartDist: 40,
                    expMidDist: 20,
                    expWidthDist: 4.13,
                    expMidDistMultiplier: '2',
                }],
            ["D" /* D */, {
                    vLength: 10,
                    vWidth: 2.75,
                    expStartDist: 35,
                    expMidDist: 15,
                    expWidthDist: 4.13,
                    expMidDistMultiplier: '1 1/2',
                }],
            ["D+E" /* DE */, {
                    vLength: 10,
                    vWidth: 2.75,
                    expStartDist: 40,
                    expMidDist: 20,
                    expWidthDist: 4.13,
                    expMidDistMultiplier: '2',
                }],
            ["D1" /* D1 */, {
                    vLength: 10,
                    vWidth: 2.75,
                    expStartDist: 35,
                    expMidDist: 15,
                    expWidthDist: 4.13,
                    expMidDistMultiplier: '1 1/2',
                }],
            ["D1+E" /* D1E */, {
                    vLength: 10,
                    vWidth: 2.75,
                    expStartDist: 40,
                    expMidDist: 20,
                    expWidthDist: 4.13,
                    expMidDistMultiplier: '2',
                }],
        ]);
    };
    return ReverseDiagramModalMock;
}());
export { ReverseDiagramModalMock };
//# sourceMappingURL=reverse-diagram-modal.mock.js.map