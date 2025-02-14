<template>
  <div>
    <header class="px-12 py-6 text-lg text-gray-600">Reservations</header>
    <ReservationsPage />
  </div>
</template>

<script>
import ReservationsPage from "@/pages/Reservations.vue";

export default {
  name: "App",
  components: {
    ReservationsPage,
  },
};
</script>

<style></style>
