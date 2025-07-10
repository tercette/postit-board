import React, { useEffect, useState } from 'react';
import PostIt from './postIT';


export interface PostItData {
  id: string;
  text: string;
  x: number;
  y: number;
}

function App() {
  const [postIts, setPostIts] = useState<PostItData[]>([]);

  // Cria um post-it centralizado se nenhum estiver salvo
  useEffect(() => {
    const saved = localStorage.getItem('postIts');
    if (saved) {
      setPostIts(JSON.parse(saved));
    } else {
      // Cria centralizado (ajustado para 200x200)
      const centerX = window.innerWidth / 2 - 100;
      const centerY = window.innerHeight / 2 - 100;
      setPostIts([{ id: `${Date.now()}`, text: '', x: centerX, y: centerY }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('postIts', JSON.stringify(postIts));
  }, [postIts]);

  const createPostIt = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left - 100;
    const y = e.clientY - rect.top - 100;

    const newPostIt: PostItData = {
      id: `${Date.now()}`,
      text: '',
      x,
      y
    };
    setPostIts([...postIts, newPostIt]);
  };

  const deletePostIt = (id: string) => {
    setPostIts(postIts.filter(p => p.id !== id));
  };

  const updateText = (id: string, text: string) => {
    setPostIts(prev =>
      prev.map(p => (p.id === id ? { ...p, text } : p))
    );
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh', position: 'relative' }}
      onClick={createPostIt}
    >
      {postIts.map(postIt => (
        <PostIt
          key={postIt.id}
          id={postIt.id}
          text={postIt.text}
          x={postIt.x}
          y={postIt.y}
          onDelete={deletePostIt}
          onTextChange={updateText}
        />
      ))}
    </div>
  );
}

export default App;
