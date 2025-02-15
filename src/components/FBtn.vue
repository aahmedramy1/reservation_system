<template>
  <button
    :style="computedStyles"
    :class="computedClasses"
    @click="$emit('click')"
    :disabled="loading"
  >
    <span v-if="loading" class="loader"></span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: "FBtn",
  props: {
    color: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: true,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClasses() {
      return [
        "rounded-md px-4 py-2 font-medium transition flex items-center justify-center",
        this.outline
          ? "border-2 bg-transparent hover:opacity-80"
          : "hover:opacity-80",
        this.loading ? "cursor-not-allowed opacity-50" : "",
      ];
    },
    computedStyles() {
      return {
        borderColor: this.outline ? this.color : "transparent",
        color: this.textColor,
        backgroundColor: this.outline ? "transparent" : this.color,
      };
    },
  },
};
</script>

<style>
.loader {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
