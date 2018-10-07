import { mapSortedEntries, toCssRule, toSassVariable } from '../utils';
import FileBuilder from '../models/file-builder';

export const extension = '.scss';

export const compile = config => {
  const { settings } = config;

  const file = new FileBuilder(config);
  file.addSection('variables', 'Variables');

  if (config.colors) {
    file.addSection('colors', 'Color modifier classes');
    mapSortedEntries(config.colors, (color, { value }) => {
      const variable = toSassVariable('color-', color, settings);
      file.pushToSection('variables', `${variable}: ${value};`);
      file.pushToSection('colors', [
        toCssRule(`color-${color}`, 'color', variable, settings),
        toCssRule(`bg-${color}`, 'background-color', variable, settings),
        toCssRule(`fill-${color}`, 'fill', variable, settings)
      ]);
    });
  }

  if (config.fontFamilies) {
    file.addSection('fontFamilies', 'Font family modifier classes');
    mapSortedEntries(config.fontFamilies, (font, { value }) => {
      const variable = toSassVariable('font-', font, settings);
      file.pushToSection('variables', `${variable}: ${value};`);
      file.pushToSection('fontFamilies', toCssRule(`font-${font}`, 'font-family', variable, settings));
    });
  }

  if (config.fontSizes) {
    file.addSection('fontSizes', 'Font size modifier classes');
    mapSortedEntries(config.fontSizes, (size, { value }) => {
      const variable = toSassVariable('font-size-', size, settings);
      file.pushToSection('variables', `${variable}: ${value};`);
      file.pushToSection('fontSizes', toCssRule(`fs-${size}`, 'font-size', variable, settings));
    });
  }

  if (config.fontWeights) {
    file.addSection('fontWeights', 'Font weight modifier classes');
    mapSortedEntries(config.fontWeights, (weight, { value }) => {
      const variable = toSassVariable('font-weight-', weight, settings);
      file.pushToSection('variables', `${variable}: ${value};`);
      file.pushToSection('fontWeights', toCssRule(`fw-${weight}`, 'font-weight', variable, settings));
    });
  }

  if (config.spacing) {
    file.addSection('spacing', 'Spacing modifier classes');
    mapSortedEntries(config.spacing, (spacing, { value }) => {
      const variable = toSassVariable('spacing-', spacing, settings);
      file.pushToSection('variables', `${variable}: ${value};`);
      file.pushToSection('spacing', [
        toCssRule(`m-${spacing}`, 'margin', variable, settings),
        toCssRule(`mt-${spacing}`, 'margin-top', variable, settings),
        toCssRule(`mb-${spacing}`, 'margin-bottom', variable, settings),
        toCssRule(`ml-${spacing}`, 'margin-left', variable, settings),
        toCssRule(`mr-${spacing}`, 'margin-right', variable, settings),
        toCssRule(`p-${spacing}`, 'padding', variable, settings),
        toCssRule(`pt-${spacing}`, 'padding-top', variable, settings),
        toCssRule(`pb-${spacing}`, 'padding-bottom', variable, settings),
        toCssRule(`pl-${spacing}`, 'padding-left', variable, settings),
        toCssRule(`pr-${spacing}`, 'padding-right', variable, settings)
      ]);
    });
  }

  return file.toString();
};
