import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', typescript);

export const highlightTypeScript = (source: string) => hljs.highlight(source, { language: 'typescript' }).value;
