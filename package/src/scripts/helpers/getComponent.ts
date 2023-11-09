import * as components from './createComponents';

const getComponent = (pattern: string) => components[pattern as keyof typeof components];

export default getComponent;
