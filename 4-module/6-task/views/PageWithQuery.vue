<template>
  <div class="container">
    <meetups-view
      :view.sync="viewCom"
      :date.sync="dateCom"
      :participation.sync="participationCom"
      :search.sync="searchCom"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  data() {
    return {
      view: 'list',
      date: 'all',
      participation: 'all',
      search: '',
      default: {
        view: 'list',
        date: 'all',
        participation: 'all',
        search: '',
      },
    };
  },
  mounted() {},
  computed: {
    viewCom: {
      get: function () {
        return this.view;
      },
      set: function (value) {
        this.pushQueryParam('view', value);
      },
    },
    dateCom: {
      get: function () {
        return this.date;
      },
      set: function (value) {
        this.pushQueryParam('date', value);
      },
    },
    participationCom: {
      get: function () {
        return this.participation;
      },
      set: function (value) {
        this.pushQueryParam('participation', value);
      },
    },
    searchCom: {
      get: function () {
        return this.search;
      },
      set: function (value) {
        this.pushQueryParam('search', value);
      },
    },
  },
  methods: {
    pushQueryParam(queryParam, value) {
      let query = { ...this.$route.query };
      if (this.default[queryParam] === value) {
        delete query[queryParam];
      } else {
        query[queryParam] = value;
      }

      this.$router.push({ path: '/', query });
      this[queryParam] = value;
    },
  },
  watch: {
    ['$route.query.view']: {
      handler: function (value) {
        this.view = value;
      },
      immediate: true,
    },
    ['$route.query.date']: {
      handler: function (value) {
        this.date = value;
      },
      immediate: true,
    },
    ['$route.query.participation']: {
      handler: function (value) {
        this.participation = value;
      },
      immediate: true,
    },
    ['$route.query.search']: {
      handler: function (value) {
        this.search = value;
      },
      immediate: true,
    },
  },
  components: { MeetupsView },
};
</script>

<style scoped></style>
