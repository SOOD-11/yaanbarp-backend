
/**
 * Utility functions for the gamification system
 */

// Add points to the user's total
export function addPoints(amount: number, message: string): number {
  const currentPoints = Number(localStorage.getItem('tuluPoints') || '0');
  const newPoints = currentPoints + amount;
  localStorage.setItem('tuluPoints', newPoints.toString());
  
  // Check for level up
  const currentLevel = Number(localStorage.getItem('tuluLevel') || '1');
  const newLevel = Math.max(1, Math.floor(newPoints / 20) + 1);
  
  if (newLevel > currentLevel) {
    localStorage.setItem('tuluLevel', newLevel.toString());
    return newLevel; // Return new level if leveled up
  }
  
  return 0; // Return 0 if no level up occurred
}

// Get user points
export function getUserPoints(): number {
  return Number(localStorage.getItem('tuluPoints') || '0');
}

// Get user level
export function getUserLevel(): number {
  return Number(localStorage.getItem('tuluLevel') || '1');
}

// Get badge count
export function getBadgeCount(): number {
  return Math.floor(getUserPoints() / 30);
}

// Get streak days
export function getStreakDays(): number {
  return Number(localStorage.getItem('streakDays') || '1');
}

// Update streak
export function updateStreak(): number {
  const lastVisit = localStorage.getItem('lastVisit');
  const today = new Date().toDateString();
  
  if (lastVisit) {
    const lastDate = new Date(lastVisit);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day
      const currentStreak = getStreakDays();
      const newStreak = currentStreak + 1;
      localStorage.setItem('streakDays', newStreak.toString());
      
      if (newStreak % 5 === 0) {
        // Milestone streak bonus
        addPoints(newStreak, `${newStreak} day streak bonus!`);
      }
      
      localStorage.setItem('lastVisit', today);
      return newStreak;
    } else if (diffDays > 1) {
      // Streak broken
      localStorage.setItem('streakDays', '1');
      localStorage.setItem('lastVisit', today);
      return 1;
    } else {
      // Same day, maintain streak
      localStorage.setItem('lastVisit', today);
      return getStreakDays();
    }
  } else {
    // First visit
    localStorage.setItem('lastVisit', today);
    localStorage.setItem('streakDays', '1');
    return 1;
  }
}
