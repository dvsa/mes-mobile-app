export var getPassCertificateNumber = function (passCompletion) { return passCompletion.passCertificateNumber; };
export var isProvisionalLicenseProvided = function (passCompletion) { return passCompletion.provisionalLicenceProvided; };
export var isProvisionalLicenseNotProvided = function (passCompletion) { return passCompletion.provisionalLicenceProvided !== null
    && !passCompletion.provisionalLicenceProvided; };
//# sourceMappingURL=pass-completion.selector.js.map