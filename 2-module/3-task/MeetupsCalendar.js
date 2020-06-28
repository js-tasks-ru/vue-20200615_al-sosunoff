import {
  prevMonth,
  nextMonth,
  getMonthDayCount,
  getFirsDayOfWeekByMonth,
} from './date.js';

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `
    <div class="rangepicker">
      <div class="rangepicker__calendar">
        <div class="rangepicker__month-indicator">
          <div class="rangepicker__selector-controls">
            <button class="rangepicker__selector-control-left" @click="onPrev"></button>
            <div>{{ dateLineDate }}</div>
            <button class="rangepicker__selector-control-right" @click="onNext"></button>
          </div>
        </div>

        <div class="rangepicker__date-grid">
          <div
            v-for="(item, inx) of prevMonthDay"
            :key="'prev_' + inx"
            class="rangepicker__cell rangepicker__cell_inactive">{{ item.day }}</div>

          <div
            v-for="(item, inx) of currentMonthDay"
            :key="'current_' + inx"
            class="rangepicker__cell">
              {{ item.day }}
              <a
                class="rangepicker__event"
                v-for="(meetup, indexMeetups) of item.meetups"
                :key="'meetup_' + indexMeetups">{{ meetup.title }}</a>
          </div>

          <div
            v-for="(item, inx) of nextMonthDay"
            :key="'next_' + inx"
            class="rangepicker__cell rangepicker__cell_inactive">{{ item.day }}</div>

        </div>
      </div>
    </div>`,

  data() {
    return {
      currentDate: new Date(),
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getDayWithMeetup(day, date) {
      const dateWithoutTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
      );

      return {
        day,
        meetups: this.meetups
          .map((meetup) => ({
            meetup,
            timestamp: new Date(
              new Date(meetup.date).getFullYear(),
              new Date(meetup.date).getMonth(),
              new Date(meetup.date).getDate(),
            ).getTime(),
          }))
          .filter((meetup) => meetup.timestamp === dateWithoutTime.getTime())
          .map(({ meetup }) => meetup),
      };
    },
    onPrev() {
      this.currentDate = prevMonth(this.currentDate);
    },
    onNext() {
      this.currentDate = nextMonth(this.currentDate);
    },
  },

  computed: {
    dateLineDate() {
      return `${this.currentDate.toLocaleDateString(navigator.language, {
        month: 'long',
      })} ${this.currentDate.getFullYear()}`;
    },
    prevMonthDay() {
      const countDay = getMonthDayCount(prevMonth(this.currentDate));
      let startIndex = countDay - getFirsDayOfWeekByMonth(this.currentDate) + 1;

      const arr = [];

      while (startIndex < countDay) {
        arr.push(
          this.getDayWithMeetup(++startIndex, prevMonth(this.currentDate)),
        );
      }

      return arr;
    },
    currentMonthDay() {
      return new Array(getMonthDayCount(this.currentDate))
        .fill()
        .map((e, index) => this.getDayWithMeetup(index + 1, this.currentDate));
    },
    nextMonthDay() {
      let dayOfWeek = getFirsDayOfWeekByMonth(nextMonth(this.currentDate));
      const arr = [];
      let startIndex = 0;

      if (dayOfWeek !== 1) {
        while (startIndex <= 7 - dayOfWeek) {
          arr.push(
            this.getDayWithMeetup(++startIndex, nextMonth(this.currentDate)),
          );
        }
      }

      return arr;
    },
  },

  components: {},
};
