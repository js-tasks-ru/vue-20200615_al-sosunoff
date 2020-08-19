<template>
  <main>
    <messages-list ref="list" class="messages" :messages="messages" />
    <form @submit.prevent="send" style="display: flex;">
      <input type="text" placeholder="New message" v-model="newMessage" />
      <button>Send</button>
    </form>
  </main>
</template>

<script>
import MessagesList from './MessegesList';
export default {
  name: 'MiniMessenger',

  components: { MessagesList },

  /* watch: {
    messages: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.$refs.list.scroll(0, this.$refs.list.scrollHeight);
        });
      },
    },
  }, */

  data() {
    return {
      newMessage: '',
      messages: [
        { id: Math.random(), text: 'First message' },
        { id: Math.random(), text: 'Second message' },
        { id: Math.random(), text: 'Third message' },
        { id: Math.random(), text: 'Forth message' },
      ],
    };
  },

  methods: {
    send() {
      this.messages.push({
        id: Math.random(),
        text: this.newMessage,
      });
      this.newMessage = '';
      this.$nextTick(() => {
        this.$refs.list.$el.scroll(0, this.$refs.list.$el.scrollHeight);
      });
    },
  },
};
</script>

<style scoped>
main {
  font-family: sans-serif;
  border: 1px solid #333;
  width: 200px;
  background-color: #efefef;
}
.messages {
  padding: 0 1rem;
  height: 300px;
  overflow: auto;
}
input {
  padding: 0.5rem;
  width: 100%;
  flex: 1 1 100%;
}
</style>
