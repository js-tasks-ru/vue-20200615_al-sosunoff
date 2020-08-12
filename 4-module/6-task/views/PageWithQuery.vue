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

const buildComputedProp = (name, queryName) => {
  return {
    [name]: {
      get: function () {
        return this[queryName];
      },
      set: function (value) {
        let query = { ...this.$route.query };
        if (this.default[queryName] === value) {
          delete query[queryName];
        } else {
          query[queryName] = value;
        }

        this.$router.push({ path: '/', query }).catch((err) => {
          if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes(
              'Avoided redundant navigation to current location:',
            )
          ) {
            throw err;
          }
        });

        this[queryName] = value;
      },
    },
  };
};

const buildWatchProp = (queryName) => {
  return {
    [`$route.query.${queryName}`]: {
      handler: function (value) {
        this[queryName] = value;
      },
      immediate: true,
    },
  };
};

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
    ...buildComputedProp('viewCom', 'view'),
    ...buildComputedProp('dateCom', 'date'),
    ...buildComputedProp('participationCom', 'participation'),
    ...buildComputedProp('searchCom', 'search'),
  },
  methods: {},
  watch: {
    ...buildWatchProp('view'),
    ...buildWatchProp('date'),
    ...buildWatchProp('participation'),
    ...buildWatchProp('search'),
  },
  components: { MeetupsView },
};
</script>

<style scoped></style>
