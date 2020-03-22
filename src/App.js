import React, { useRef, useState } from 'react';
import tachyons from './tachyons';
import './App.css';

function camelToKebab (str) {
  if (!str) return ''
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

function convertRule (obj) {
  if (!obj) return ''
  return camelToKebab(JSON.stringify(obj))
    .replace('":"', ': ')
    .replace('{', '')
    .replace('}', '')
    .replace(/['"]+/g, '')
    .concat(';');
}

function getCss (classes) {
  return classes
    .split(' ')
    .map(klass => convertRule(tachyons[`.${klass}`]))
    .join('\n')
};

const AppStyle = {
  margin: 'auto',
  maxWidth: '800px',
};

const inputStyle = {
  margin: '2rem 0 2rem 0',
  width: '100%'
};

const codeStyle = {
  fontFace: 'mono',
  height: '300px',
  width: '100%',
};

function App() {
  const [classes, setClasses] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const codeEl = useRef(null)
  const buttonEl = useRef(null)

  const handleChange = (e) => {
    setCopySuccess('');
    setClasses(e.target.value);
  }

  const handleCopy = (e) => {
    codeEl.current.select();
    document.execCommand('copy');
    buttonEl.current.focus();
    setCopySuccess('Copied!');
  }

  return (
    <div className="App" style={AppStyle}>
      <textarea onChange={handleChange} style={inputStyle} value={classes} />
      { document.queryCommandSupported('copy') &&
        <div>
          <button onClick={handleCopy} ref={buttonEl}>Copy to clipboard</button> 
          {copySuccess}
        </div>
      }
      <textarea ref={codeEl} style={codeStyle} value={getCss(classes)} />
    </div>
  );
}

export default App;

