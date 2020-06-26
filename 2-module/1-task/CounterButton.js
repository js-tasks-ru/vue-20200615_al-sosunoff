export const CounterButton = {
  // Шаблон потребуется отредактировать
  template:
    '<button type="button" @click="onClick"><slot>{{ count }}</slot></button>',

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default() {
        this.$emit('increment', 0);
        return 0;
      },
    },
  },

  methods: {
    onClick() {
      this.$emit('increment', this.count + 1);
    },
  },
};
