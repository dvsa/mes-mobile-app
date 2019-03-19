import { PreTestDeclarations } from '@dvsa/mes-test-schema/CatBTest';

export const getInsuranceDeclarationStatus = (decs: PreTestDeclarations) => decs.insuranceDeclarationAccepted;
export const getResidencyDeclarationStatus = (decs: PreTestDeclarations) => decs.residencyDeclarationAccepted;
export const getSignatureStatus = (decs: PreTestDeclarations) => decs.signature;
