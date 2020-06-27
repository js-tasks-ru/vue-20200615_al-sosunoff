import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <p class="meetup-agenda__empty" v-if="!isAgenda">
        Программа пока пуста, но когда-нибудь в ней обязательно
        что-нибудь появится!
      </p>

      <MeetupAgendaItem
        v-else
        v-for="item of agenda"
        :key="item.id"
        :agendaItem="item" />
    </div>`,

  props: {
    agenda: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  computed: {
    isAgenda() {
      return Boolean(this.agenda && this.agenda.length);
    },
  },

  components: {
    MeetupAgendaItem,
  },
};
