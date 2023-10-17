import * as Y from 'yjs'

import CodeMirror from 'codemirror'

// import { WebrtcProvider } from 'y-webrtc'
import { WebsocketProvider } from 'y-websocket'
import { IndexeddbPersistence } from 'y-indexeddb'


import { CodemirrorBinding } from 'y-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import './style.css'

// A Yjs document holds the shared document state
const ydoc = new Y.Doc();

// We persist the document to Indexeddb
const indexeddbProvider = new IndexeddbPersistence('quill-demo-room', ydoc)

// WebRTC provider for handling the connection
// const provider = new WebrtcProvider('quill-demo-room', ydoc)

// Websocket provider for handling the connection
const wsProvider = new WebsocketProvider('ws://localhost:1234', 'quill-demo-room', ydoc)

wsProvider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})

// Define a shared text type on the document
const yText = ydoc.getText('codemirror')

const editorContainer = document.querySelector('#editor')

const editor = CodeMirror(editorContainer, {
  mode: 'javascript',
  lineNumbers: true
})

// Bind the CodeMirror editor to a YText type.
const binding = new CodemirrorBinding(yText, editor, wsProvider.awareness)

// Save document updates to Indexeddb
indexeddbProvider.on('synced', () => {
  console.log('content from the database is loaded')
})

// Accept hot updates
if (module.hot) {
  module.hot.accept();
}
