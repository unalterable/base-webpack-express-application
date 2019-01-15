import React from 'react';
import config from 'config';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import Application from '../../ui/Application.jsx';
import html from '../../ui/layout/basic.js';

module.exports = {
  async showIndex(req, res) {
    const title = config.get('title');
    const initialState = { text: 'alice' };
    const sheetsRegistry = new SheetsRegistry();
    const body = renderToString(
      <JssProvider registry={sheetsRegistry} >
        <Application {...initialState} />
      </ JssProvider>
    );
    res.send(html({ title, body, initialState, css: sheetsRegistry.toString() }));
  },
  async showData(req, res) {
    res.json({ hello: 'world' });
  },
};
