(() => {
  const tocList = document.getElementById('postTocList');
  if (!tocList) {
    return;
  }

  const slugCounts = new Map();
  const slugify = (text) => {
    const base = (text || 'section')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'section';

    const count = slugCounts.get(base) || 0;
    slugCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  const headings = Array.from(document.querySelectorAll('.post-content h2, .post-references h2'));
  const tocLinks = [];

  headings.forEach((heading) => {
    if (!heading.id) {
      heading.id = slugify(heading.textContent);
    }

    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent || '';
    item.appendChild(link);
    tocList.appendChild(item);
    tocLinks.push(link);
  });

  const setActive = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

    if (visible) {
      setActive(visible.target.id);
    }
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: [0.1, 0.4, 0.7]
  });

  headings.forEach((heading) => observer.observe(heading));
  if (headings[0]) {
    setActive(headings[0].id);
  }
})();
