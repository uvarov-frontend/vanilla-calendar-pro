import type { Calendar, ContextVariables } from '@src/index';

const setContext = <K extends keyof ContextVariables>(self: Calendar, name: K, value: ContextVariables[K]) => {
  (self.context as ContextVariables)[name] = value;
};

export default setContext;
