// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
var application_1 = require("@jupyterlab/application");
require("font-awesome/css/font-awesome.min.css");
require("@jupyterlab/default-theme/style/index.css");
es6_promise_1.polyfill();
/* tslint:disable */
var mods = [
    require('@jupyterlab/about-extension'),
    require('@jupyterlab/application-extension'),
    require('@jupyterlab/apputils-extension'),
    require('@jupyterlab/codemirror-extension'),
    require('@jupyterlab/completer-extension'),
    require('@jupyterlab/console-extension'),
    require('@jupyterlab/csvwidget-extension'),
    require('@jupyterlab/docmanager-extension'),
    require('@jupyterlab/docregistry-extension'),
    require('@jupyterlab/editorwidget-extension'),
    require('@jupyterlab/faq-extension'),
    require('@jupyterlab/filebrowser-extension'),
    require('@jupyterlab/help-extension'),
    require('@jupyterlab/imagewidget-extension'),
    require('@jupyterlab/inspector-extension'),
    require('@jupyterlab/landing-extension'),
    require('@jupyterlab/launcher-extension'),
    require('@jupyterlab/markdownwidget-extension'),
    require('@jupyterlab/notebook-extension'),
    require('@jupyterlab/rendermime-extension'),
    require('@jupyterlab/running-extension'),
    require('@jupyterlab/services-extension'),
    require('@jupyterlab/shortcuts-extension'),
    require('@jupyterlab/terminal-extension'),
    require('@jupyterlab/tooltip-extension')
];
/* tslint:enable */
/**
 * Create an application object.
 *
 * @param loader - The module loader for the application.
 *
 * @returns A new application object.
 */
function createLab(loader) {
    var lab = new application_1.JupyterLab({
        loader: loader,
        gitDescription: process.env.GIT_DESCRIPTION,
        namespace: 'jupyterlab',
        version: process.env.JUPYTERLAB_VERSION
    });
    lab.registerPluginModules(mods);
    return lab;
}
exports.createLab = createLab;
