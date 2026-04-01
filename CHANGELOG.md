# Changelog

## 0.2.0

- Add custom alphabet support for nanoid generation
- Add UUID v5 namespace-based deterministic generation
- Add ID validation utilities (isUuid, isUlid, isNanoid)
- Add batch generation with generateMany()

## 0.1.6

- Standardize README to 3-badge format with emoji Support section
- Update CI actions to v5 for Node.js 24 compatibility
- Add GitHub issue templates, dependabot config, and PR template

## 0.1.5

- Republish under new npm package name

## 0.1.4

- Add Development section to README
- Fix CI badge to reference publish.yml
- Add test script to package.json

## 0.1.0
- Initial release
- `uuid()` — UUID v4 generation
- `ulid()` — ULID generation
- `nanoid()` — nanoid generation with configurable size
- `prefixedId()` — prefixed IDs (e.g., `usr_abc123`)
