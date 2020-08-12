<template>
  <div class="container">
    <meetups-view
      :view.sync="viewComputed"
      :date.sync="dateComputed"
      :participation.sync="participationComputed"
      :search.sync="searchComputed"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const buildComputedProps = (...queryName) => {
  const prepareEntries = queryName.map((name) => [
    `${name}Computed`,
    {
      get: function () {
        return this[name];
      },
      set: function (value) {
        let query = { ...this.$route.query };
        if (this.default[name] === value) {
          delete query[name];
        } else {
          query[name] = value;
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

        this[name] = value;
      },
    },
  ]);

  return Object.fromEntries(prepareEntries);
};

const buildWatchProps = (...queryName) => {
  const prepareEntries = queryName.map((name) => [
    [`$route.query.${name}`],
    {
      handler: function (value) {
        this[name] = value;
      },
      immediate: true,
    },
  ]);

  return Object.fromEntries(prepareEntries);
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
    ...buildComputedProps('view', 'date', 'participation', 'search'),
  },
  methods: {},
  watch: {
    ...buildWatchProps('view', 'date', 'participation', 'search'),
  },
  components: { MeetupsView },
};
</script>

<style scoped></style>
