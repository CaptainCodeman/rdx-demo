'use strict';

import firebase from './node_modules/firebase/package.json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'
import minify from 'rollup-plugin-minify-html-literals'
import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'

const production = !process.env.ROLLUP_WATCH;

const views = [
  'src/ui',
]

const state = [
  '@captaincodeman/rdx',
  '@captaincodeman/router',
  'reselect',
  'src/state',
]

const vendor = [
  'lit-element',
  'lit-html',
  'tslib',
  '@material/',
  'blocking-elements',
  'wicg-inert',
]

export default [{
  input: 'src/index.ts',
  output: {
    dir: 'public/scripts',
    format: 'esm',
    chunkFileNames: '[name].js',
    sourcemap: true,
  },
  manualChunks(id) {
    if (views.find(mod => id.includes(mod))) return 'views'
    if (state.find(mod => id.includes(mod))) return 'state'
    if (vendor.find(mod => id.includes(mod))) return 'vendor'
  },
  plugins: [
    alias({
      entries: [{
        find: 'lit-html/lib/shady-render.js',
        replacement: 'node_modules/lit-html/lit-html.js',
      }]
    }),
    replace({
      'FIREBASE_SDK_VERSION': firebase.version,
    }),
    resolve({
      dedupe: [
        'lit-element',
        'lit-html',
      ]
    }),
    production && minify(),
    typescript({ typescript: require('typescript') }),
    production && terser({
      output: {
        comments: false
      }
    }),
    production && size(),
  ]
}, {
  input: 'src/service-worker.ts',
  output: {
    file: 'public/service-worker.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    resolve(),
    production && minify(),
    typescript({
      typescript: require('typescript'),
      include: 'src/service-worker.ts',
      exclude: 'src/index.ts',
      lib: [
        "esnext",
        "webworker"
      ],
    }),
    production && terser({
      output: {
        comments: false
      }
    }),
    production && size(),
  ],
}]
