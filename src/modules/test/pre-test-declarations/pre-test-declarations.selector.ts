import { PreTestDeclarations } from '@dvsa/mes-test-schema/CatBTest';

export const getInsuranceDeclarationStatus = (decs: PreTestDeclarations) => decs.insuranceDeclarationAccepted;
export const getResidencyDeclarationStatus = (decs: PreTestDeclarations) => decs.residencyDeclarationAccepted;
export const getResidencySignatureStatus = (decs: PreTestDeclarations) => decs.signature;
