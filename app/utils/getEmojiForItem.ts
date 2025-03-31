export const getEmojiForItem = (name: string): string => {
    const lower = name.toLowerCase();
  
    if (lower.includes('apple')) return '🍎';
    if (lower.includes('orange')) return '🍊';
    if (lower.includes('banana')) return '🍌';
    if (lower.includes('carrot')) return '🥕';
    if (lower.includes('broccoli')) return '🥦';
    if (lower.includes('cheese')) return '🧀';
    if (lower.includes('egg')) return '🥚';
    if (lower.includes('milk')) return '🥛';
    if (lower.includes('bread')) return '🍞';
    if (lower.includes('chicken')) return '🍗';
    if (lower.includes('fish')) return '🐟';
    if (lower.includes('beef')) return '🥩';
    if (lower.includes('lettuce')) return '🥬';
    if (lower.includes('tomato')) return '🍅';
    if (lower.includes('grape')) return '🍇';
    if (lower.includes('strawberry')) return '🍓';
    if (lower.includes('watermelon')) return '🍉';
  
    return '🍽️';
  };
  