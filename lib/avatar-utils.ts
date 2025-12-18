/**
 * Centralized avatar utilities
 * Handles avatar image paths, name detection, and initials generation
 */

/**
 * Determine if a name is female based on common patterns
 */
export function isFemaleName(name: string): boolean {
  const femaleIndicators = [
    'Fatima', 'Sultana', 'Begum', 'Akhter', 'Parvin', 'Rashida', 
    'Nasreen', 'Sharmin', 'Taslima', 'Khan', 'Jahan', 'Ara', 
    'Nahar', 'Akter', 'Khatun', 'Banu', 'Sultana', 'Jahanara'
  ];
  const nameParts = name.split(' ');
  return nameParts.some(part => 
    femaleIndicators.some(indicator => 
      part.toLowerCase().includes(indicator.toLowerCase())
    )
  );
}

/**
 * Get avatar image path based on name
 * Uses a hash of the name to consistently map to avatar files
 * Female names use F-suffixed avatars
 */
export function getAvatarPath(name: string): string {
  const isFemale = isFemaleName(name);
  
  // Create a simple hash from the name to consistently map to an avatar
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Map hash to avatar number (1-10)
  const avatarNumber = (Math.abs(hash) % 10) + 1;
  
  // Available avatars: 1.png, 2.png, 6.png, 7.png, 8.png, 9.png (male)
  //                    3-F.png, 4-F.png, 5-F.png, 10-F.png (female)
  const maleAvatars = [1, 2, 6, 7, 8, 9];
  const femaleAvatars = [3, 4, 5, 10];
  
  if (isFemale) {
    const femaleIndex = Math.abs(hash) % femaleAvatars.length;
    const avatarNum = femaleAvatars[femaleIndex];
    return `/avatars/${avatarNum}-F.png`;
  } else {
    const maleIndex = Math.abs(hash) % maleAvatars.length;
    const avatarNum = maleAvatars[maleIndex];
    return `/avatars/${avatarNum}.png`;
  }
}

/**
 * Get initials from a name (first letter of each word, max 2)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

