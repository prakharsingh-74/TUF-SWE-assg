'use client';

import React, { useState } from 'react';
import styles from './CalendarWrapper.module.css';
import SpiralBinder from './SpiralBinder';
import HeroSection from './HeroSection';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import { format, isBefore, isSameDay } from 'date-fns';

const CalendarWrapper: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2022, 0, 1)); // Default to Jan 2022 as per inspiration
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (isBefore(date, startDate)) {
        setStartDate(date);
        setEndDate(null);
      } else if (isSameDay(date, startDate)) {
        setStartDate(null);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  const monthKey = format(currentMonth, 'yyyy-MM');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.calendarCard}>
        <SpiralBinder />
        
        <HeroSection 
          month={format(currentMonth, 'MMMM')} 
          year={currentMonth.getFullYear()} 
        />

        <div className={styles.contentLayout}>
          <div className={styles.notesPanel}>
            <NotesSection currentMonthKey={monthKey} />
          </div>
          <div className={styles.calendarPanel}>
            <CalendarGrid 
              currentMonth={currentMonth}
              onMonthChange={setCurrentMonth}
              startDate={startDate}
              endDate={endDate}
              onDateClick={handleDateClick}
            />
          </div>
        </div>
        
        <div className={styles.footerLine}></div>
      </div>
      
      <div className={styles.credits}>
        Designed for a premium wall experience
      </div>
    </div>
  );
};

export default CalendarWrapper;
