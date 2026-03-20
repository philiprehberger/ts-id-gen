import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('id-gen', () => {
  it('should export uuid', () => {
    assert.ok(mod.uuid);
  });

  it('should export ulid', () => {
    assert.ok(mod.ulid);
  });

  it('should export nanoid', () => {
    assert.ok(mod.nanoid);
  });

  it('should export prefixedId', () => {
    assert.ok(mod.prefixedId);
  });
});
