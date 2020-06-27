export const MeetupInfo = {
  template: `
    <ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ meetup.organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ meetup.place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="hideDate">{{ visibleDate }}</time>
      </li>
    </ul>`,

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  methods: {
    formatDate(timestamp, options) {
      return new Intl.DateTimeFormat(navigator.language, options).format(
        timestamp,
      );
    },
  },

  computed: {
    visibleDate() {
      return this.formatDate(this.meetup.date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    hideDate() {
      return this.formatDate(this.meetup.date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
