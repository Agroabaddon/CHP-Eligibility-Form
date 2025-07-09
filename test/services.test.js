import test from 'node:test';
import assert from 'node:assert/strict';
import { programs } from '../js/Services.js';

function runEligibility(data) {
  return programs.filter(p => p.isEligible(data)).map(p => p.name);
}

// Data with SNAP participant
const snapData = {
  household: [{ snap: true }],
  clientIncome: 40000,
};

// Data with young child and low income
const wicData = {
  household: [{ age: 3 }],
  clientIncome: 25000,
};

// Data not eligible for any program
const noneData = {
  household: [{ age: 30 }],
  clientIncome: 50000,
};

test('SNAP eligibility when household member already receives SNAP', () => {
  assert.deepEqual(runEligibility(snapData), ['SNAP']);
});

test('WIC eligibility when household has young child and low income', () => {
  assert.deepEqual(runEligibility(wicData), ['WIC']);
});

test('No eligibility for unrelated household', () => {
  assert.deepEqual(runEligibility(noneData), []);
});
