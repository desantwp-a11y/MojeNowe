const entries = [
  {
    name: 'Polska AI News',
    type: 'channel',
    description: 'Aktualności o AI, LLM i startupach technologicznych.',
    topic: 'Technologia',
    language: 'PL',
    link: 'https://t.me/example_ai_news'
  },
  {
    name: 'Frontend Dev Polska',
    type: 'group',
    description: 'Pomoc i dyskusje o HTML, CSS, React, Vue.',
    topic: 'Programowanie',
    language: 'PL',
    link: 'https://t.me/example_frontend_pl'
  },
  {
    name: 'Crypto Watch Europe',
    type: 'channel',
    description: 'Analizy rynku krypto i wiadomości makro.',
    topic: 'Finanse',
    language: 'EN',
    link: 'https://t.me/example_crypto_watch'
  },
  {
    name: 'Remote Jobs Hub',
    type: 'group',
    description: 'Oferty pracy zdalnej w IT i digital marketingu.',
    topic: 'Kariera',
    language: 'EN',
    link: 'https://t.me/example_remote_jobs'
  }
];

const queryInput = document.getElementById('query');
const typeSelect = document.getElementById('type');
const languageSelect = document.getElementById('language');
const resultsContainer = document.getElementById('results');
const resultsCount = document.getElementById('results-count');

function populateLanguages() {
  const languages = [...new Set(entries.map((entry) => entry.language))].sort();
  languages.forEach((lang) => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    languageSelect.appendChild(option);
  });
}

function normalize(text) {
  return text.toLowerCase().trim();
}

function searchEntries() {
  const query = normalize(queryInput.value);
  const selectedType = typeSelect.value;
  const selectedLanguage = languageSelect.value;

  const filtered = entries.filter((entry) => {
    const matchesQuery =
      query.length === 0 ||
      [entry.name, entry.description, entry.topic, entry.language]
        .join(' ')
        .toLowerCase()
        .includes(query);

    const matchesType = selectedType === 'all' || entry.type === selectedType;
    const matchesLanguage = selectedLanguage === 'all' || entry.language === selectedLanguage;

    return matchesQuery && matchesType && matchesLanguage;
  });

  renderResults(filtered);
}

function renderResults(items) {
  resultsContainer.innerHTML = '';
  resultsCount.textContent = `Znaleziono: ${items.length}`;

  if (!items.length) {
    resultsContainer.innerHTML = '<p>Brak wyników. Spróbuj innego zapytania.</p>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML = `
      <h3>${item.name}</h3>
      <div class="meta">
        <span class="tag">${item.type === 'channel' ? 'Kanał' : 'Grupa'}</span>
        <span class="tag">${item.topic}</span>
        <span class="tag">${item.language}</span>
      </div>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank" rel="noreferrer">Otwórz w Telegramie</a>
    `;

    resultsContainer.appendChild(card);
  });
}

queryInput.addEventListener('input', searchEntries);
typeSelect.addEventListener('change', searchEntries);
languageSelect.addEventListener('change', searchEntries);

populateLanguages();
renderResults(entries);
