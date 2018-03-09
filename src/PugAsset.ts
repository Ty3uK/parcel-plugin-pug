import url = require('url');
import path = require('path');

import { Asset } from './Asset';
import isURL = require('parcel-bundler/lib/utils/is-url');

import load = require('pug-load');
import lexer = require('pug-lexer');
import parser = require('pug-parser');
import walk = require('pug-walk');
import linker = require('pug-linker');
import generateCode = require('pug-code-gen');
import wrap = require('pug-runtime/wrap');
import filters = require('pug-filters');

interface Dictionary<T> {
  [key: string]: T;
}

// A list of all attributes that should produce a dependency
// Based on https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
const ATTRS: Dictionary<string[]> = {
  src: [
    'script',
    'img',
    'audio',
    'video',
    'source',
    'track',
    'iframe',
    'embed'
  ],
  href: ['link', 'a'],
  poster: ['video']
};

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
      const recursiveCollect = cNode => {
        if (cNode.nodes) {
          cNode.nodes.forEach(n => recursiveCollect(n));
        } else {
          if (cNode.filename && cNode.filename !== this.name && !this.dependencies.has(cNode.filename)) {
          this.addDependency(cNode.filename, {
            name: cNode.filename,
            includedInParent: true,
          });
        }
        }
      };

      recursiveCollect(node);

      if (node.attrs) {
        for (const attr of node.attrs) {
          const elements = ATTRS[attr.name];
          if (node.type === 'Tag' && elements && elements.indexOf(node.name) > -1) {
            let assetPath = attr.val.substring(1, attr.val.length - 1);
            assetPath = this.addURLDependency(assetPath);
            if (!isURL(assetPath)) {
              // Use url.resolve to normalize path for windows
              // from \path\to\res.js to /path/to/res.js
              assetPath = url.resolve(path.join(this.options.publicURL, assetPath), '');
            }
            attr.val = `'${assetPath}'`;
          }
        }
      }
      return node;
    });
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
};
