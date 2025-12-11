// Утиліта для роботи з організаціями та їх кольоровими аватарками

interface OrganizationAvatar {
  initial: string;
  color: string;
}

// Мапа кольорів для відомих організацій
const organizationColors: Record<string, string> = {
  'Smith Family Office': '#FF6B6B', // Червоний
  'Johnson Family Trust': '#4ECDC4', // Бірюзовий
  "Herwitz's Family": '#45B7D1', // Синій
  'Wayne Estate Management': '#FFA07A', // Помаранчевий
  'The Robertson Foundation': '#98D8C8', // Зелений
  'Summation Partners': '#9B59B6', // Фіолетовий
};

// Палітра кольорів для генерації кольорів для невідомих організацій
const colorPalette = [
  '#FF6B6B', // Червоний
  '#4ECDC4', // Бірюзовий
  '#45B7D1', // Синій
  '#FFA07A', // Помаранчевий
  '#98D8C8', // Зелений
  '#9B59B6', // Фіолетовий
  '#F39C12', // Помаранчевий
  '#E74C3C', // Червоний
  '#3498DB', // Синій
  '#2ECC71', // Зелений
  '#E67E22', // Помаранчевий
  '#1ABC9C', // Бірюзовий
];

/**
 * Отримує ініціали організації (перша буква кожного слова)
 */
export function getOrganizationInitials(organizationName: string): string {
  if (!organizationName) return '';
  
  // Якщо назва починається з "The", пропускаємо його
  const name = organizationName.replace(/^The\s+/i, '');
  
  // Беремо перші букви кожного слова
  const words = name.split(/\s+/).filter(word => word.length > 0);
  if (words.length === 0) return '';
  
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  
  // Беремо першу букву першого та останнього слова
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * Отримує колір для організації
 * Якщо організація відома - повертаємо її колір, інакше генеруємо на основі назви
 */
export function getOrganizationColor(organizationName: string): string {
  if (!organizationName) return '#e0e1e6'; // Сірий за замовчуванням
  
  // Перевіряємо, чи є колір для цієї організації
  if (organizationColors[organizationName]) {
    return organizationColors[organizationName];
  }
  
  // Генеруємо колір на основі хешу назви
  let hash = 0;
  for (let i = 0; i < organizationName.length; i++) {
    hash = organizationName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colorPalette.length;
  return colorPalette[index];
}

/**
 * Отримує дані для аватарки організації
 */
export function getOrganizationAvatar(organizationName: string): OrganizationAvatar {
  return {
    initial: getOrganizationInitials(organizationName),
    color: getOrganizationColor(organizationName),
  };
}

