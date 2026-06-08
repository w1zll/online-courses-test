'use strict';

const INITIAL_VISIBLE_COUNT = 9;
const ALL_CATEGORY = 'All';

const categories = [
  ALL_CATEGORY,
  'Marketing',
  'Management',
  'HR & Recruiting',
  'Design',
  'Development',
];

const courses = [
  {
    title: 'The Ultimate Google Ads Training Course',
    category: 'Marketing',
    price: 100,
    author: 'Jerome Bell',
    image: './assets/card-images/image-1.png',
  },
  {
    title: 'Prduct Management Fundamentals',
    category: 'Management',
    price: 480,
    author: 'Marvin McKinney',
    image: './assets/card-images/image-2.png',
  },
  {
    title: 'HR Management and Analytics',
    category: 'HR & Recruiting',
    price: 200,
    author: 'Leslie Alexander Li',
    image: './assets/card-images/image-3.png',
  },
  {
    title: 'Brand Management & PR Communications',
    category: 'Marketing',
    price: 530,
    author: 'Kristin Watson',
    image: './assets/card-images/image-4.png',
  },
  {
    title: 'Graphic Design Basic',
    category: 'Design',
    price: 500,
    author: 'Guy Hawkins',
    image: './assets/card-images/image-5.png',
  },
  {
    title: 'Business Development Management',
    category: 'Management',
    price: 400,
    author: 'Dianne Russell',
    image: './assets/card-images/image-6.png',
  },
  {
    title: 'Highload Software Architecture',
    category: 'Development',
    price: 600,
    author: 'Brooklyn Simmons',
    image: './assets/card-images/image-7.png',
  },
  {
    title: 'Human Resources - Selection and Recruitment',
    category: 'HR & Recruiting',
    price: 150,
    author: 'Kathryn Murphy',
    image: './assets/card-images/image-8.png',
  },
  {
    title: 'User Experience. Human-centered Design',
    category: 'Design',
    price: 240,
    author: 'Cody Fisher',
    image: './assets/card-images/image-9.png',
  },
  {
    title: 'Content Marketing Strategy',
    category: 'Marketing',
    price: 320,
    author: 'Annette Black',
    image: './assets/card-images/image-1.png',
  },
  {
    title: 'Digital Marketing Analytics',
    category: 'Marketing',
    price: 390,
    author: 'Devon Lane',
    image: './assets/card-images/image-4.png',
  },
  {
    title: 'Strategic Leadership Essentials',
    category: 'Management',
    price: 450,
    author: 'Robert Fox',
    image: './assets/card-images/image-2.png',
  },
  {
    title: 'Talent Acquisition and Onboarding',
    category: 'HR & Recruiting',
    price: 280,
    author: 'Courtney Henry',
    image: './assets/card-images/image-3.png',
  },
  {
    title: 'Employee Engagement & Culture',
    category: 'HR & Recruiting',
    price: 340,
    author: 'Eleanor Pena',
    image: './assets/card-images/image-8.png',
  },
  {
    title: 'Recruitment Metrics and HR Reporting',
    category: 'HR & Recruiting',
    price: 420,
    author: 'Theresa Webb',
    image: './assets/card-images/image-6.png',
  },
  {
    title: 'JavaScript Application Architecture',
    category: 'Development',
    price: 560,
    author: 'Albert Flores',
    image: './assets/card-images/image-7.png',
  },
  {
    title: 'Frontend Performance Optimization',
    category: 'Development',
    price: 520,
    author: 'Wade Warren',
    image: './assets/card-images/image-9.png',
  },
];

const tabsNode = document.querySelector('#categoryTabs');
const gridNode = document.querySelector('#coursesGrid');
const searchNode = document.querySelector('#courseSearch');
const emptyNode = document.querySelector('#coursesEmpty');
const loadMoreNode = document.querySelector('#loadMore');

const state = {
  activeCategory: ALL_CATEGORY,
  query: '',
  visibleCount: INITIAL_VISIBLE_COUNT,
};

const getCategoryModifier = (category) =>
  category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getCategoryCounts = () =>
  categories.reduce((counts, category) => {
    counts[category] =
      category === ALL_CATEGORY
        ? courses.length
        : courses.filter((course) => course.category === category).length;
    return counts;
  }, {});

const getFilteredCourses = () => {
  const normalizedQuery = state.query.trim().toLowerCase();

  return courses
    .filter(
      (course) =>
        state.activeCategory === ALL_CATEGORY ||
        course.category === state.activeCategory,
    )
    .filter((course) => course.title.toLowerCase().includes(normalizedQuery));
};

const createElement = (tagName, className, textContent) => {
  const element = document.createElement(tagName);
  element.className = className;

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
};

const createCourseCard = (course) => {
  const card = createElement('article', 'course-card');

  const image = document.createElement('img');
  image.className = 'course-card__image';
  image.src = course.image;
  image.alt = `${course.title} course preview`;
  image.loading = 'lazy';

  const content = createElement('div', 'course-card__content');
  const tag = createElement(
    'span',
    `course-card__tag course-card__tag--${getCategoryModifier(course.category)}`,
    course.category,
  );
  const title = createElement('h2', 'course-card__title', course.title);
  const meta = createElement('p', 'course-card__meta');
  const price = createElement('span', 'course-card__price', `$${course.price}`);
  const divider = createElement('span', 'course-card__divider', '|');
  const author = createElement(
    'span',
    'course-card__author',
    `by ${course.author}`,
  );

  meta.append(price, divider, author);
  content.append(tag, title, meta);
  card.append(image, content);

  return card;
};

const renderTabs = () => {
  const counts = getCategoryCounts();
  const fragment = document.createDocumentFragment();

  categories.forEach((category) => {
    const tab = document.createElement('button');
    const isActive = category === state.activeCategory;

    tab.className = `courses__tab${isActive ? ' courses__tab--active' : ''}`;
    tab.type = 'button';
    tab.role = 'tab';
    tab.ariaSelected = String(isActive);
    tab.dataset.category = category;
    tab.innerHTML = `<span>${category}</span><sup>${counts[category]}</sup>`;

    fragment.append(tab);
  });

  tabsNode.replaceChildren(fragment);
};

const renderCourses = () => {
  const filteredCourses = getFilteredCourses();
  const visibleCourses = filteredCourses.slice(0, state.visibleCount);
  const fragment = document.createDocumentFragment();

  visibleCourses.forEach((course) => {
    fragment.append(createCourseCard(course));
  });

  gridNode.replaceChildren(fragment);
  emptyNode.hidden = filteredCourses.length > 0;
  loadMoreNode.hidden = visibleCourses.length >= filteredCourses.length;
};

const render = () => {
  renderTabs();
  renderCourses();
};

tabsNode.addEventListener('click', (event) => {
  const tab = event.target.closest('.courses__tab');

  if (!tab || tab.dataset.category === state.activeCategory) {
    return;
  }

  state.activeCategory = tab.dataset.category;
  state.visibleCount = INITIAL_VISIBLE_COUNT;
  render();
});

searchNode.addEventListener('input', (event) => {
  state.query = event.target.value;
  state.visibleCount = INITIAL_VISIBLE_COUNT;
  renderCourses();
});

loadMoreNode.addEventListener('click', () => {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  loadMoreNode.blur();
  state.visibleCount = courses.length;
  renderCourses();
  requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
});

render();
