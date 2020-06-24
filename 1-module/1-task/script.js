import Vue from '/vendor/vue.esm.browser.js';

new Vue({
  el: '#app',
  data: {
    count: 0,
  },
  methods: {
    upCount() {
      this.count++;
    },
  },
});
