<template>
  <div
    class="flex items-center border border-[#440099] w-min rounded-md px-2 relative"
    :class="{ 'border-blue-500': isEditing }"
    @focus="setIsEditing(true)"
    @mouseenter="setIsHovering(true)"
    @mouseleave="setIsHovering(false)"
  >
    <button
      v-if="isEditing || isHovering"
      @click.stop="removeTimeSlot"
      class="absolute top-[-10px] right-[-10px] bg-white text-black rounded-full text-sm border leading-none z-50 w-5 h-5 pb-[2px]"
    >
      x
    </button>
    <vue-timepicker
      v-model="timeSlotToEdit.start"
      ref="firstTimepicker"
      :manual-input="true"
      :hide-dropdown="true"
      :hide-clear-button="true"
      input-width="50px"
      class="w-min timePicker !m-0"
      placeholder="00:00"
      @click.prevent
      @focus="setIsEditing(true)"
      @blur="setIsEditing(false)"
    >
      <template v-slot:dropdownButton>
        <div></div>
      </template>
    </vue-timepicker>
    <span>-</span>
    <vue-timepicker
      v-model="timeSlotToEdit.end"
      :manual-input="true"
      :hide-dropdown="true"
      :hide-clear-button="true"
      placeholder="00:00"
      input-width="50px"
      class="w-min timePicker !m-0 endPicker"
      @focus="setIsEditing(true)"
      @blur="setIsEditing(false)"
    >
      <template v-slot:dropdownButton>
        <div></div>
      </template>
    </vue-timepicker>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";

export default {
  name: "BranchTimePicker",
  components: { VueTimepicker },
  data() {
    return {
      timeSlotToEdit: this.timeSlot,
      isEditing: false,
      isHovering: false,
    };
  },
  props: {
    timeSlot: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setIsEditing(isEditing) {
      this.isEditing = isEditing;
    },
    setIsHovering(isHovering) {
      this.isHovering = isHovering;
    },
    removeTimeSlot() {
      this.$emit("remove");
    },
  },
};
</script>

<style scoped></style>
