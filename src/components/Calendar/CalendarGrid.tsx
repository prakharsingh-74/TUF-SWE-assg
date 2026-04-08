import React from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isWithinInterval,
  isBefore,
  addMonths,
  subMonths
} from 'date-fns';
import styles from './CalendarGrid.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarGridProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentMonth, 
  onMonthChange, 
  startDate, 
  endDate, 
  onDateClick 
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDateInView = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDateInView = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({
    start: startDateInView,
    end: endDateInView,
  });

  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const getDayClass = (day: Date) => {
    const classes = [styles.day];
    
    if (!isSameMonth(day, monthStart)) classes.push(styles.disabled);
    
    if (startDate && isSameDay(day, startDate)) classes.push(styles.selectedStart);
    if (endDate && isSameDay(day, endDate)) classes.push(styles.selectedEnd);
    
    if (startDate && endDate) {
      if (isWithinInterval(day, { start: startDate, end: endDate })) {
        classes.push(styles.inRange);
      }
    }
    
    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) classes.push(styles.weekend);

    return classes.join(' ');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => onMonthChange(subMonths(currentMonth, 1))} className={styles.navBtn}>
          <ChevronLeft size={20} />
        </button>
        <span className={styles.monthDisplay}>{format(currentMonth, 'MMMM yyyy')}</span>
        <button onClick={() => onMonthChange(addMonths(currentMonth, 1))} className={styles.navBtn}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className={styles.grid}>
        {dayNames.map(d => (
          <div key={d} className={`${styles.dayName} ${d === 'SAT' || d === 'SUN' ? styles.weekendName : ''}`}>
            {d}
          </div>
        ))}
        {days.map((day, idx) => (
          <div 
            key={idx} 
            className={getDayClass(day)}
            onClick={() => onDateClick(day)}
          >
            <span className={styles.dayNumber}>{format(day, 'd')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
