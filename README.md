# @philiprehberger/id-gen

[![CI](https://github.com/philiprehberger/id-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/id-gen/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/id-gen.svg)](https://www.npmjs.com/package/@philiprehberger/id-gen)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/id-gen)](https://github.com/philiprehberger/id-gen/commits/main)

Flexible ID generation with UUID, ULID, nanoid, and prefixed IDs. Zero dependencies

## Installation

```bash
npm install @philiprehberger/id-gen
```

## Usage

### Basic ID Generation

```ts
import { uuid, ulid, nanoid, prefixedId } from '@philiprehberger/id-gen';

uuid();            // '550e8400-e29b-41d4-a716-446655440000'
ulid();            // '01ARZ3NDEKTSV4RRFFQ69G5FAV'
nanoid();          // 'V1StGXR8_Z5jdHi6B-myT' (21 chars)
nanoid(10);        // 'IRFa-VaY2b'
prefixedId('usr'); // 'usr_V1StGXR8_Z5jdHi6'
```

### Custom Alphabet for nanoid

```ts
import { nanoid } from '@philiprehberger/id-gen';

// Numeric-only IDs
nanoid(8, '0123456789');          // '48293017'

// Hex IDs
nanoid(12, '0123456789abcdef');   // 'a3f29c01b8e4'

// Options object form
nanoid({ size: 6, alphabet: 'ABCDEF' }); // 'BCFAED'
```

### UUID v5 (Namespace-based)

```ts
import { uuidv5, UUID_NAMESPACES } from '@philiprehberger/id-gen';

// Deterministic UUID from name + namespace
const id = await uuidv5('example.com', UUID_NAMESPACES.DNS);
// Always returns the same UUID for the same inputs

// Custom namespace UUID
const custom = await uuidv5('user-42', '12345678-1234-1234-1234-123456789abc');
```

### ID Validation

```ts
import { isUuid, isUlid, isNanoid } from '@philiprehberger/id-gen';

isUuid('550e8400-e29b-41d4-a716-446655440000'); // true
isUuid('not-a-uuid');                            // false

isUlid('01ARZ3NDEKTSV4RRFFQ69G5FAV');           // true
isUlid('invalid');                                // false

isNanoid('V1StGXR8_Z5jdHi6B-myT');              // true (default 21 chars)
isNanoid('IRFa-VaY2b', 10);                      // true (custom length)
```

### Batch Generation

```ts
import { generateMany } from '@philiprehberger/id-gen';

const uuids = generateMany('uuid', 5);   // 5 UUID v4 strings
const ulids = generateMany('ulid', 10);   // 10 ULID strings
const nanos = generateMany('nanoid', 3);  // 3 nanoid strings
```

## API

| Function | Description |
|----------|-------------|
| `uuid()` | UUID v4 (RFC 4122) |
| `ulid()` | ULID (time-sortable) |
| `nanoid(size?, alphabet?)` | URL-safe nanoid (default 21 chars), optional custom alphabet |
| `nanoid({ size?, alphabet? })` | nanoid with options object |
| `prefixedId(prefix, size?)` | `{prefix}_{nanoid}` (default 16 char suffix) |
| `uuidv5(name, namespace)` | UUID v5 deterministic generation (async, SHA-1) |
| `UUID_NAMESPACES` | Standard namespace UUIDs: `DNS`, `URL`, `OID`, `X500` |
| `generateMany(type, count)` | Batch generate IDs (`'uuid'`, `'ulid'`, or `'nanoid'`) |
| `isUuid(value)` | Validate UUID format (v1-v5) |
| `isUlid(value)` | Validate ULID format |
| `isNanoid(value, length?)` | Validate nanoid format (default alphabet, configurable length) |

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/id-gen)

🐛 [Report issues](https://github.com/philiprehberger/id-gen/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/id-gen/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
