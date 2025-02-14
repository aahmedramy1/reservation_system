<template>
  <button
    :style="computedStyles"
    :class="computedClasses"
    @click="$emit('click')"
  >
    {{ label }}
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
  },
  computed: {
    computedClasses() {
      return [
        "rounded-md px-4 py-2 font-medium transition",
        this.outline
          ? "border-2 bg-transparent hover:opacity-80"
          : "hover:opacity-80",
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
