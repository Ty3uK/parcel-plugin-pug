interface PugNode {
  type: string;
  line: number;
  column: number | null;
  filename: string | null;
}

interface PugBlock extends PugNode {
  type: 'Block';
  nodes: PugNode[];
}

interface PugBlockNode extends PugNode {
  block: PugBlock | null;
}

interface PugAttribute {
  name: string;
  val: string;
  mustEscape: boolean;
}

interface PugAttributedNode extends PugNode {
  attrs: PugAttribute[];
  attributeBlocks: string[];
}

interface PugCommonTag extends PugAttributedNode, PugBlockNode {
  selfClosing: boolean;
  isInline: boolean;
}

interface PugTag extends PugCommonTag {
  type: 'Tag';
  name: string;
}

declare module 'parcel-bundler/lib/Asset' {
  class Asset {
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

  export = Asset;
}

declare module 'parcel-bundler/lib/assets/HTMLAsset' {
  class HTMLAsset {
    constructor(name: string, pkg: string, options: any);

    process(): Promise<any>;

    contents: string;
  }
  export = HTMLAsset;
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
  function walkAST(
    ast: any,
    before?: (node: PugNode | PugBlock, replace?: any) => void,
    after?: (node: any, replace?: any) => void,
    options?: any
  ): void;
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

declare module 'pug-filters' {
  function runFilter(
    name: string,
    str: string,
    options: any,
    currentDirectory: string,
    funcName: string
  ): any;
  function handleFilters(ast: any, filters?: any): any;
}
