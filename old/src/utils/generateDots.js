export const generateDots = (number, containerWidth = 300, containerHeight = 300) => {
  const dots = [];
  const dotSize = Math.max(8, Math.min(20, 10 + (100 - number) / 10));
  const minDistance = dotSize * 1.5;

  for (let i = 0; i < number; i++) {
    let attempts = 0;
    let x, y, validPosition = false;

    while (!validPosition && attempts < 100) {
      x = Math.random() * (containerWidth - dotSize - 20) + 10;
      y = Math.random() * (containerHeight - dotSize - 20) + 10;

      validPosition = true;
      for (let j = 0; j < dots.length; j++) {
        const distance = Math.sqrt((x - dots[j].x) ** 2 + (y - dots[j].y) ** 2);
        if (distance < minDistance) {
          validPosition = false;
          break;
        }
      }
      attempts++;
    }

    if (validPosition) dots.push({ x, y, size: dotSize });
  }

  return dots;
};
