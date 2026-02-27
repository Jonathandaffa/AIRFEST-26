/* ============================================
   Hook: useCountdown
   Hitung mundur ke tanggal target
   Return: { days, hours, minutes, seconds, targetDateString }
   ============================================ */
import { useState, useEffect } from 'react';

export default function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculate(targetDate));

  function calculate(target) {
    const now = new Date();
    const diff = new Date(target) - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const totalSeconds = Math.floor(diff / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculate(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  /* Format tanggal target untuk ditampilkan */
  const targetDateString = new Date(targetDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return { ...timeLeft, targetDateString };
}