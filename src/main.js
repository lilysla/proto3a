const rangeData = {
  '7d': {
    views: { value: '182.4K', trend: '+18.4%' },
    engagement: { value: '7.8%', trend: '+2.7%' },
    revenue: { value: '$16.8K', trend: '+14.9%' },
    churn: { value: '4.8%', trend: '-0.9%' },
    audience: { teen: '46%', youngAdult: '38%', genre: 'Fantasy' },
    times: { tue: '6:30 PM', thu: '8:00 PM', sat: '9:15 PM' },
    audio: 'Cozy fantasy ambience',
    video: '“3 books I wish I’d found sooner”',
    bars: [64, 78, 58, 88, 72, 96, 82],
  },
  '30d': {
    views: { value: '481.2K', trend: '+26.1%' },
    engagement: { value: '9.4%', trend: '+4.2%' },
    revenue: { value: '$41.6K', trend: '+22.8%' },
    churn: { value: '3.9%', trend: '-1.6%' },
    audience: { teen: '49%', youngAdult: '41%', genre: 'Fantasy' },
    times: { tue: '7:00 PM', thu: '8:30 PM', sat: '9:45 PM' },
    audio: 'Soft-lit bookstore montage',
    video: '“BookTok ranking: my 5 favorite comfort reads”',
    bars: [72, 84, 76, 96, 88, 110, 98],
  },
  '90d': {
    views: { value: '1.28M', trend: '+37.5%' },
    engagement: { value: '11.7%', trend: '+6.1%' },
    revenue: { value: '$109.4K', trend: '+31.7%' },
    churn: { value: '2.8%', trend: '-2.4%' },
    audience: { teen: '51%', youngAdult: '43%', genre: 'Young Adult' },
    times: { tue: '7:45 PM', thu: '8:45 PM', sat: '10:00 PM' },
    audio: 'Warm indie bookstore loop',
    video: '“What I’m reading this month before summer”',
    bars: [88, 96, 92, 122, 112, 136, 128],
  },
};

const metricMap = {
  views: 'data-value="views"',
  engagement: 'data-value="engagement"',
  revenue: 'data-value="revenue"',
  churn: 'data-value="churn"',
};

const trendMap = {
  views: '[data-trend="views"]',
  engagement: '[data-trend="engagement"]',
  revenue: '[data-trend="revenue"]',
  churn: '[data-trend="churn"]',
};

const renderRange = (range) => {
  const data = rangeData[range];

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'bars') {
      const bars = document.querySelectorAll('.bar');
      bars.forEach((bar, index) => {
        const height = `${value[index]}%`;
        bar.style.height = height;
        bar.style.setProperty('animation-delay', `${index * 70}ms`);
      });
      return;
    }

    if (key === 'audio') {
      const title = document.querySelector('[data-audio-title]');
      if (title) title.textContent = value;
      return;
    }

    if (key === 'video') {
      const title = document.querySelector('[data-video-title]');
      if (title) title.textContent = value;
      return;
    }

    if (key === 'audience') {
      const teen = document.querySelector('[data-audience="teen"]');
      const youngAdult = document.querySelector('[data-audience="young-adult"]');
      const genre = document.querySelector('[data-audience="genre"]');
      teen.textContent = value.teen;
      youngAdult.textContent = value.youngAdult;
      genre.textContent = value.genre;
      return;
    }

    if (key === 'times') {
      Object.entries(value).forEach(([day, time]) => {
        const el = document.querySelector(`[data-time="${day}"]`);
        if (el) el.textContent = time;
      });
      return;
    }

    const metricNode = document.querySelector(`[data-value="${key}"]`);
    const trendNode = document.querySelector(`[data-trend="${key}"]`);
    if (metricNode) metricNode.textContent = value.value;
    if (trendNode) {
      trendNode.textContent = value.trend;
      trendNode.classList.toggle('positive', value.trend.includes('+'));
      trendNode.classList.toggle('negative', value.trend.includes('-'));
    }
  });
};

const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    renderRange(button.dataset.range);
  });
});

renderRange('7d');
