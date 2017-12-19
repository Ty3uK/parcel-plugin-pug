declare module 'parcel-bundler/src/Asset' {
  class HTMLAsset {
    constructor(name: string, pkg: string, options: any);
    parse(code: string): any;
    addDependency(path: string, options: Object): any;
    addURLDependency(url: string): string;

    name: string;
    isAstDirty: boolean;
    contents: string;
    ast: any;
    options: any;
    dependencies: Set<Object>;
  }

  export = HTMLAsset;
}

declare module 'posthtml-render' {
  function postHTMLRender(tree: any, options?: any): string;
  export = postHTMLRender;
}

declare module 'parcel-bundler/src/utils/is-url' {
  function isURL(url: string): boolean;
  export = isURL;
}

declare module 'pug-load' {
  class load {
    static string(str: string, options?: any): any;
  }

  export = load; 
}

declare module 'pug-lexer' {
  class Lexer {}
  export = Lexer;
}

declare module 'pug-parser' {
  class Parser {}
  export = Parser;
}

declare module 'pug-walk' {
  function walkAST(ast: any, before?: (node: any, replace?: any) => void, after?: (node: any, replace?: any) => void, options?: any): void;
  export = walkAST;
}

declare module 'pug-linker' {
  function link(ast: any): any;
  export = link;
}

declare module 'pug-code-gen' {
  function generateCode(ast: any, options: any): string;
  export = generateCode;
}

declare module 'pug-runtime/wrap' {
  function wrap(template: string, templateName?: string): Function;
  export = wrap;
}

