import { WaitingRoom } from '@dvsa/mes-test-schema/CatBTest';

export const getInsuranceDeclarationStatus = (wr: WaitingRoom) => wr.insuranceDeclarationAccepted;
export const getResidencyDeclarationStatus = (wr: WaitingRoom) => wr.residencyDeclarationAccepted;
