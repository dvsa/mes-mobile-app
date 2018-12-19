export const environmentResponseMock = {
  body: {
    message: 'Success',
    data: {
      'googleAnalyticsId': 'TEST-GA-ID',
      'userIdDimensionIndex': 99,
      'authentication' : {
          'context': 'remote-authentication-context',
          'resourceUrl': 'remote-authentication-resource-url',
          'clientId': 'remote-authentication-client-id',
          'redirectUrl': 'remote-authentication-redirect-url',
      }
    }
  }
}
