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
            v-for="(item, inx) of monthDay"
            :key="inx"
            class="rangepicker__cell"
            :class="[item.cls]">
              {{ item.day }}
              <a
                class="rangepicker__event"
                v-for="(meetup, indexMeetups) of item.meetups"
                :key="'meetup_prev_' + indexMeetups">{{ meetup.title }}</a>
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
    getDayWithMeetup(day, date, cls) {
      const currentDayWithoutTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        day,
      );
      return {
        day,
        date: currentDayWithoutTime,
        cls,
        meetups: this.meetupsOfDay[
          getDateWithoutTime(currentDayWithoutTime).getTime()
        ],
      };
    },
    onPrev() {
      this.currentDate = prevMonth(this.currentDate);
    },
    onNext() {
      this.currentDate = nextMonth(this.currentDate);
    },
  },

  mounted() {
    this.monthDay;
  },

  computed: {
    meetupsOfDay() {
      const meetups = {};

      this.meetups.forEach((meetup) => {
        const dateWithoutTime = getDateWithoutTime(meetup.date).getTime();

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
    monthDay() {
      let arr = [];
      // prev
      const countDay = getMonthDayCount(prevMonth(this.currentDate));
      let startIndex = countDay - getFirsDayOfWeekByMonth(this.currentDate);
      const countDayBalance = countDay - startIndex - 1;
      arr = [
        ...Array(countDayBalance)
          .fill()
          .map((e, i) => i + countDayBalance + startIndex)
          .map((e) =>
            this.getDayWithMeetup(
              e,
              prevMonth(this.currentDate),
              'rangepicker__cell_inactive',
            ),
          ),
      ];
      // current
      arr = [
        ...arr,
        ...new Array(getMonthDayCount(this.currentDate))
          .fill()
          .map((e, index) =>
            this.getDayWithMeetup(index + 1, this.currentDate),
          ),
      ];
      // next
      let dayOfWeek = getFirsDayOfWeekByMonth(nextMonth(this.currentDate));
      arr = [
        ...arr,
        ...Array(8 - dayOfWeek)
          .fill()
          .map((e, i) =>
            this.getDayWithMeetup(
              ++i,
              nextMonth(this.currentDate),
              'rangepicker__cell_inactive',
            ),
          ),
      ];

      return arr;
    },
  },

  components: {},
};
