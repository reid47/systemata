import { generate } from '../src';

export const getContent = (config: any) => generate(config)[0].content;
