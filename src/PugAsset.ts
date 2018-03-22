import { Asset } from './Asset';
import HTMLAsset = require('parcel-bundler/lib/assets/HTMLAsset');

import load = require('pug-load');
import lexer = require('pug-lexer');
import parser = require('pug-parser');
import walk = require('pug-walk');
import linker = require('pug-linker');
import generateCode = require('pug-code-gen');
import wrap = require('pug-runtime/wrap');
import filters = require('pug-filters');

// A list of all attributes that may produce a dependency
// Based on https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
const ATTRS: { [tag: string]: string[] } = {
  'src': [
    'script',
    'img',
    'audio',
    'video',
    'source',
    'track',
    'iframe',
    'embed'
  ],
  'href': ['link', 'a', 'use'],
  'srcset': ['img', 'source'],
  'poster': ['video'],
  'xlink:href': ['use'],
  'content': ['meta']
};

// A regex to detect if a variable is a 'pure' string (no evaluation needed)
const PURE_STRING_REGEX: RegExp = /(^"([^"]+)"$)|(^'([^']+)'$)/g;

export = class PugAsset extends Asset {
  public type = 'html';

  constructor(name: string, pkg: string, options: any) {
    super(name, pkg, options);
  }

  public parse(code: string) {
    let ast = load.string(code, {
      lex: lexer,
      parse: parser,
      filename: this.name
    });

    ast = linker(ast);
    ast = filters.handleFilters(ast);

    return ast;
  }

  public collectDependencies(): void {
    walk(this.ast, node => {
      this.recursiveCollect(node);

      if (node.type === 'Tag') {
        const tag = node as PugTag;

        if (tag.attrs) {
          for (const attr of tag.attrs) {
            const elements = ATTRS[attr.name];
            if (elements && elements.indexOf(tag.name) > -1) {
              if (PURE_STRING_REGEX.test(attr.val)) {
                this.addURLDependency(attr.val.substring(1, attr.val.length - 1));
              }
            }
          }
        }
      }

      return node;
    });
  }

  public async process(): Promise<any> {
    await super.process();

    const htmlAsset = new HTMLAsset(this.name, this.package, this.options);
    htmlAsset.contents = this.generated.html;
    await htmlAsset.process();

    Object.assign(this, htmlAsset);

    return this.generated;
  }

  public generate() {
    const result = generateCode(this.ast, {
      compileDebug: false,
      pretty: !this.options.minify
    });

    return { html: wrap(result)() };
  }

  public shouldInvalidate(): boolean {
    return false;
  }

  private recursiveCollect(cNode: PugBlock | PugNode) {
    if (cNode.type === 'Block') {
      (cNode as PugBlock).nodes.forEach((n: PugNode) => this.recursiveCollect(n));
    } else {
      if (cNode.filename && cNode.filename !== this.name && !this.dependencies.has(cNode.filename)) {
        this.addDependency(cNode.filename, {
          name: cNode.filename,
          includedInParent: true,
        });
      }
    }
  }
};
