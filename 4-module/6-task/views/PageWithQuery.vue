<template>
  <div class="container">
    <meetups-view
      :view.sync="query.view"
      :date.sync="query.date"
      :participation.sync="query.participation"
      :search.sync="query.search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const defaults = {
  view: 'list',
  date: 'all',
  participation: 'all',
  search: '',
};

export default {
  name: 'PageWithQuery',
  data() {
    return {
      query: {
        view: defaults.view,
        date: defaults.date,
        participation: defaults.participation,
        search: defaults.search,
      },
    };
  },
  mounted() {},
  computed: {},
  methods: {},
  watch: {
    query: {
      deep: true,
      handler(newQuery) {
        const query = Object.fromEntries(
          Object.entries(newQuery).filter(
            ([key, value]) => defaults[key] !== value,
          ),
        );

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
      },
    },
    '$route.query': {
      immediate: true,
      handler(newQuery) {
        this.query = Object.fromEntries(
          Object.keys(this.query).map((key) => [
            key,
            newQuery[key] || defaults[key],
          ]),
        );
      },
    },
  },
  components: { MeetupsView },
};
</script>

<style scoped></style>
