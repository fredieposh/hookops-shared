import pino from 'pino';
import { it, describe, expect } from 'vitest';

import { PINO_REDACTION_CENSOR, createPinoRedactionPaths } from './redaction.js';

describe('pino redaction', () => {
  it('redacts_sensitive_paths', () => {
    let output = '';

    const destination = {
      write(message: string): void {
        output += message;
      },
    };

    const logger = pino(
      {
        redact: {
          paths: createPinoRedactionPaths(),
          censor: PINO_REDACTION_CENSOR,
        },
      },
      destination,
    );

    const secrets = {
      authorization: 'Bearer authorization-secret',
      cookie: 'session=cookie-secret',
      apiKey: 'api-key-secret',
      token: 'token-secret',
      password: 'password-secret',
      bodySecret: 'body-secret',
    };

    logger.info({
      req: {
        headers: {
          authorization: secrets.authorization,
          cookie: secrets.cookie,
          'x-api-key': secrets.apiKey,
        },
        body: {
          token: secrets.token,
          passwords: secrets.password,
          secret: secrets.bodySecret,
        },
      },
    });

    for (const secret of Object.values(secrets)) {
      expect(output).not.toContain(secret);
    }

    expect(output).toContain(PINO_REDACTION_CENSOR);
  });
});
