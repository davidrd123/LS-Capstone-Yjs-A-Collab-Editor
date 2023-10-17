import Quill from 'quill'
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

// Initialize Yjs
// Initialize Yjs
const ydoc = new Y.Doc();
const ytext = ydoc.getText('quill');
const binding = new QuillBinding(ytext, quill);