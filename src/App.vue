<script setup>
import { computed, ref } from 'vue'

const selectedRange = ref('30D')
const savedIdeas = ref([])

const rangeData = {
  '7D': {
    label: 'Sep 10 – Sep 17, 2026',
    views: '18.4K',
    viewsChange: '+12.8%',
    engagement: '8.42%',
    engagementChange: '+1.6%',
    revenue: '$642.80',
    revenueChange: '+9.4%',
    churn: '2.18%',
    churnChange: '-0.4%',
    chart: [24, 30, 28, 41, 36, 50, 48, 64, 58, 76, 72, 86],
    audience: [82, 64, 45, 31],
  },
  '30D': {
    label: 'Aug 19 – Sep 17, 2026',
    views: '84.6K',
    viewsChange: '+18.2%',
    engagement: '7.86%',
    engagementChange: '+2.1%',
    revenue: '$2,418.40',
    revenueChange: '+14.7%',
    churn: '2.64%',
    churnChange: '-1.2%',
    chart: [18, 29, 24, 38, 35, 48, 44, 55, 49, 63, 60, 72],
    audience: [76, 58, 43, 28],
  },
  '90D': {
    label: 'Jun 20 – Sep 17, 2026',
    views: '238.1K',
    viewsChange: '+26.4%',
    engagement: '7.12%',
    engagementChange: '+3.8%',
    revenue: '$6,982.10',
    revenueChange: '+21.3%',
    churn: '3.02%',
    churnChange: '-2.5%',
    chart: [14, 22, 31, 26, 42, 38, 48, 45, 57, 61, 68, 78],
    audience: [88, 69, 49, 36],
  },
}

const activeData = computed(() => rangeData[selectedRange.value])

const metrics = computed(() => [
  { label: 'Content views', value: activeData.value.views, change: activeData.value.viewsChange, note: 'vs previous period', icon: 'eye', tone: 'yellow', chart: true },
  { label: 'Engagement rate', value: activeData.value.engagement, change: activeData.value.engagementChange, note: 'above category avg.', icon: 'heart', tone: 'peach' },
  { label: 'Ad revenue', value: activeData.value.revenue, change: activeData.value.revenueChange, note: 'estimated this period', icon: 'coins', tone: 'orange' },
  { label: 'Subscriber churn', value: activeData.value.churn, change: activeData.value.churnChange, note: 'healthy is below 4%', icon: 'users', tone: 'cream' },
])

const trendIdeas = [
  { title: 'Books that raised me', tag: 'Storytime', color: 'yellow' },
  { title: 'POV: your TBR is staring', tag: 'BookTok', color: 'orange' },
  { title: 'Graphic novel shelf tour', tag: 'Tour', color: 'coral' },
]

const toggleSaved = (title) => {
  savedIdeas.value = savedIdeas.value.includes(title)
    ? savedIdeas.value.filter((idea) => idea !== title)
    : [...savedIdeas.value, title]
}

const isSaved = (title) => savedIdeas.value.includes(title)
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-mark" aria-label="Banana Books home"><span>BB</span></div>
      <nav class="main-nav" aria-label="Main navigation">
        <button class="nav-item active" aria-label="Overview"><span class="nav-icon">◒</span><span>Overview</span></button>
        <button class="nav-item" aria-label="Content"><span class="nav-icon">▤</span><span>Content</span></button>
        <button class="nav-item" aria-label="Audience"><span class="nav-icon">♧</span><span>Audience</span></button>
        <button class="nav-item" aria-label="Revenue"><span class="nav-icon">◫</span><span>Revenue</span></button>
      </nav>
      <button class="sidebar-settings" aria-label="Settings">⚙</button>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div class="breadcrumb"><span class="breadcrumb-dot"></span><span>Banana Books</span><span class="slash">/</span><span>Content studio</span></div>
        <div class="topbar-actions">
          <button class="icon-button" aria-label="Notifications">♢<span class="notification-dot"></span></button>
          <div class="profile-avatar">JM</div>
          <span class="profile-name">Jamie Miller</span>
          <button class="chevron" aria-label="Open profile menu">⌄</button>
        </div>
      </header>

      <div class="content-wrap">
        <section class="hero-row">
          <div>
            <p class="eyebrow">THURSDAY, SEPTEMBER 17, 2026</p>
            <h1>Good morning, Jamie <span class="sun">✦</span></h1>
            <p class="subheading">Here’s how your TikTok is helping more readers find their next favorite story.</p>
          </div>
          <div class="range-control" role="group" aria-label="Select date range">
            <span class="range-label">Showing</span>
            <button v-for="range in Object.keys(rangeData)" :key="range" :class="['range-button', { selected: selectedRange === range }]" @click="selectedRange = range">{{ range }}</button>
            <span class="range-date">{{ activeData.label }}</span>
          </div>
        </section>

        <section class="metric-grid" aria-label="Performance metrics">
          <article v-for="metric in metrics" :key="metric.label" :class="['metric-card', metric.tone]">
            <div class="metric-heading"><span>{{ metric.label }}</span><span :class="['metric-icon', metric.tone]">{{ metric.icon === 'eye' ? '◉' : metric.icon === 'heart' ? '♡' : metric.icon === 'coins' ? '◈' : '♧' }}</span></div>
            <div class="metric-value">{{ metric.value }}</div>
            <div class="metric-meta"><span class="change">{{ metric.change }}</span><span>{{ metric.note }}</span></div>
            <div v-if="metric.chart" class="sparkline" aria-label="Views trend chart">
              <span v-for="(height, index) in activeData.chart" :key="index" :style="{ height: `${height}%`, animationDelay: `${index * 45}ms` }"></span>
            </div>
          </article>
        </section>

        <section class="insights-grid">
          <article class="panel audience-panel">
            <div class="panel-header"><div><p class="eyebrow">WHO’S WATCHING</p><h2>Audience insights</h2></div><button class="more-button" aria-label="More audience insight options">•••</button></div>
            <div class="audience-content">
              <div class="donut-chart"><div class="donut-center"><strong>72%</strong><span>18–24 yrs</span></div></div>
              <div class="audience-legend">
                <div v-for="(item, index) in [{ label: '18–24 years', value: '72%' }, { label: '25–34 years', value: '18%' }, { label: '35–44 years', value: '7%' }, { label: 'Other', value: '3%' }]" :key="item.label" class="legend-item"><span :class="['legend-dot', `dot-${index}`]"></span><span>{{ item.label }}</span><strong>{{ item.value }}</strong></div>
              </div>
            </div>
            <div class="audience-footer"><span>Top city</span><strong>Portland, OR</strong><span class="audience-foot-spacer">+ 12 more</span></div>
          </article>

          <article class="panel posting-panel">
            <div class="panel-header"><div><p class="eyebrow">MAKE YOUR MOVE</p><h2>Best times to post</h2></div><span class="live-badge">● Live</span></div>
            <div class="posting-list">
              <div v-for="(time, index) in [{ day: 'Thursday', time: '6:00 PM', score: '92%', label: 'Prime time' }, { day: 'Saturday', time: '11:30 AM', score: '86%', label: 'Strong' }, { day: 'Sunday', time: '7:00 PM', score: '81%', label: 'Strong' }]" :key="time.day" class="posting-item"><div class="day-number">0{{ index + 1 }}</div><div class="posting-day"><strong>{{ time.day }}</strong><span>{{ time.time }}</span></div><div class="posting-score"><strong>{{ time.score }}</strong><span>{{ time.label }}</span></div><span class="row-arrow">↗</span></div>
            </div>
            <div class="tip-box"><span class="tip-icon">✦</span><span>Your audience is most active in the early evening. Try a behind-the-scenes clip today.</span></div>
          </article>
        </section>

        <section class="bottom-grid">
          <article class="panel trends-panel">
            <div class="panel-header"><div><p class="eyebrow">KEEP IT FRESH</p><h2>Trending right now</h2></div><button class="text-button">View all <span>→</span></button></div>
            <div class="trend-list">
              <div v-for="idea in trendIdeas" :key="idea.title" class="trend-item"><div :class="['trend-thumb', idea.color]"><span>{{ idea.color === 'yellow' ? '✦' : idea.color === 'orange' ? '▶' : '▦' }}</span></div><div class="trend-copy"><strong>{{ idea.title }}</strong><span>#{{ idea.tag }} · Trending in Books</span></div><button :class="['save-button', { saved: isSaved(idea.title) }]" :aria-label="isSaved(idea.title) ? 'Remove saved idea' : 'Save idea'" @click="toggleSaved(idea.title)">{{ isSaved(idea.title) ? '★' : '☆' }}</button></div>
            </div>
          </article>
          <article class="panel goal-panel">
            <div class="panel-header"><div><p class="eyebrow">SEPTEMBER GOAL</p><h2>Grow the circle</h2></div><span class="goal-icon">◌</span></div>
            <div class="goal-number">8,240 <span>/ 10k</span></div>
            <div class="progress-track"><div class="progress-fill"></div></div>
            <div class="goal-footer"><span><strong>+1,840</strong> new subscribers</span><span>82% complete</span></div>
            <div class="goal-note"><span>✺</span> You’re on track to hit your goal in 9 days.</div>
          </article>
        </section>
      </div>
    </main>
  </div>
</template>
