<template>
  <div class="px-12 py-6 bg-gray-100">
    <BranchesList>
      <template #header>
        <div class="flex justify-end bg-white px-6 py-4">
          <f-btn
            text-color="#4f4f4f"
            color="#e5e7eb"
            label="Add Branches"
            :outline="true"
            @click="showAddBranchesDialog = true"
          />
        </div>
      </template>
    </BranchesList>
    <FDialog v-model="showAddBranchesDialog">
      <AddBranchesDialog @close="showAddBranchesDialog = false" />
    </FDialog>
  </div>
</template>

<script>
import FBtn from "@/components/FBtn.vue";
import BranchesList from "@/components/BranchesList.vue";
import FDialog from "@/components/FDialog.vue";
import AddBranchesDialog from "@/components/AddBranchesDialog.vue";

export default {
  name: "ReservationsPage",
  data() {
    return {
      showAddBranchesDialog: false,
    };
  },
  components: {
    AddBranchesDialog,
    FDialog,
    BranchesList,
    FBtn,
  },
};
</script>

<style scoped></style>
