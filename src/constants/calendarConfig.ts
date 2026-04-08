export interface MonthTheme {
  name: string;
  heroImage: string;
  primaryColor: string;
}

export const MONTH_THEMES: Record<number, MonthTheme> = {
  0: { name: 'January', heroImage: '/jan.png', primaryColor: '#0081C9' },
  1: { name: 'February', heroImage: '/feb.png', primaryColor: '#059669' },
  2: { name: 'March', heroImage: '/mar.png', primaryColor: '#db2777' },
  3: { name: 'April', heroImage: '/jan.png', primaryColor: '#0081C9' },
  4: { name: 'May', heroImage: '/mar.png', primaryColor: '#db2777' },
  5: { name: 'June', heroImage: '/jan.png', primaryColor: '#0081C9' },
  6: { name: 'July', heroImage: '/jan.png', primaryColor: '#0081C9' },
  7: { name: 'August', heroImage: '/jan.png', primaryColor: '#0081C9' },
  8: { name: 'September', heroImage: '/jan.png', primaryColor: '#0081C9' },
  9: { name: 'October', heroImage: '/jan.png', primaryColor: '#d97706' }, 
  10: { name: 'November', heroImage: '/jan.png', primaryColor: '#b45309' },
  11: { name: 'December', heroImage: '/jan.png', primaryColor: '#9f1239' },
};

export interface CalendarEvent {
  id: string;
  title: string;
}

export interface DayEvents {
  [date: string]: CalendarEvent[];
}

export interface Holiday {
  date: string; // "MM-DD"
  name: string;
}

export const HOLIDAYS: Holiday[] = [
  { date: '01-01', name: "New Year's Day" },
  { date: '01-26', name: "Republic Day" },
  { date: '02-14', name: "Valentine's Day" },
  { date: '03-08', name: "International Women's Day" },
  { date: '03-17', name: "St. Patrick's Day" },
];
