'use client';

import React, { useState } from 'react';
import styles from './CalendarWrapper.module.css';
import SpiralBinder from '../SpiralBinder/SpiralBinder';
import HeroSection from '../HeroSection/HeroSection';
import CalendarGrid from '../CalendarGrid/CalendarGrid';
import NotesSection from '../NotesSection/NotesSection';
import { format, isBefore, isSameDay } from 'date-fns';
import { MONTH_THEMES } from '@/constants/calendarConfig';

const CalendarWrapper: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2022, 0, 1)); // Default to Jan 2022
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const theme = MONTH_THEMES[currentMonth.getMonth()] || MONTH_THEMES[0];

  const handleMonthChange = (newDate: Date) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMonth(newDate);
      setIsTransitioning(false);
    }, 300);
  };


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
    <div className={styles.pageContainer} style={{ '--primary': theme.primaryColor } as any}>
      <div className={`${styles.calendarCard} ${isTransitioning ? styles.flipping : ''}`}>
        <SpiralBinder />
        
        <HeroSection 
          month={format(currentMonth, 'MMMM')} 
          year={currentMonth.getFullYear()} 
          image={theme.heroImage}
          primaryColor={theme.primaryColor}
        />

        <div className={styles.contentLayout}>
          <div className={styles.notesPanel}>
            <NotesSection currentMonthKey={monthKey} />
          </div>
          <div className={styles.calendarPanel}>
            <CalendarGrid 
              currentMonth={currentMonth}
              onMonthChange={handleMonthChange}
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
