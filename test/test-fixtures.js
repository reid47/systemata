const colors1 = [
  { id: 'primary', name: 'Primary color', value: '#f00' },
  { id: 'secondary', name: 'Secondary color', value: '#0f0' },
  { id: 'tertiary', name: 'Tertiary color', value: '#00f' }
];

const colorsWithComments = [
  {
    id: 'primary',
    name: 'Primary color',
    value: '#f00',
    description: 'This is the primary color.'
  },
  {
    id: 'secondary',
    name: 'Secondary color',
    value: '#0f0',
    description: ['This is the secondary color.', 'It should be used in some places.'].join('\n')
  },
  { id: 'tertiary', name: 'Tertiary color', value: '#00f' }
];

const spacingUnits1 = [
  { id: 'sm', name: 'Small spacing', value: '8px' },
  { id: 'md', name: 'Medium spacing', value: '16px' },
  { id: 'lg', name: 'Large spacing', value: '24px' }
];

module.exports = { colors1, colorsWithComments, spacingUnits1 };
