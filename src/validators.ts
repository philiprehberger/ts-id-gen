const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ULID_REGEX = /^[0-9A-HJKMNP-TV-Z]{26}$/;
const NANOID_DEFAULT_REGEX = /^[A-Za-z0-9_-]+$/;

/**
 * Check if a string is a valid UUID (v1-v5).
 */
export function isUuid(value: string): boolean {
  return UUID_REGEX.test(value);
}

/**
 * Check if a string is a valid ULID.
 */
export function isUlid(value: string): boolean {
  return ULID_REGEX.test(value);
}

/**
 * Check if a string is a valid nanoid (default alphabet, configurable length).
 * By default checks for length 21, but accepts a custom expected length.
 */
export function isNanoid(value: string, expectedLength: number = 21): boolean {
  if (value.length !== expectedLength) {
    return false;
  }
  return NANOID_DEFAULT_REGEX.test(value);
}
