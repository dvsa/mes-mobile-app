import { CredentialsOptions } from 'aws-sdk/lib/credentials';

interface SigningOptions {
  host: string,
  path: string,
  region: string
}

export const sign = (options: SigningOptions, credentials: CredentialsOptions): void => {};

