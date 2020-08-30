<template>
  <form class="form meetup-form" @submit.prevent="submit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="meetupLocal.title" />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input
            class="form-control"
            type="date"
            :value="dateFormat"
            @input="meetupLocal.date = new Date($event.target.value)"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="meetupLocal.place" />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="meetupLocal.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="meetupLocal.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        class="mb-3"
        v-for="(agendaItem, inx) in meetupLocal.agenda"
        :key="agendaItem.id"
        :agendaItem="agendaItem"
        @update:agendaItem="meetupLocal.agenda.splice(inx, 1, $event)"
        @remove="meetupLocal.agenda.splice(inx, 1)"
      />

      <div class="form-section_append">
        <button
          type="button"
          data-test="addAgendaItem"
          @click="addedAgendaItemHandler"
        >
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';
import deepClone from '../lodash.clonedeep.min';

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: 'MeetupForm',

  data() {
    return {
      meetupLocal: {},
    };
  },

  props: {
    meetup: {
      required: true,
      type: Object,
    },
    submitText: {
      type: String,
    },
  },

  watch: {
    meetup: {
      immediate: true,
      handler(value) {
        this.meetupLocal = deepClone(value);
      },
    },
  },

  methods: {
    submit() {
      this.$emit('submit', deepClone(this.meetupLocal));
    },
    addedAgendaItemHandler() {
      if (this.meetupLocal.agenda.length) {
        const lastElement = this.meetupLocal.agenda.slice(-1)[0];
        this.meetupLocal.agenda.push({
          ...buildAgendaItem(),
          startsAt: lastElement.endsAt,
        });
      } else {
        this.meetupLocal.agenda.push(buildAgendaItem());
      }
    },
  },

  computed: {
    dateFormat() {
      const year = this.meetupLocal.date.getFullYear();
      const month = `${this.meetupLocal.date.getMonth() + 1}`.padStart(2, '0');
      const day = `${this.meetupLocal.date.getDate()}`.padStart(2, '0');
      const date = `${year}-${month}-${day}`;
      return date;
    },
  },

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
