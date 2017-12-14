export = (bundler: any) => {
  bundler.addAssetType('pug', require.resolve('./PugAsset'));
  bundler.addAssetType('jade', require.resolve('./PugAsset'));
};
