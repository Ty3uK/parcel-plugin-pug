export Asset = parseInt(process.versions.node, 10) < 8 ? require('parcel-bundler/lib/assets/JSAsset') : require('parcel-bundler/src/assets/JSAsset');
