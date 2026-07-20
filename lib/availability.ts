/**
 * The hero and about page both advertise when the next slot opens. That was
 * hardcoded to "August", which is correct for about four weeks and wrong
 * forever after — the kind of detail nobody remembers to update, and a stale
 * date on a consulting site reads worse than no date at all.
 *
 * Rolls to the following month past the halfway point: scoping plus build runs
 * two to four weeks, so from mid-month onward a new enquiry realistically
 * starts next month anyway.
 */
export const availabilityMonth = (now: Date = new Date()): string => {
  const d = new Date(now.getFullYear(), now.getMonth(), 1);
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  if (now.getDate() > daysInMonth / 2) {
    d.setMonth(d.getMonth() + 1);
  }
  return d.toLocaleString('en-US', { month: 'long' });
};
