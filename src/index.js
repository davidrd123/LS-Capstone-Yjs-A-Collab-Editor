import Quill from 'quill'
// import { WebrtcProvider } from 'y-webrtc'
import { WebsocketProvider } from 'y-websocket'
import QuillCursors from 'quill-cursors'
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'


// Initialize Quill
Quill.register('modules/cursors', QuillCursors);
const quill = new Quill(document.querySelector('#editor'), {
  modules: {
    cursors: true,
    toolbar: [
      // adding some basic Quill content features
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ],
    history: {
      // Local undo shouldn't undo changes
      // from remote users
      userOnly: true
    }
  },
  placeholder: 'Start collaborating...',
  theme: 'snow' // 'bubble' is also great
});

// A Yjs document holds the shared document state
const ydoc = new Y.Doc();

// WebRTC provider for handling the connection
// const provider = new WebrtcProvider('quill-demo-room', ydoc)

// Websocket provider for handling the connection
const wsProvider = new WebsocketProvider('ws://localhost:1234', 'quill-demo-room', ydoc)

wsProvider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})

// Define a shared text type on the document
const ytext = ydoc.getText('quill');
const binding = new QuillBinding(ytext, quill);


// Accept hot updates
if (module.hot) {
  module.hot.accept();
}
