<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="fixed inset-0 bg-black opacity-50"
        @click="handleBackdropClick"
      ></div>
      <div class="bg-white rounded-lg shadow-lg relative z-10" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "FDialog",
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props: {
    persistent: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleBackdropClick() {
      if (!this.persistent) {
        this.closeDialog();
      }
    },
    handleKeydown(event) {
      if (event.key === "Escape" && !this.persistent && this.modelValue) {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>
