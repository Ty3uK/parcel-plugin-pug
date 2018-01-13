module.exports.Asset = parseInt(process.versions.node, 10) < 8 ? require('parcel-bundler/lib/Asset') : require('parcel-bundler/src/Asset');
