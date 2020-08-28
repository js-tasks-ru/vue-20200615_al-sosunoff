<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="/assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select
        class="form-control"
        title="Тип"
        :value="agendaItem.type"
        @change="update('type', $event.target.value)"
      >
        <option
          :value="item.value"
          v-for="item in agendaItemTypesList"
          :key="item.id"
        >
          {{ item.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            :value="agendaItem.startsAt"
            :placeholder="agendaItem.startsAt"
            @input="changeStartTime($event.target.value)"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            type="time"
            :value="agendaItem.endsAt"
            :placeholder="agendaItem.endsAt"
            @input="changeEndTime($event.target.value)"
          />
        </div>
      </div>
    </div>

    <div class="form-group" v-if="fieldEnabled('title')">
      <label class="form-label">{{ titleName }}</label>
      <input
        class="form-control"
        :value="agendaItem.title"
        @change="update('title', $event.target.value)"
      />
    </div>

    <div class="form-group" v-if="fieldEnabled('speaker')">
      <label class="form-label">Докладчик</label>
      <input
        class="form-control"
        :value="agendaItem.speaker"
        @change="update('speaker', $event.target.value)"
      />
    </div>

    <div class="form-group" v-if="fieldEnabled('description')">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        :value="agendaItem.description"
        @change="update('description', $event.target.value)"
      ></textarea>
    </div>

    <div class="form-group" v-if="fieldEnabled('language')">
      <label class="form-label">Язык</label>
      <select
        class="form-control"
        :value="agendaItem.language"
        @change="update('language', $event.target.value)"
      >
        <option
          :value="item.value"
          v-for="item in agendaItemLanguagesList"
          :key="item.id"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const agendaItemTypes = [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const agendaItemLanguages = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

const getUnicId = () => `_${Math.random().toString(36).substr(2, 9)}`;

const getTime = (time) => {
  const [hours, minuts] = time.split(':');
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    hours,
    minuts,
  ).getTime();
};

const getRange = (timeStart, timeEnd) => {
  return getTime(timeEnd) - getTime(timeStart);
};

export default {
  name: 'MeetupAgendaItemForm',

  date() {
    return {
      range: 0,
    };
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  mounted() {
    this.range = getRange(this.agendaItem.startsAt, this.agendaItem.endsAt);
  },

  /* watch: {
    agendaItem: {
      immediate: true,
      handler(value) {
        this.range = getRange(value.startsAt, value.endsAt);
      },
    },
  }, */

  methods: {
    update(field, value) {
      this.$emit('update:agendaItem', {
        ...this.agendaItem,
        [field]: value,
      });
    },
    fieldEnabled(field) {
      return {
        registration: ['title', 'description'],
        opening: ['title', 'description'],
        break: ['title', 'description'],
        coffee: ['title', 'description'],
        closing: ['title', 'description'],
        afterparty: ['title', 'description'],
        talk: ['title', 'speaker', 'description', 'language'],
        other: ['title', 'description'],
      }[this.agendaItem.type].includes(field);
    },
    changeStartTime(startsAt) {
      const newEndTime = getTime(startsAt) + this.range;
      const endsAt = `${new Date(newEndTime)
        .getHours()
        .toString()
        .padStart(2, '0')}:${new Date(newEndTime)
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

      this.$emit('update:agendaItem', {
        ...this.agendaItem,
        startsAt,
        endsAt,
      });
    },
    changeEndTime(endsAt) {
      const newStartTime = getTime(endsAt) - this.range;
      const startsAt = `${new Date(newStartTime)
        .getHours()
        .toString()
        .padStart(2, '0')}:${new Date(newStartTime)
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

      this.$emit('update:agendaItem', {
        ...this.agendaItem,
        startsAt,
        endsAt,
      });
    },
  },

  computed: {
    agendaItemLanguagesList() {
      return agendaItemLanguages.map((item) => ({
        id: getUnicId(),
        ...item,
      }));
    },
    agendaItemTypesList() {
      return agendaItemTypes.map((item) => ({
        id: getUnicId(),
        ...item,
      }));
    },
    titleName() {
      return {
        registration: 'Нестандартный текст (необязательно)',
        opening: 'Нестандартный текст (необязательно)',
        break: 'Нестандартный текст (необязательно)',
        coffee: 'Нестандартный текст (необязательно)',
        closing: 'Нестандартный текст (необязательно)',
        afterparty: 'Нестандартный текст (необязательно)',
        talk: 'Тема',
        other: 'Заголовок',
      }[this.agendaItem.type];
    },
  },
};
</script>

<style scoped></style>
