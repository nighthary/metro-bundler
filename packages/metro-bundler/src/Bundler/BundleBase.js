/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

const ModuleTransport = require('../lib/ModuleTransport');
const path = require('path');
const customConfig = require(path.resolve(process.cwd(), 'config.json'))
const ModuleMaps = customConfig && !customConfig.common && require(path.resolve(process.cwd(), customConfig.outputPath || 'modules.json'));
export type FinalizeOptions = {
  allowUpdates?: boolean,
  runBeforeMainModule?: Array<string>,
  runModule?: boolean,
};

export type GetSourceOptions = {
  inlineSourceMap?: boolean,
  dev: boolean,
};

class BundleBase {

  _assets: Array<mixed>;
  _finalized: boolean;
  _mainModuleId: number | void;
  _source: ?string;
  __modules: Array<ModuleTransport>;

  constructor() {
    this._finalized = false;
    this.__modules = [];
    this._assets = [];
    this._mainModuleId = undefined;
  }

  isEmpty() {
    return this.__modules.length === 0 && this._assets.length === 0;
  }

  getMainModuleId(): number | void {
    return this._mainModuleId;
  }

  setMainModuleId(moduleId: number) {
    this._mainModuleId = moduleId;
  }

  addModule(module: ModuleTransport): number {
    if (!(module instanceof ModuleTransport)) {
      throw new Error('Expected a ModuleTransport object');
    }

    // 打包环境才过滤(打基础包时不需要过滤)
    if(process.env.NODE_ENV === 'production' && customConfig && !customConfig.common){
        let _t = this.isBase(module)
        // 如果基础包中已经存在则不添加到modules中
        if(_t.length){
            return this.__modules
        }
    }

    return this.__modules.push(module) - 1;
  }

  isBase(module){
      return ModuleMaps.filter(elem => {
          return module.id === elem.id
      })
  }

  replaceModuleAt(index: number, module: ModuleTransport) {
    if (!(module instanceof ModuleTransport)) {
      throw new Error('Expeceted a ModuleTransport object');
    }

    this.__modules[index] = module;
  }

  getModules() {
    return this.__modules;
  }

  getAssets() {
    return this._assets;
  }

  addAsset(asset: mixed) {
    this._assets.push(asset);
  }

  finalize(options: FinalizeOptions) {
    if (!options.allowUpdates) {
      Object.freeze(this.__modules);
      Object.freeze(this._assets);
    }

    this._finalized = true;
  }

  getSource(options: GetSourceOptions) {
    this.assertFinalized();

    if (this._source) {
      return this._source;
    }

    this._source = this.__modules.map(module => module.code).join('\n');
    return this._source;
  }

  invalidateSource() {
    this._source = null;
  }

  assertFinalized(message?: string) {
    if (!this._finalized) {
      throw new Error(message || 'Bundle needs to be finalized before getting any source');
    }
  }

  setRamGroups(ramGroups: Array<string>) {}
}

module.exports = BundleBase;
