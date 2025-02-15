<template>
  <header class="px-12 py-6 flex justify-between items-center">
    <div class="text-2xl text-gray-600">Reservations</div>
    <f-btn
      text-color="#FFF"
      color="#440099"
      class="min-w-[5vw]"
      label="Disable Reservations"
      :loading="loading"
    />
  </header>
</template>

<script>
import FBtn from "@/components/FBtn.vue";

export default {
  name: "ReservationsHeader",
  components: { FBtn },
  computed: {
    loading() {
      return this.$store.getters["branches/isFetchingBranches"];
    },
  },
};
</script>

<style scoped></style>
