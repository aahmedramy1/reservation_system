<template>
  <header class="px-12 py-6 flex justify-between items-center">
    <div class="text-2xl text-gray-600">Reservations</div>
    <f-btn text-color="#FFF" color="#440099" label="Disable Reservations" />
  </header>
</template>

<script>
import FBtn from "@/components/FBtn.vue";

export default {
  name: "ReservationsHeader",
  components: { FBtn },
};
</script>

<style scoped></style>
