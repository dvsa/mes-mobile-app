import { PreTestDeclarations } from './node_modules/@dvsa/mes-test-schema/categories/common';

export const getInsuranceDeclarationStatus = (decs: PreTestDeclarations) => decs.insuranceDeclarationAccepted;
export const getResidencyDeclarationStatus = (decs: PreTestDeclarations) => decs.residencyDeclarationAccepted;
export const getSignatureStatus = (decs: PreTestDeclarations) => decs.preTestSignature;
