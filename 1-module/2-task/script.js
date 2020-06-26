import Vue from '/vendor/vue.esm.browser.js';
import fetchJson from '/utils/fetch-json.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return meetup.imageId ? `url(${API_URL}/images/${meetup.imageId})` : '';
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    meetupLocaly: {},
  },

  async mounted() {
    this.meetup = await fetchJson(`${API_URL}/meetups/${MEETUP_ID}`);
  },

  computed: {
    meetup: {
      set(payload) {
        this.meetupLocaly = payload;
      },
      get() {
        if (!this.meetupLocaly.agenda) {
          return this.meetupLocaly;
        }

        return {
          ...this.meetupLocaly,
          agenda: this.meetupLocaly.agenda.map((item) => ({
            ...item,
            typeIcon: agendaItemIcons[item.type],
          })),
        };
      },
    },
    imgBackground() {
      return getMeetupCoverLink(this.meetup);
    },
    visibleDate() {
      return this.formatDate(this.meetup.date, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
    },
    hideDate() {
      return this.formatDate(this.meetup.date, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    },
    isAgenda() {
      return Boolean(this.meetup.agenda && this.meetup.agenda.length);
    },
  },

  methods: {
    getTypeIcon(type) {
      return agendaItemIcons[type];
    },
    getTitle(title, type) {
      return title || agendaItemTitles[type];
    },
    formatDate(timestamp, options) {
      return new Intl.DateTimeFormat('ru-RU', options).format(timestamp);
    },
  },
});
