"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const chalk_1 = __importDefault(require("chalk"));
const resolveAppPath_1 = __importDefault(require("art-dev-utils/lib/resolveAppPath"));
const updateArtConfigRemove = require('../scaffold/react/updateArtConfigRemove');
/**
 * 拿到删除的模块，拼接路径，删除client，mock，更新art.config.js
 * @param {Object} moduleEntry  modules to be removed
 * @param {Boolean} removeDebug remove debug path folders or not
 * @param {Boolean} removePublic remove public path folders or not
 */
exports.removeFolders = (moduleEntry, removeDebug, removePublic) => {
    const modulesArr = Object.keys(moduleEntry);
    const appConfig = require(resolveAppPath_1.default('art.config.js'));
    for (const item of modulesArr) {
        const projectVirtualPath = appConfig.projectVirtualPath;
        const splitModuleName = item.split(`${projectVirtualPath}/`)[1];
        exports.remove('client', splitModuleName);
        exports.remove('mock', splitModuleName);
        if (removeDebug) {
            exports.remove('debug', item);
        }
        if (removePublic) {
            exports.remove('public', item);
        }
    }
    updateArtConfigRemove(moduleEntry);
};
exports.remove = (...paths) => {
    const commonPath = path_1.join(process.cwd(), ...paths);
    fs_extra_1.removeSync(commonPath);
    console.log(`clear ${chalk_1.default.green(commonPath)} folder...`);
};