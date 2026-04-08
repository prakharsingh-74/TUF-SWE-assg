import React, { useState, useEffect } from 'react';
import styles from './NotesSection.module.css';

interface NotesSectionProps {
  currentMonthKey: string; // e.g., "2022-01"
}

const NotesSection: React.FC<NotesSectionProps> = ({ currentMonthKey }) => {
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${currentMonthKey}`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
  }, [currentMonthKey]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNotes(val);
    localStorage.setItem(`notes-${currentMonthKey}`, val);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notes</h2>
      <div className={styles.paper}>
        <textarea
          className={styles.textarea}
          value={notes}
          onChange={handleChange}
          placeholder="Jot down your memos for the month..."
          spellCheck={false}
        />
        <div className={styles.lines}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={styles.line}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
