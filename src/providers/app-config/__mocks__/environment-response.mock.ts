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
          'logoutUrl' : 'remote-logout-url'
      },
      'aws': {
        'region': 'aws-region'
      },
      'journal' : {
        'journalUrl': 'remote-journal-url',
        'numberOfDaysToView': 7,
      }
    }
  }
}
