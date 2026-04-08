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
  addMonths,
  subMonths
} from 'date-fns';
import styles from './CalendarGrid.module.css';
import { ChevronLeft, ChevronRight, Star, Plus } from 'lucide-react';
import { HOLIDAYS } from '@/constants/calendarConfig';

interface CalendarGridProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
  onOpenPlanner: (date: Date) => void;
}


const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentMonth, 
  onMonthChange, 
  startDate, 
  endDate, 
  onDateClick,
  onOpenPlanner
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

  // Subscribe to event updates
  const [, setEventTick] = React.useState(0);
  React.useEffect(() => {
    const handleUpdate = () => setEventTick(tick => tick + 1);
    window.addEventListener('calendar-events-updated', handleUpdate);
    return () => window.removeEventListener('calendar-events-updated', handleUpdate);
  }, []);

  const getDayDetails = (day: Date) => {
    const dayStr = format(day, 'MM-dd');
    const dateKey = format(day, 'yyyy-MM-dd');
    const holiday = HOLIDAYS.find(h => h.date === dayStr);
    
    // Check if day has notes for markers
    const savedEvents = typeof window !== 'undefined' ? localStorage.getItem(`events-${dateKey}`) : null;
    const hasEvents = savedEvents ? JSON.parse(savedEvents).length > 0 : false;
    
    return { holiday, hasEvents };
  };


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
    
    const { holiday } = getDayDetails(day);
    if (holiday) classes.push(styles.holiday);

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
        {days.map((day, idx) => {
          const { holiday } = getDayDetails(day);
          return (
            <div 
              key={idx} 
              className={getDayClass(day)}
              onClick={() => onDateClick(day)}
              title={holiday?.name}
            >
              <span className={styles.dayNumber}>{format(day, 'd')}</span>
              {holiday && <Star className={styles.holidayIcon} size={10} />}
              
              <div className={styles.dayActions}>
                {getDayDetails(day).hasEvents && <div className={styles.eventMarker}></div>}
                <button 
                  className={styles.plannerBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPlanner(day);
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
