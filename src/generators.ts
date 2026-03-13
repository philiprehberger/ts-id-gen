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

export function nanoid(size: number = 21): string {
  const bytes = randomBytes(size);
  let id = '';
  for (let i = 0; i < size; i++) {
    id += ALPHABET[bytes[i] & 63];
  }
  return id;
}

export function prefixedId(prefix: string, size: number = 16): string {
  return `${prefix}_${nanoid(size)}`;
}
