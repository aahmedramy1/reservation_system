<template>
  <div class="min-w-[30vw]">
    <header class="flex justify-start p-4 border border-t-0 border-x-0">
      <div class="font-bold text-xl">Disable Reservations</div>
    </header>

    <div class="p-4 text-lg text-gray-600">
      Are you sure you want to disable reservations for all branches?
    </div>

    <footer
      class="flex justify-end gap-3 items-center p-4 border border-x-0 border-b-0"
    >
      <f-btn
        class="min-w-[5rem]"
        text-color="#4f4f4f"
        color="#e5e7eb"
        label="No"
        :outline="true"
        :loading="isUpdatingBranches"
        @click="$emit('close')"
      />
      <f-btn
        class="min-w-[5rem] h-full"
        text-color="#ffffff"
        color="#440099"
        label="Yes"
        :loading="isUpdatingBranches"
        @click="disableReservationsForAllBranches"
      />
    </footer>
  </div>
</template>

<script>
import FBtn from "@/components/FBtn.vue";

export default {
  name: "DisableReservationsDialog",
  components: { FBtn },
  computed: {
    isUpdatingBranches() {
      return this.$store.getters["branches/isUpdatingBranches"];
    },
  },
  methods: {
    async disableReservationsForAllBranches() {
      await this.$store.dispatch("branches/disableReservationsForAllBranches");
      this.$emit("close");
    },
  },
};
</script>

<style></style>
