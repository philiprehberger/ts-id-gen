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

```ts
import { uuid, ulid, nanoid, prefixedId } from '@philiprehberger/id-gen';

uuid();            // '550e8400-e29b-41d4-a716-446655440000'
ulid();            // '01ARZ3NDEKTSV4RRFFQ69G5FAV'
nanoid();          // 'V1StGXR8_Z5jdHi6B-myT' (21 chars)
nanoid(10);        // 'IRFa-VaY2b'
prefixedId('usr'); // 'usr_V1StGXR8_Z5jdHi6'
```

## API

| Function | Description |
|----------|-------------|
| `uuid()` | UUID v4 (RFC 4122) |
| `ulid()` | ULID (time-sortable) |
| `nanoid(size?)` | URL-safe nanoid (default 21 chars) |
| `prefixedId(prefix, size?)` | `{prefix}_{nanoid}` (default 16 char suffix) |

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
