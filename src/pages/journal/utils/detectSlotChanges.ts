import diff from 'deep-diff';

export default function(oldSlots, newSlots): boolean[] {
  const difference = diff(oldSlots, newSlots);

  if (difference.some(change => change.kind === 'E')) {
    console.log(`DETECTED AN EDIT: ${JSON.stringify(difference)}`);
  }

  return [
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
}