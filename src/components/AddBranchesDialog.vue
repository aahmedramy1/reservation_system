<template>
  <div class="min-w-[30vw]">
    <header class="flex justify-start p-4 border border-x-0 border-t-0">
      <div class="font-bold text-xl">Add Branches</div>
    </header>
    <div class="bg-gray-100 px-4 py-6">
      <FSelect
        label="Branches"
        placeholder="Select branches..."
        :options="branchOptions"
        v-model="selectedValues"
      />
    </div>
    <footer
      class="flex justify-end gap-3 items-center p-4 border border-x-0 border-b-0"
    >
      <f-btn
        class="min-w-[5rem]"
        text-color="#4f4f4f"
        color="#e5e7eb"
        label="Cancel"
        :outline="true"
        :loading="isUpdatingBranches"
        @click="$emit('close')"
      />
      <f-btn
        class="min-w-[5rem] h-full"
        text-color="#ffffff"
        color="#440099"
        label="Save"
        :loading="isUpdatingBranches"
        :disabled="selectedValues.length === 0"
        @click="addBranches"
      />
    </footer>
  </div>
</template>

<script>
import FBtn from "@/components/FBtn.vue";
import FSelect from "@/components/FSelect.vue";

export default {
  name: "AddBranchesDialog",
  components: { FSelect, FBtn },
  data() {
    return {
      selectedValues: [],
    };
  },
  computed: {
    branchOptions() {
      let branches =
        this.$store.getters["branches/branchesNotAcceptingReservations"];
      return branches.map((branch) => ({
        label: `${branch.name}${
          branch.reference ? ` (${branch.reference})` : ""
        }`,
        value: branch.id,
      }));
    },
    isUpdatingBranches() {
      return this.$store.getters["branches/isUpdatingBranches"];
    },
  },
  methods: {
    async addBranches() {
      try {
        await this.$store.dispatch("branches/enableReservationsForBranches", {
          branchIds: this.selectedValues,
        });
        this.$emit("close");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
