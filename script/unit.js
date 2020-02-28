const path = require("path");

function distResolve(dir = '') {
    return path.resolve(__dirname, '../dist', dir);
}

function rootResolve(dir = '') {
	return path.join(__dirname, '..', dir)
}

module.exports = {
    distResolve,
    rootResolve
}