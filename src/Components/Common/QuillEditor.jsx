import React, { forwardRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// Forward a ref to the underlying ReactQuill component.
// This satisfies React 18's strict mode requirement and silences the findDOMNode warning.
const QuillEditor = forwardRef((props, ref) => (
  <ReactQuill ref={ref} {...props} />
));

export default QuillEditor;
