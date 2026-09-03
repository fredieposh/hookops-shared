import { SCHEMA_VERSION_PATTERN } from './envelope.js';

export const SUPPORTED_SCHEMA_MAJOR = 1;

export const COMPATIBILITY_ERROR_CODES = {
  INVALID_SCHEMA_VERSION: 'INVALID_SCHEMA_VERSION',
  UNSUPPORTED_SCHEMA_MAJOR: 'UNSUPPORTED_SCHEMA_MAJOR',
} as const;

export interface ParsedSchemaVersion {
  major: number;
  minor: number;
}

type InvalidVersionError = {
  code: typeof COMPATIBILITY_ERROR_CODES.INVALID_SCHEMA_VERSION;
};

type UnsupportedMajorError = {
  code: typeof COMPATIBILITY_ERROR_CODES.UNSUPPORTED_SCHEMA_MAJOR;
  supportedMajor: number;
  receivedMajor: number;
};

export type CompatibilityResult =
  | {
      ok: true;
      version: ParsedSchemaVersion;
    }
  | {
      ok: false;
      error: InvalidVersionError | UnsupportedMajorError;
    };

const schemaVersionRegex = new RegExp(SCHEMA_VERSION_PATTERN);

export function parseSchemaVersion(value: unknown): ParsedSchemaVersion | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const match = schemaVersionRegex.exec(value);
  if (!match) {
    return undefined;
  }

  const major = Number(match[1]);
  const minor = Number(match[2]);

  if (!Number.isSafeInteger(major) || !Number.isSafeInteger(minor)) {
    return undefined;
  }

  return { major, minor };
}

export function checkSchemaCompatibility(value: unknown): CompatibilityResult {
  const version = parseSchemaVersion(value);

  if (!version) {
    return {
      ok: false,
      error: { code: COMPATIBILITY_ERROR_CODES.INVALID_SCHEMA_VERSION },
    };
  }

  if (version.major !== SUPPORTED_SCHEMA_MAJOR) {
    return {
      ok: false,
      error: {
        code: COMPATIBILITY_ERROR_CODES.UNSUPPORTED_SCHEMA_MAJOR,
        supportedMajor: SUPPORTED_SCHEMA_MAJOR,
        receivedMajor: version.major,
      },
    };
  }

  return {
    ok: true,
    version,
  };
}
