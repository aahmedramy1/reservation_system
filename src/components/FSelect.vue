<template>
  <div class="relative inline-block w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>

    <div
      @click="toggleOpen"
      class="cursor-pointer border rounded-md px-3 py-2 bg-white flex justify-between items-center"
    >
      <div
        v-if="selectedLabels.length"
        class="flex flex-wrap gap-2 max-w-[25vw]"
      >
        <span
          v-for="(label, index) in selectedLabels"
          :key="index"
          class="border border-blue-400 rounded-md p-1"
        >
          {{ label }}
        </span>
      </div>
      <span v-else class="text-gray-400">
        {{ placeholder }}
      </span>
      <svg
        :class="{ 'transform rotate-180': isOpen }"
        class="h-5 w-5 text-gray-400 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        @click.stop="selectOption(option)"
        class="cursor-pointer hover:bg-gray-100 select-none relative py-2 pl-3 pr-9"
      >
        <span class="block truncate">
          {{ option.label }}
        </span>
        <span
          v-if="isSelected(option)"
          class="absolute inset-y-0 right-0 flex items-center pr-4"
        >
          <svg
            class="h-5 w-5 text-[#440099]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FSelect",
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Select...",
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    selectedLabels() {
      return this.options
        .filter((option) => this.modelValue.includes(option.value))
        .map((option) => option.label);
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      let newValue;
      if (this.isSelected(option)) {
        newValue = this.modelValue.filter((val) => val !== option.value);
      } else {
        newValue = [...this.modelValue, option.value];
      }
      this.$emit("update:modelValue", newValue);
    },
    isSelected(option) {
      return this.modelValue.includes(option.value);
    },
  },
};
</script>
