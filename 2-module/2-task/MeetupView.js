import { getMeetupCoverLink } from './data.js';
import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <MeetupCover :title="meetup.title" :link="link" />

      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>

            <MeetupDescription :description="meetup.description"/>

            <h3>Программа</h3>

            <MeetupAgenda :agenda="meetup.agenda" />
          </div>
          <div class="meetup__aside">
            <MeetupInfo :meetup="meetup" />
          </div>
        </div>
      </div>
    </div>`,

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    link() {
      return this.meetup.imageId
        ? `url(${getMeetupCoverLink(this.meetup)})`
        : '';
    },
  },

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },
};
