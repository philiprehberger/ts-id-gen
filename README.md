# @philiprehberger/id-gen

[![CI](https://github.com/philiprehberger/ts-id-gen/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-id-gen/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/id-gen.svg)](https://www.npmjs.com/package/@philiprehberger/id-gen)
[![License](https://img.shields.io/github/license/philiprehberger/ts-id-gen)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-ec6cb9)](https://github.com/sponsors/philiprehberger)

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

## License

MIT
