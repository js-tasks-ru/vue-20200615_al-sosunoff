<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview image-uploader__preview-loading"
      :style="{ '--bg-image': image }"
      @click="openModalNative"
    >
      <span>{{ title }}</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="change"
        ref="fileControl"
        :disabled="statusCurent === 'expect'"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

const status = {
  load: 'Загрузить изображение',
  expect: 'Загрузка...',
  success: 'Удалить изображение',
};

export default {
  name: 'ImageUploader',
  data() {
    return {
      statusCurent: 'load',
    };
  },
  methods: {
    openModalNative(e) {
      if (this.imageId !== null) {
        e.preventDefault();
        this.$emit('change', null);
        this.statusCurent = 'load';
      }
    },
    async change({ target }) {
      const [file] = target.files;
      this.statusCurent = 'expect';
      const { id } = await ImageService.uploadImage(file);
      this.$emit('change', id);
    },
  },
  computed: {
    title() {
      return status[this.statusCurent];
    },
    image() {
      return this.imageId === null
        ? null
        : `url(${ImageService.getImageURL(this.imageId)})`;
    },
  },
  watch: {
    imageId: {
      immediate: true,
      handler(value) {
        if (value !== null) {
          this.statusCurent = 'success';
        } else {
          this.statusCurent = 'load';
        }
      },
    },
  },
  model: {
    prop: 'imageId',
    event: 'change',
  },
  props: {
    imageId: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
