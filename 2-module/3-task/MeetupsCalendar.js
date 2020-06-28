import {
  prevMonth,
  nextMonth,
  getMonthDayCount,
  getFirsDayOfWeekByMonth,
  getDateWithoutTime,
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
            class="rangepicker__cell rangepicker__cell_inactive">
              {{ item.day }}
              <a
                class="rangepicker__event"
                v-for="(meetup, indexMeetups) of meetupsOfDay[getDateWithoutTime(item.date).getTime()]"
                :key="'meetup_prev_' + indexMeetups">{{ meetup.title }}</a>
            </div>

          <div
            v-for="(item, inx) of currentMonthDay"
            :key="'current_' + inx"
            class="rangepicker__cell">
              {{ item.day }}
              <a
                class="rangepicker__event"
                v-for="(meetup, indexMeetups) of meetupsOfDay[getDateWithoutTime(item.date).getTime()]"
                :key="'meetup_' + indexMeetups">{{ meetup.title }}</a>
          </div>

          <div
            v-for="(item, inx) of nextMonthDay"
            :key="'next_' + inx"
            class="rangepicker__cell rangepicker__cell_inactive">
              {{ item.day }}
              <a
                class="rangepicker__event"
                v-for="(meetup, indexMeetups) of meetupsOfDay[getDateWithoutTime(item.date).getTime()]"
                :key="'meetup_next_' + indexMeetups">{{ meetup.title }}</a>
            </div>

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
    getDateWithoutTime(date) {
      return getDateWithoutTime(date);
    },
    getDayWithMeetup(day, date) {
      return {
        day,
        date: new Date(date.getFullYear(), date.getMonth(), day),
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
    meetupsOfDay() {
      const meetups = {};

      this.meetups.forEach((meetup) => {
        const dateWithoutTime = this.getDateWithoutTime(meetup.date).getTime();

        if (dateWithoutTime in meetups) {
          meetups[dateWithoutTime].push(meetup);
        } else {
          meetups[dateWithoutTime] = [meetup];
        }
      });

      return meetups;
    },
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
