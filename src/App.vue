<template>
  <div>
    <ReservationsHeader />
    <ReservationsPage />
    <notifications position="bottom center" />
  </div>
</template>

<script>
import ReservationsPage from "@/pages/ReservationsPage.vue";
import ReservationsHeader from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    ReservationsHeader,
    ReservationsPage,
  },
};
</script>

<style></style>
