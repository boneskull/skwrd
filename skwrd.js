#!/usr/bin/env node

'use strict';

const { remote } = require('webdriverio');
require('dotenv').config();

const LOGIN_URL =
  process.env.SKWRD_LOGIN_URL ||
  'https://www2.swrdc.wa-k12.net/scripts/cgiip.exe/WService=wridgefs71/fwemnu01.w';
const USERNAME = process.env.SKWRD_USERNAME;
const PASSWORD = process.env.SKWRD_PASSWORD;

if (!USERNAME || !PASSWORD) {
  throw new Error('Missing env var(s) SKWRD_USERNAME and SKWRD_PASSWORD');
}

(async () => {
  const browser = await remote({
    logLevel: 'error',
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu'],
      },
    },
  });

  console.error('Logging in...');
  await browser.url(LOGIN_URL);

  await (await browser.$('#login')).keys(USERNAME);
  const $pw = await browser.$('#password');
  await $pw.click();
  await $pw.keys(PASSWORD);
  await (await browser.$('#bLogin')).click();

  await browser.pause(4000);

  await browser.switchWindow('Family Access');

  console.error('Checking dashboard...');
  try {
    await browser.$('svg.wellnessPass');
    console.error('Form already submitted');
  } catch (ignored) {
    await (await browser.$('#bSaveWS')).click();
    await browser.pause(2000);
    try {
      await browser.$('svg.wellnessPass');
      console.error('Attested successfully');
    } catch (err) {
      console.error('Failed to submit form!');
      console.error(err);
      process.exitCode = 1;
    }
  } finally {
    browser.deleteSession();
  }
})();
