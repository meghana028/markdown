import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarkdownEditor.css';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      if (markdown.trim() === '') {
        setHtml('');
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/convert', { markdown });
        setHtml(response.data.html);
      } catch (error) {
        console.error('Error converting markdown:', error);
      }
    };
    convertMarkdownToHtml();
  }, [markdown]);

  return (
    <div className="markdown-editor">
      <textarea
        className="editor"
        value={markdown} 
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Type your markdown here..."
      />
      <div className="preview" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default MarkdownEditor;