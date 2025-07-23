const { JSDOM } = require('jsdom');
const { calculateHours } = require('../calculateHours');

describe('calculateHours', () => {
  function setupRow(start, end) {
    const dom = new JSDOM(`<table><tr>
      <td><input class="activity-start" value="${start}"></td>
      <td><input class="activity-end" value="${end}"></td>
      <td><input class="activity-hours"></td>
    </tr></table>`);
    const row = dom.window.document.querySelector('tr');
    return { row, dom };
  }

  test('calculates normal difference', () => {
    const { row } = setupRow('08:00', '10:15');
    const start = row.querySelector('.activity-start');
    calculateHours(start);
    const hours = row.querySelector('.activity-hours').value;
    expect(hours).toBe('2.5');
  });

  test('handles crossing midnight', () => {
    const { row } = setupRow('22:00', '01:30');
    const end = row.querySelector('.activity-end');
    calculateHours(end);
    const hours = row.querySelector('.activity-hours').value;
    expect(hours).toBe('3.5');
  });

  test('rounds to nearest half hour', () => {
    const { row } = setupRow('09:00', '09:20');
    const end = row.querySelector('.activity-end');
    calculateHours(end);
    const hours = row.querySelector('.activity-hours').value;
    expect(hours).toBe('0.5');
  });
});
