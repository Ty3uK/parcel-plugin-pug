export class Asset {
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
