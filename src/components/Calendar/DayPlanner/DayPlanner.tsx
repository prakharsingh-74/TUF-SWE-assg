import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X, Plus, Trash2 } from 'lucide-react';
import styles from './DayPlanner.module.css';
import { CalendarEvent } from '@/constants/calendarConfig';

interface DayPlannerProps {
  date: Date;
  onClose: () => void;
  primaryColor: string;
}

const DayPlanner: React.FC<DayPlannerProps> = ({ date, onClose, primaryColor }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newHoverText, setNewHoverText] = useState('');
  const dateKey = format(date, 'yyyy-MM-dd');

  useEffect(() => {
    const saved = localStorage.getItem(`events-${dateKey}`);
    if (saved) setEvents(JSON.parse(saved));
  }, [dateKey]);

  const saveEvents = (updated: CalendarEvent[]) => {
    setEvents(updated);
    localStorage.setItem(`events-${dateKey}`, JSON.stringify(updated));
    // Dispatch custom event to notify CalendarGrid to update its markers
    window.dispatchEvent(new Event('calendar-events-updated'));
  };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHoverText.trim()) return;
    
    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: newHoverText.trim(),
    };
    
    saveEvents([...events, newEvent]);
    setNewHoverText('');
  };

  const deleteEvent = (id: string) => {
    saveEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        style={{ '--primary': primaryColor } as React.CSSProperties}
      >
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.dayNum}>{format(date, 'd')}</span>
            <div className={styles.dateInfo}>
              <h2 className={styles.title}>{format(date, 'EEEE')}</h2>
              <p className={styles.subtitle}>{format(date, 'MMMM yyyy')}</p>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.paper}>
            <div className={styles.lines}>
              {events.length === 0 ? (
                <p className={styles.emptyState}>No plans for today yet...</p>
              ) : (
                <ul className={styles.eventList}>
                  {events.map((event) => (
                    <li key={event.id} className={styles.eventItem}>
                      <span className={styles.eventDot} style={{ backgroundColor: primaryColor }}></span>
                      <span className={styles.eventTitle}>{event.title}</span>
                      <button 
                        onClick={() => deleteEvent(event.id)} 
                        className={styles.deleteBtn}
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={styles.line}></div>
              ))}
            </div>
          </div>

          <form onSubmit={addEvent} className={styles.addForm}>
            <input
              type="text"
              className={styles.input}
              placeholder="What's the plan?"
              value={newHoverText}
              onChange={(e) => setNewHoverText(e.target.value)}
              autoFocus
            />
            <button type="submit" className={styles.addBtn} style={{ backgroundColor: primaryColor }}>
              <Plus size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DayPlanner;
