<template>
  <div class="px-12 py-6 bg-gray-100 min-h-[80vh]">
    <BranchesList @row-click="handleRowClick">
      <template #header>
        <div class="flex justify-end bg-white px-6 py-4">
          <f-btn
            text-color="#4f4f4f"
            color="#e5e7eb"
            label="Add Branches"
            class="min-w-[5vw]"
            :outline="true"
            :loading="isFetchingBranches"
            @click="showAddBranchesDialog = true"
          />
        </div>
      </template>
    </BranchesList>
    <FDialog v-model="showAddBranchesDialog" :persistent="isUpdatingBranches">
      <AddBranchesDialog @close="showAddBranchesDialog = false" />
    </FDialog>
    <FDialog v-model="showEditBranchDialog" :persistent="editBranchLoading">
      <EditBranchDialog
        @close="showEditBranchDialog = false"
        :branch="branchToEdit"
      />
    </FDialog>
  </div>
</template>

<script>
import FBtn from "@/components/FBtn.vue";
import BranchesList from "@/components/BranchesList.vue";
import FDialog from "@/components/FDialog.vue";
import AddBranchesDialog from "@/components/AddBranchesDialog.vue";
import EditBranchDialog from "@/components/EditBranchDialog.vue";

export default {
  name: "ReservationsPage",
  data() {
    return {
      showAddBranchesDialog: false,
      branchToEdit: null,
      showEditBranchDialog: false,
    };
  },
  computed: {
    isFetchingBranches() {
      return this.$store.getters["branches/isFetchingBranches"];
    },
    isUpdatingBranches() {
      return this.$store.getters["branches/isUpdatingBranches"];
    },
    editBranchLoading() {
      return this.isUpdatingBranches || this.$store.getters["tables/loading"];
    },
  },
  components: {
    EditBranchDialog,
    AddBranchesDialog,
    FDialog,
    BranchesList,
    FBtn,
  },
  methods: {
    handleRowClick(row) {
      this.branchToEdit = row;
      this.showEditBranchDialog = true;
    },
  },
};
</script>

<style scoped></style>
