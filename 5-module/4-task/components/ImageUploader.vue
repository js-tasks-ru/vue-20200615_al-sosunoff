<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{
        'image-uploader__preview-loading': statusCurent === 'expect',
      }"
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
    clear() {
      if (this.$refs.fileControl.value) {
        try {
          this.$refs.fileControl.value = ''; //for IE11, latest Chrome/Firefox/Opera...
        } catch (err) {
          //
        }
        if (this.$refs.fileControl.value) {
          //for IE5 ~ IE10
          var form = document.createElement('form'),
            parentNode = this.$refs.fileControl.parentNode,
            ref = this.$refs.fileControl.nextSibling;
          form.appendChild(this.$refs.fileControl);
          form.reset();
          parentNode.insertBefore(this.$refs.fileControl, ref);
        }
      }
    },
    openModalNative(e) {
      if (this.imageId !== null) {
        e.preventDefault();
        this.$emit('change', null);
        this.statusCurent = 'load';
        this.clear();
      }
    },
    change({ target }) {
      this.$refs.fileControl.disabled = true;
      const [file] = target.files;
      this.statusCurent = 'expect';
      ImageService.uploadImage(file).then(({ id }) => {
        this.$refs.fileControl.disabled = false;
        this.statusCurent = 'success';
        this.$emit('change', id);
      });
    },
  },
  computed: {
    title() {
      return this.imageId !== null
        ? status['success']
        : status[this.statusCurent];
    },
    image() {
      return this.imageId === null
        ? null
        : `url(${ImageService.getImageURL(this.imageId)})`;
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
