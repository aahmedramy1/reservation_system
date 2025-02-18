<template>
  <div class="min-w-[32vw] flex flex-col h-[80vh]">
    <header class="flex justify-start p-4 border border-t-0 border-x-0">
      <div class="font-bold text-xl">
        Edit {{ branch.name }} branch reservation settings
      </div>
    </header>

    <div class="p-4 bg-gray-100 flex flex-col gap-4 flex-1 overflow-y-auto">
      <div
        class="text-[#5672C6] bg-[#DBEAFE] border border-[#5580C5] border-x-0 pl-4 py-2"
      >
        Branch working hours are
        {{ branch.opening_from }} -
        {{ branch.opening_to }}
      </div>
      <div class="flex flex-col gap-2">
        <label for="quantity" class="text-gray-700 font-medium text-sm">
          Reservation Duration (minutes) <span class="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          class="border rounded-md p-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
      <FSelect
        label="Tables"
        placeholder="Select tables..."
        v-model="selectedTables"
        :options="tableOptions"
      />
      <div class="flex flex-col gap-3">
        <div
          v-for="(dayObj, dayIndex) in daySlots"
          :key="dayObj.day"
          class="flex flex-col gap-1"
        >
          <h3 class="text-sm font-medium text-gray-700">
            {{ dayObj.day }}
          </h3>
          <div
            class="bg-white px-3 py-2 border rounded-md flex justify-between items-center"
          >
            <div class="flex items-center gap-2">
              <BranchTimePicker
                v-for="(slot, slotIndex) in dayObj.timeSlots"
                :key="slotIndex"
                :time-slot="slot"
                @remove="removeTimeSlot(dayIndex, slotIndex)"
              />
            </div>
            <div
              v-if="dayObj.timeSlots.length < 3"
              class="border rounded-md p-2 cursor-pointer"
              @click="addTimeSlot(dayIndex)"
            >
              <img src="../assets/plus.svg" alt="plus icon" class="w-2 h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer
      class="flex justify-end gap-3 items-center p-4 border border-x-0 border-b-0"
    >
      <f-btn
        class="min-w-[5rem]"
        text-color="#4f4f4f"
        color="#e5e7eb"
        label="Close"
        :outline="true"
        @click="$emit('close')"
      />
      <f-btn
        class="min-w-[5rem] h-full"
        text-color="#ffffff"
        color="#440099"
        label="Save"
      />
    </footer>
  </div>
</template>

<script>
import FBtn from "@/components/FBtn.vue";
import FSelect from "@/components/FSelect.vue";
import "vue2-timepicker/dist/VueTimepicker.css";
import BranchTimePicker from "@/components/BranchTimePicker.vue";

export default {
  name: "EditBranchDialog",
  components: { BranchTimePicker, FSelect, FBtn },
  data() {
    return {
      selectedTables: [],
      DAYS: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      daySlots: [],
    };
  },
  created() {
    this.daySlots = this.DAYS.map((day) => ({
      day,
      timeSlots: [],
    }));
  },
  props: {
    branch: {
      type: Object,
      required: true,
    },
  },
  computed: {
    branchTables() {
      return this.branch.sections?.flatMap((section) => section.tables) || [];
    },
    tableOptions() {
      return (
        this.branch.sections?.flatMap((section) =>
          section.tables.map((table) => ({
            label: `${section.name} - ${table.name}`,
            value: table.id,
          }))
        ) ?? []
      );
    },
  },
  watch: {
    branchTables: {
      immediate: true,
      deep: true,
      handler(branchTables) {
        this.selectedTables = branchTables
          .filter((table) => table.accepts_reservations)
          .map((table) => table.id);
      },
    },
  },
  methods: {
    addTimeSlot(dayIndex) {
      if (this.daySlots[dayIndex].timeSlots.length < 3) {
        this.daySlots[dayIndex].timeSlots.push({
          start: "00:00",
          end: "00:00",
        });
      }
    },
    removeTimeSlot(dayIndex, slotIndex) {
      this.daySlots[dayIndex].timeSlots.splice(slotIndex, 1);
    },
  },
};
</script>

<style>
.controls {
  display: none !important;
}
.timePicker input {
  padding: 0 !important;
  height: min-content !important;
  background: transparent !important;
  border: none !important;
}
.timePicker input:focus {
  outline: none;
  border-color: transparent;
}

.endPicker input {
  text-align: right !important;
}
</style>
