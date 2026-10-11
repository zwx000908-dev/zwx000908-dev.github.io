(() => {
  'use strict';
  const languageButton = document.querySelector('.language-toggle');
  const navigation = document.querySelector('#main-nav');
  const toast = document.querySelector('.toast');
  let language = 'en';
  let toastTimer;
  function setLanguage(next) {
    language = next === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(element => { element.textContent = element.dataset[language]; });
    document.querySelector('.lang-en').classList.toggle('is-active', language === 'en');
    document.querySelector('.lang-zh').classList.toggle('is-active', language === 'zh');
    languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Chinese' : '切换到英文');
    navigation.setAttribute('aria-label', language === 'en' ? 'Main navigation' : '主导航');
    document.querySelectorAll('.copy-citation').forEach(button => button.setAttribute('aria-label', language === 'en' ? 'Copy BibTeX citation' : '复制 BibTeX 引用'));
  }
  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  // Every visit starts in English; an old browser preference cannot override it.
  setLanguage('en');
  document.querySelector('#current-year').textContent = String(new Date().getFullYear());
  const citations = {
    zou2026: `@article{zou2026strain,
  author = {Zhang, Shang-Shi and Zou, Wen-Xuan and Wan, Zi-Xuan and Yu, Can and Song, Jia-Lin and Liu, Xiang and Zeng, Cheng and Cao, Xiaohui and Feng, Pengju},
  title = {Strain-Release-Driven [4 + 1] Annulation: Leveraging Bicyclo[1.1.0]butanes as {C1} Synthons via {Rh(III)} Carbenoid},
  journal = {ACS Catalysis},
  year = {2026},
  volume = {16},
  number = {5},
  pages = {4925--4935},
  doi = {10.1021/acscatal.5c08928},
  url = {https://doi.org/10.1021/acscatal.5c08928}
}`,
    zou2024: `@article{zou2024platform,
  author = {Zou, Wen-Xuan and Hu, Qiong and Shen, Dan-Ting and Wu, Wen-Rong and Wei, Jiaohang and Yang, Zi-Feng and Bao, Mei-Zhu and Liu, Xiang and Zhang, Shang-Shi},
  title = {A Platform for the Synthesis of Diverse Phosphonyl and Thiofunctionalized Sulfoxonium Ylides},
  journal = {Organic Letters},
  year = {2024},
  volume = {26},
  number = {27},
  pages = {5811--5816},
  doi = {10.1021/acs.orglett.4c02000},
  url = {https://doi.org/10.1021/acs.orglett.4c02000}
}`
  };
  function showToast(message) {
    clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3000);
  }
  document.querySelectorAll('.copy-citation').forEach(button => {
    button.addEventListener('click', async () => {
      const citation = citations[button.dataset.citation];
      if (!citation) return;
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(citation);
        showToast(language === 'en' ? 'BibTeX citation copied.' : '已复制 BibTeX 引用。');
      } catch (_) {
        const dialog = document.querySelector('.citation-dialog');
        const field = dialog.querySelector('textarea');
        field.value = citation; dialog.showModal(); field.focus(); field.select();
      }
    });
  });
  const dialog = document.querySelector('.citation-dialog');
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  let scheduled = false;
  const sections = ['about', 'research', 'publications', 'projects'].map(id => document.getElementById(id));
  function updateNavigation() {
    scheduled = false;
    let active = '';
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 180) active = section.id; });
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = sections[sections.length - 1].id;
    }
    navigation.querySelectorAll('a').forEach(link => {
      if (link.hash === '#' + active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  updateNavigation();
})();
