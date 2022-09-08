export const showPagingIndex = (page, total, limit) => {
  let pages = [];
  let end = total >= limit ? limit : total;
  for (let i = 1; i <= end; i++) {
    pages.push(i);
  }
  let diff = page - pages[Math.floor((end - 1) / 2)];
  pages = pages.map((p) => p + diff);
  while (pages.includes(0)) {
    pages = pages.map((p) => p + 1);
  }
  while (pages.includes(total + 1)) {
    pages = pages.map((p) => p - 1);
  }
  return pages;
};
