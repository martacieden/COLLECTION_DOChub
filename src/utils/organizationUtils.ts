// Утиліта для отримання кольорів та ініціалів для організацій

interface OrganizationAvatar {
  initial: string;
  color: string;
  textColor: string;
}

// Мапа кольорів для організацій (на основі зображення)
const organizationColors: Record<string, OrganizationAvatar> = {
  'Smith Family Office': {
    initial: 'S',
    color: '#CE2C31', // Червоний
    textColor: '#FFFFFF'
  },
  'Johnson Family Trust': {
    initial: 'J',
    color: '#218358', // Зелений/бірюзовий
    textColor: '#FFFFFF'
  },
  "Herwitz's Family": {
    initial: 'H',
    color: '#1150B9', // Світло-блакитний
    textColor: '#FFFFFF'
  },
  'Wayne Estate Management': {
    initial: 'W',
    color: '#D97706', // Помаранчевий
    textColor: '#FFFFFF'
  },
  'The Robertson Foundation': {
    initial: 'T',
    color: '#10B981', // Світло-зелений
    textColor: '#FFFFFF'
  },
  'Summation Partners': {
    initial: 'S',
    color: '#7C3AED', // Фіолетовий
    textColor: '#FFFFFF'
  }
};

/**
 * Отримує аватар для організації (ініціали та колір)
 */
export function getOrganizationAvatar(organizationName: string | undefined): OrganizationAvatar {
  if (!organizationName) {
    return {
      initial: '?',
      color: '#E0E1E6',
      textColor: '#60646C'
    };
  }

  // Перевіряємо точну відповідність
  if (organizationColors[organizationName]) {
    return organizationColors[organizationName];
  }

  // Якщо немає точного збігу, генеруємо на основі назви
  const words = organizationName.trim().split(/\s+/);
  let initial = '';
  
  // Беремо першу літеру першого слова
  if (words.length > 0 && words[0].length > 0) {
    initial = words[0][0].toUpperCase();
  }

  // Генеруємо колір на основі хешу назви
  const hash = organizationName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Використовуємо палітру кольорів
  const colors = [
    { color: '#CE2C31', textColor: '#FFFFFF' }, // Червоний
    { color: '#218358', textColor: '#FFFFFF' }, // Зелений
    { color: '#1150B9', textColor: '#FFFFFF' }, // Блакитний
    { color: '#D97706', textColor: '#FFFFFF' }, // Помаранчевий
    { color: '#10B981', textColor: '#FFFFFF' }, // Світло-зелений
    { color: '#7C3AED', textColor: '#FFFFFF' }, // Фіолетовий
    { color: '#DC2626', textColor: '#FFFFFF' }, // Темно-червоний
    { color: '#059669', textColor: '#FFFFFF' }, // Темно-зелений
    { color: '#0284C7', textColor: '#FFFFFF' }, // Темно-блакитний
    { color: '#EA580C', textColor: '#FFFFFF' }, // Темно-помаранчевий
  ];

  const colorIndex = Math.abs(hash) % colors.length;
  const selectedColor = colors[colorIndex];

  return {
    initial,
    color: selectedColor.color,
    textColor: selectedColor.textColor
  };
}



