  // ── THEME TOGGLE ──────────────────────────────────────────────
  const THEMES = ['system', 'light', 'dark'];
  const THEME_ICONS = { system: '&#9680;', light: '&#9728;', dark: '&#9790;' };
  let currentTheme = localStorage.getItem('theme') || 'system';

  function applyTheme(theme) {
    const html = document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    html.setAttribute('data-color-mode', isDark ? 'dark' : 'light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = THEME_ICONS[theme];
    const logo = document.getElementById('navLogo');
    if (logo) logo.src = isDark ? '/assets/logo.svg' : '/assets/logo-light.svg';
  }

  document.getElementById('themeToggle').addEventListener('click', () => {
    currentTheme = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentTheme === 'system') applyTheme('system');
  });

  applyTheme(currentTheme);

  // ── MOBILE NAV ────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Smooth active nav highlight
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
    });
    navItems.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--color-fg-default)' : '';
    });
  });

  // Contact form -> mailto fallback
  function handleContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    if (!name || !email || !message) { alert('Please fill in all required fields.'); return; }
    const mailto = `mailto:mirzailhami@gmail.com?subject=${encodeURIComponent(subject || 'Contact from mirzailhami.com')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
  }

  // Animate on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card:not(.project-skel), .research-card, .role-item, .education-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });

  // ── LIVE DATA: GITHUB REPOS + TOPCODER ───────────────────────

  const LANG_DOT_MAP = {
    Python: 'python', TypeScript: 'ts', JavaScript: 'js',
    HTML: 'html', CSS: 'css', Shell: 'shell',
  };

  const FRAMEWORK_MAP = {
    react: 'React', angular: 'Angular', 'node': 'Node.js', nodejs: 'Node.js',
    express: 'Express', flutter: 'Flutter', django: 'Django', fastapi: 'FastAPI',
    docker: 'Docker', kubernetes: 'Kubernetes', aws: 'AWS', firebase: 'Firebase',
    postgresql: 'PostgreSQL', mongodb: 'MongoDB', nestjs: 'NestJS',
    nextjs: 'Next.js', vue: 'Vue.js', kafka: 'Kafka', graphql: 'GraphQL',
    cordova: 'Cordova', react_native: 'React Native', prisma: 'Prisma',
  };

  const AI_MAP = {
    llama: 'Llama 3', llama3: 'Llama 3', bedrock: 'AWS Bedrock',
    claude: 'Claude API', replicate: 'Replicate', langchain: 'LangChain',
    openai: 'OpenAI', huggingface: 'HuggingFace', copilot: 'GitHub Copilot',
    recommendation: 'Rec. Systems', tensorflow: 'TensorFlow', pytorch: 'PyTorch',
    'aws-bedrock': 'AWS Bedrock', guardrail: 'AI Guardrails',
  };

  const GH_SVG = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`;

  function repoIcon(r) {
    const n = r.name.toLowerCase(), d = (r.description || '').toLowerCase();
    const text = n + ' ' + d;
    if (text.includes('guardrail') || text.includes('security')) return '🛡️';
    if (text.includes('reviewer') || text.includes('review')) return '🔍';
    if (text.includes('recruit') || text.includes('hr')) return '👤';
    if (text.includes('onboard') || text.includes('crowdsourc')) return '🚀';
    if (text.includes('github') || text.includes('skill')) return '⚙️';
    if (text.includes('outlook') || text.includes('signature')) return '✉️';
    if (text.includes('llama') || text.includes('ai') || text.includes('gpt')) return '🤖';
    if (text.includes('youtube') || text.includes('video')) return '🎬';
    const icons = { Python: '🐍', TypeScript: '🔷', JavaScript: '⚡', HTML: '🌐' };
    return icons[r.language] || '📦';
  }

  function titleCase(str) {
    return str.replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .replace(/\bAi\b/g, 'AI').replace(/\bMl\b/g, 'ML')
      .replace(/\bApi\b/g, 'API').replace(/\bGithub\b/g, 'GitHub')
      .replace(/\bCli\b/g, 'CLI').replace(/\bDb\b/g, 'DB');
  }

  // ── TOPCODER STATS ───────────────────────────────────────────
  async function loadTopcoderStats() {
    try {
      // v6 single endpoint returns DEVELOP, COPILOT, maxRating in one array response
      const resp = await fetch('https://api.topcoder.com/v6/members/mirzailhami/stats');
      if (!resp.ok) throw new Error('Topcoder API ' + resp.status);
      const data = await resp.json();
      const s = Array.isArray(data) ? data[0] : data;

      const wins     = s.DEVELOP?.wins ?? 0;
      const rating   = s.maxRating?.rating ? Math.round(s.maxRating.rating) : 0;
      const projects = s.COPILOT?.contests ?? 0;
      const fulfillmentPct = s.COPILOT?.fulfillment != null
        ? Math.round(s.COPILOT.fulfillment) + '%' : null;

      const set = (id, v) => { const el = document.getElementById(id); if (el && v) el.textContent = v; };
      set('tc-wins',        wins     || null);
      set('tc-rating',      rating   ? rating.toLocaleString() : null);
      set('tc-fulfillment', fulfillmentPct);
      set('tc-projects',    projects || null);
    } catch (e) { /* keep fallback values */ }
  }

  // ── GITHUB REPOS: LANGUAGE BAR + TECH TAGS + PROJECTS ────────
  async function loadGitHubData() {
    try {
      const resp = await fetch('https://api.github.com/users/mirzailhami/repos?per_page=100&sort=pushed');
      if (!resp.ok) throw new Error('GitHub API ' + resp.status);
      const repos = await resp.json();

      renderFrameworkTags(repos);
      renderAITags(repos);
      renderProjects(repos);
    } catch (e) {
      console.warn('GitHub data unavailable:', e.message);
      // Show fallback tags on error
      const fb = (id, tags) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
      };
      fb('frameworks-container', ['React','Node.js','Angular','AWS','Docker','Firebase']);
      fb('ai-ml-container', ['Llama 3','AWS Bedrock','Claude API','LangChain']);
      // Show static project cards as fallback
      const grid = document.getElementById('projects-grid');
      if (grid) grid.querySelectorAll('.project-skel').forEach(el => {
        el.style.opacity = '1'; el.style.transform = 'translateY(0)';
      });
    }
  }

  function inferTags(repos, map) {
    const found = new Map();
    repos.forEach(r => {
      const text = [r.name, r.description || '', ...(r.topics || [])].join(' ').toLowerCase();
      for (const [key, label] of Object.entries(map)) {
        if (text.includes(key) && !found.has(label)) found.set(label, true);
      }
    });
    return [...found.keys()];
  }

  function renderFrameworkTags(repos) {
    const el = document.getElementById('frameworks-container');
    if (!el) return;
    const tags = inferTags(repos, FRAMEWORK_MAP);
    el.innerHTML = (tags.length ? tags : ['React','Node.js','Angular','AWS','Docker','Firebase'])
      .slice(0, 10).map(t => `<span class="tech-tag">${t}</span>`).join('');
  }

  function renderAITags(repos) {
    const el = document.getElementById('ai-ml-container');
    if (!el) return;
    const tags = inferTags(repos, AI_MAP);
    el.innerHTML = (tags.length ? tags : ['Llama 3','AWS Bedrock','Claude API'])
      .slice(0, 10).map(t => `<span class="tech-tag">${t}</span>`).join('');
  }

  const PRIZE_BADGES = {
    'ai-enterprise-guardrails-for-gitHub-copilot': '<img src="https://img.shields.io/badge/🥇%201st%20Place-Topcoder%20Challenge-gold?style=flat-square&logo=topcoder&logoColor=white&labelColor=161b22" alt="1st Place Topcoder" style="width:175px;margin-bottom:24px;display:block;border-radius:4px;">',
    'llama3-recruitment-app': '<img src="https://img.shields.io/badge/🥇%201st%20Place-Topcoder%20Challenge-gold?style=flat-square&logo=topcoder&logoColor=white&labelColor=161b22" alt="1st Place Topcoder" style="width:175px;margin-bottom:24px;display:block;border-radius:4px;">',
    'ai-crowdsourcing-onboarding': '<img src="https://img.shields.io/badge/🥈%202nd%20Prize-Wazoku%20Challenge-silver?style=flat-square&logoColor=white&labelColor=444" alt="2nd Prize Wazoku" style="width:175px;margin-bottom:24px;display:block;border-radius:4px;">',
  };

  function renderProjects(repos) {
    const EXCLUDED = new Set(['mirzailhami','mirzailhami.github.io','platform-ui','tc-vscode-ideation']);
    const scored = repos
      .filter(r => !r.fork && r.description && r.language && !EXCLUDED.has(r.name))
      .map(r => ({ ...r, _score: r.stargazers_count * 2 + r.forks_count }))
      .sort((a, b) => b._score - a._score || new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6);

    const grid = document.getElementById('projects-grid');
    if (!grid || !scored.length) return;

    grid.innerHTML = scored.map((r, i) => {
      const dotClass = LANG_DOT_MAP[r.language] || '';
      const stars = r.stargazers_count > 0
        ? `<span class="project-star">⭐ ${r.stargazers_count}${r.forks_count > 0 ? ` &nbsp;⑂ ${r.forks_count}` : ''}</span>` : '';
      const badge = PRIZE_BADGES[r.name] || '';
      return `
      <div class="project-card">
        ${badge}
        <div class="project-header">
          <div class="project-icon" style="background:rgba(88,166,255,0.1);">${repoIcon(r)}</div>
          <div class="project-links">
            <a href="${r.html_url}" target="_blank" class="project-link" title="GitHub">${GH_SVG}</a>
            ${r.homepage ? `<a href="${r.homepage}" target="_blank" class="project-link" title="Live">↗</a>` : ''}
          </div>
        </div>
        <h3><a href="${r.html_url}" target="_blank" rel="noopener" class="project-title-link">${titleCase(r.name)}</a></h3>
        <p>${r.description}</p>
        <div class="project-footer">
          <span class="lang-dot ${dotClass}">${r.language}</span>
          ${stars}
        </div>
      </div>`;
    }).join('');

    // Animate new cards
    grid.querySelectorAll('.project-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(el);
    });
  }

  loadTopcoderStats();
  loadGitHubData();

  // ── BLOG POSTS: DYNAMIC FROM /blog/posts.json ─────────────────
  async function loadBlogPosts() {
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    try {
      const resp = await fetch('/blog/posts.json');
      if (!resp.ok) throw new Error('posts.json ' + resp.status);
      const posts = await resp.json();
      const limit = grid.dataset.limit ? parseInt(grid.dataset.limit, 10) : posts.length;
      grid.innerHTML = posts.slice(0, limit).map(p => `
        <div class="blog-card" onclick="location.href='/blog/${p.slug}/'" role="link" tabindex="0" style="cursor:pointer">
          <div class="blog-card-body">
            <span class="blog-category">${p.category}</span>
            <h3><a href="/blog/${p.slug}/">${p.title}</a></h3>
            <p>${p.excerpt}</p>
            <div class="blog-meta">
              <span>${p.model || 'Mirza Ilhami'}</span>
              <span>·</span>
              <span>${p.date}</span>
              <span>·</span>
              <span>${p.readTime} min read</span>
            </div>
          </div>
        </div>`).join('');
      grid.querySelectorAll('.blog-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
      });
    } catch (e) {
      // static fallback cards (if any) stay intact
      console.warn('Blog posts unavailable:', e.message);
    }
  }

  loadBlogPosts();
