import * as components from '@scripts/helpers/createComponents';

const getComponent = (pattern: string) => components[pattern as keyof typeof components];

export default getComponent;
