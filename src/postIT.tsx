import React from 'react';

interface PostItProps {
  id: string;
  text: string;
  x: number;
  y: number;
  onDelete: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
}

const PostIt: React.FC<PostItProps> = ({ id, text, x, y, onDelete, onTextChange }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 200,
        height: 200,
        border: '1px solid #ccc',
        position: 'absolute',
        left: x,
        top: y,
        background: 'yellow',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
        padding: 8,
        boxSizing: 'border-box',
        borderRadius: 4
      }}
    >
      <button
        onClick={() => onDelete(id)}
        style={{
          float: 'right',
          border: 'none',
          background: 'transparent',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        ×
      </button>
      <textarea
        value={text}
        onChange={(e) => onTextChange(id, e.target.value)}
        style={{
          width: '100%',
          height: '80%',
          resize: 'none',
          border: 'none',
          background: 'transparent',
          outline: 'none',
          fontFamily: 'inherit',
          fontSize: 14
        }}
      />
    </div>
  );
};

export default PostIt;
