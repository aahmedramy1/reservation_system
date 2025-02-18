<template>
  <div class="min-w-[32vw] flex flex-col h-[80vh]">
    <header class="flex justify-start p-4 border border-t-0 border-x-0">
      <div class="font-bold text-xl">
        Edit {{ branchToEdit.name }} branch reservation settings
      </div>
    </header>

    <div class="p-4 bg-gray-100 flex flex-col gap-4 flex-1 overflow-y-auto">
      <div
        class="text-[#5672C6] bg-[#DBEAFE] border border-[#5580C5] border-x-0 pl-4 py-2"
      >
        Branch working hours are
        {{ branchToEdit.opening_from }} -
        {{ branchToEdit.opening_to }}
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
          v-model.number="branchToEdit.reservation_duration"
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
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-medium text-gray-700">
              {{ dayObj.day }}
            </h3>
            <button
              v-if="dayIndex === 0"
              class="text-[#440099] text-sm"
              @click="applyDayToAll(dayIndex)"
            >
              Apply on all days
            </button>
          </div>
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
        :loading="loading"
        @click="$emit('close')"
      />
      <f-btn
        class="min-w-[5rem] h-full"
        text-color="#ffffff"
        color="#440099"
        label="Save"
        :loading="loading"
        @click="handleSave"
      />
    </footer>
  </div>
</template>

<script>
import FBtn from "@/components/FBtn.vue";
import FSelect from "@/components/FSelect.vue";
import "vue2-timepicker/dist/VueTimepicker.css";
import BranchTimePicker from "@/components/BranchTimePicker.vue";
import { cloneDeep, isEqual } from "lodash";

export default {
  name: "EditBranchDialog",
  components: { BranchTimePicker, FSelect, FBtn },
  data() {
    return {
      selectedTables: [],
      oldSelectedTables: [],
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
      branchToEdit: cloneDeep(this.branch),
    };
  },
  props: {
    branch: {
      type: Object,
      required: true,
    },
  },
  computed: {
    loading() {
      return (
        this.$store.getters["branches/isUpdatingBranches"] ||
        this.$store.getters["tables/loading"]
      );
    },
    branchToEditTables() {
      return (
        this.branchToEdit.sections?.flatMap((section) => section.tables) || []
      );
    },
    branchTables() {
      return this.branch.sections?.flatMap((section) => section.tables) || [];
    },
    tableOptions() {
      return (
        this.branchToEdit.sections?.flatMap((section) =>
          section.tables.map((table) => ({
            label: `${section.name} - ${table.name}`,
            value: table.id,
          }))
        ) ?? []
      );
    },
    branchToEditReservationTimes() {
      return this.branchToEdit.reservation_times;
    },
  },
  watch: {
    branchToEditReservationTimes: {
      immediate: true,
      deep: true,
      handler(reservationTimes) {
        this.daySlots = this.DAYS.map((day) => {
          if (reservationTimes[day.toLowerCase()]) {
            return {
              day,
              timeSlots: reservationTimes[day.toLowerCase()].map((time) => ({
                start: time[0],
                end: time[1],
              })),
            };
          } else {
            return {
              day,
              timeSlots: [],
            };
          }
        });
      },
    },
    branchToEditTables: {
      immediate: true,
      deep: true,
      handler(branchTables) {
        this.selectedTables = branchTables
          .filter((table) => table.accepts_reservations)
          .map((table) => table.id);
      },
    },
    branchTables: {
      immediate: true,
      deep: true,
      handler(branchTables) {
        this.oldSelectedTables = branchTables
          .filter((table) => table.accepts_reservations)
          .map((table) => table.id);
      },
    },
  },
  methods: {
    applyDayToAll(dayIndex) {
      const dayToApply = this.daySlots[dayIndex];
      this.daySlots = this.daySlots.map((day) => ({
        ...day,
        timeSlots: dayToApply.timeSlots.map((time) => ({ ...time })),
      }));
    },
    validateReservationTimes(reservationTimes) {
      const isValidTimeFormat = (time) =>
        /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
      let errors = [];

      for (const day in reservationTimes) {
        let timeSlots = reservationTimes[day];

        let parsedSlots = timeSlots.map(([start, end], index) => {
          if (!isValidTimeFormat(start) || !isValidTimeFormat(end)) {
            errors.push(
              `❌ Invalid time format in ${day}: "${start} - ${end}". Please use HH:mm format.`
            );
            return null;
          }
          const [startHour, startMinute] = start.split(":").map(Number);
          const [endHour, endMinute] = end.split(":").map(Number);

          const startTime = startHour * 60 + startMinute;
          const endTime = endHour * 60 + endMinute;

          return { startTime, endTime, original: [start, end], index };
        });

        if (parsedSlots.includes(null)) continue;

        for (const slot of parsedSlots) {
          if (slot.endTime <= slot.startTime) {
            errors.push(
              `⏳ Invalid time range in ${day}: "${slot.original[0]} - ${slot.original[1]}". ` +
                `The end time must be later than the start time.`
            );
          }
        }

        parsedSlots.sort((a, b) => a.startTime - b.startTime);

        for (let i = 1; i < parsedSlots.length; i++) {
          if (parsedSlots[i].startTime < parsedSlots[i - 1].endTime) {
            errors.push(
              `⚠️ Overlapping time slots in ${day}: ` +
                `"${parsedSlots[i - 1].original[0]} - ${
                  parsedSlots[i - 1].original[1]
                }" ` +
                `and "${parsedSlots[i].original[0]} - ${parsedSlots[i].original[1]}". ` +
                `Please adjust your time slots to avoid conflicts.`
            );
          }
        }
      }

      return errors.length ? errors.join("\n") : 1;
    },
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
    async handleSave() {
      if (
        this.branchToEdit.reservation_duration == null ||
        this.branchToEdit.reservation_duration === ""
      ) {
        this.$notify({
          type: "error",
          title: "Error",
          text: "Reservation duration is required",
        });
        return;
      }
      const newTables = this.selectedTables.filter(
        (table) => !this.oldSelectedTables.includes(table)
      );

      const removedTables = this.oldSelectedTables.filter(
        (table) => !this.selectedTables.includes(table)
      );

      try {
        let reservationTimes = {};

        this.daySlots.forEach((dayObject) => {
          reservationTimes[dayObject.day.toLowerCase()] =
            dayObject.timeSlots.map((time) => [time.start, time.end]);
        });
        const validationError = this.validateReservationTimes(reservationTimes);
        if (validationError !== 1) {
          this.$notify({
            type: "error",
            title: "Error",
            text: validationError,
          });
          return;
        }
        await this.$store.dispatch("tables/updateReservationsForTables", {
          branchId: this.branchToEdit.id,
          tableIds: newTables,
          acceptsReservations: true,
        });

        await this.$store.dispatch("tables/updateReservationsForTables", {
          branchId: this.branchToEdit.id,
          tableIds: removedTables,
          acceptsReservations: false,
        });

        let newChanges = {};

        if (
          this.branchToEdit.reservation_duration !==
          this.branch.reservation_duration
        ) {
          newChanges.reservation_duration =
            this.branchToEdit.reservation_duration;
        }

        if (!isEqual(this.branchToEdit.reservation_times, reservationTimes)) {
          newChanges.reservation_times = reservationTimes;
        }

        if (Object.keys(newChanges).length) {
          await this.$store.dispatch("branches/updateBranchData", {
            branchId: this.branchToEdit.id,
            changes: {
              reservation_times: reservationTimes,
              reservation_duration: this.branchToEdit.reservation_duration,
            },
          });
        }

        this.$emit("close");
      } catch (error) {
        console.error(error);
      }
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
