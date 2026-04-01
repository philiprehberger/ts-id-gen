const HEX = '0123456789abcdef';
const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-';
const ULID_CHARS = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function randomBytes(n: number): Uint8Array {
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
    const bytes = new Uint8Array(n);
    globalThis.crypto.getRandomValues(bytes);
    return bytes;
  }
  const bytes = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

export function uuid(): string {
  const bytes = randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex: string[] = [];
  for (const b of bytes) {
    hex.push(HEX[b >> 4] + HEX[b & 0x0f]);
  }

  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-');
}

export function ulid(): string {
  const now = Date.now();
  let result = '';

  let t = now;
  for (let i = 9; i >= 0; i--) {
    result = ULID_CHARS[t % 32] + result;
    t = Math.floor(t / 32);
  }

  const bytes = randomBytes(10);
  for (let i = 0; i < 10; i++) {
    result += ULID_CHARS[bytes[i] % 32];
  }

  return result;
}

export function nanoid(size?: number, alphabet?: string): string;
export function nanoid(options?: { size?: number; alphabet?: string }): string;
export function nanoid(
  sizeOrOptions?: number | { size?: number; alphabet?: string },
  alphabet?: string,
): string {
  let size: number;
  let chars: string;

  if (typeof sizeOrOptions === 'object' && sizeOrOptions !== null) {
    size = sizeOrOptions.size ?? 21;
    chars = sizeOrOptions.alphabet ?? ALPHABET;
  } else {
    size = sizeOrOptions ?? 21;
    chars = alphabet ?? ALPHABET;
  }

  if (chars.length === 0) {
    throw new Error('Alphabet must not be empty');
  }
  if (chars.length > 256) {
    throw new Error('Alphabet must not exceed 256 characters');
  }

  const mask = (2 << (31 - Math.clz32((chars.length - 1) | 1))) - 1;
  const bytes = randomBytes(size);
  let id = '';
  for (let i = 0; i < size; i++) {
    id += chars[bytes[i] & mask] ?? chars[bytes[i] % chars.length];
  }
  return id;
}

export function prefixedId(prefix: string, size: number = 16): string {
  return `${prefix}_${nanoid(size)}`;
}

function parseUuidBytes(uuidStr: string): Uint8Array {
  const hex = uuidStr.replace(/-/g, '');
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function sha1(data: Uint8Array): Promise<Uint8Array> {
  const buf = new Uint8Array(data).buffer as ArrayBuffer;
  const digest = await globalThis.crypto.subtle.digest('SHA-1', buf);
  return new Uint8Array(digest);
}

export const UUID_NAMESPACES = {
  DNS: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  URL: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  OID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
  X500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
} as const;

export async function uuidv5(name: string, namespace: string): Promise<string> {
  const namespaceBytes = parseUuidBytes(namespace);
  const nameBytes = new TextEncoder().encode(name);

  const input = new Uint8Array(namespaceBytes.length + nameBytes.length);
  input.set(namespaceBytes);
  input.set(nameBytes, namespaceBytes.length);

  const hash = await sha1(input);

  // Set version 5
  hash[6] = (hash[6] & 0x0f) | 0x50;
  // Set variant (RFC 4122)
  hash[8] = (hash[8] & 0x3f) | 0x80;

  const hex: string[] = [];
  for (let i = 0; i < 16; i++) {
    hex.push(HEX[hash[i] >> 4] + HEX[hash[i] & 0x0f]);
  }

  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-');
}

export type IdType = 'uuid' | 'ulid' | 'nanoid';

export function generateMany(type: IdType, count: number): string[] {
  if (count < 0 || !Number.isInteger(count)) {
    throw new Error('Count must be a non-negative integer');
  }

  const generator = type === 'uuid' ? uuid : type === 'ulid' ? ulid : nanoid;
  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    results.push(generator());
  }
  return results;
}
