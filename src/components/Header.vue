<template>
  <header class="px-12 py-6 flex justify-between items-center">
    <div class="text-2xl text-gray-600">Reservations</div>
    <f-btn
      text-color="#FFF"
      color="#440099"
      class="min-w-[5vw]"
      label="Disable Reservations"
      :loading="isFetchingBranches"
      @click="showDisableReservationsDialog = true"
    />
    <FDialog
      v-model="showDisableReservationsDialog"
      :persistent="isUpdatingBranches"
    >
      <DisableReservationsDialog
        @close="showDisableReservationsDialog = false"
      />
    </FDialog>
  </header>
</template>

<script>
import FBtn from "@/components/FBtn.vue";
import FDialog from "@/components/FDialog.vue";
import DisableReservationsDialog from "@/components/DisableReservationsDialog.vue";

export default {
  name: "ReservationsHeader",
  components: { DisableReservationsDialog, FDialog, FBtn },
  data() {
    return {
      showDisableReservationsDialog: false,
    };
  },
  computed: {
    isFetchingBranches() {
      return this.$store.getters["branches/isFetchingBranches"];
    },
    isUpdatingBranches() {
      return this.$store.getters["branches/isUpdatingBranches"];
    },
  },
};
</script>

<style scoped></style>
