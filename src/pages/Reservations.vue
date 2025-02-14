<template>
  <div class="px-12 py-6 bg-gray-100">
    <GenericList
      :columns="columns"
      model-name="branches"
      :filter-data="{ accepts_reservations: true }"
      :model-includes="['sections', 'sections.tables']"
    >
      <template #header>
        <div class="flex justify-end bg-white px-6 py-4">
          <f-btn
            text-color="#4f4f4f"
            color="#e5e7eb"
            label="Add Branches"
            :outline="true"
          />
        </div>
      </template>
    </GenericList>
  </div>
</template>

<script>
import GenericList from "@/components/GenericList.vue";
import FBtn from "@/components/FBtn.vue";

export default {
  name: "ReservationsPage",
  data() {
    return {
      columns: [
        {
          name: "branch_name",
          label: "Branch",
          field: "name",
        },
        {
          name: "branch_reference",
          label: "Reference",
          field: (row) => row.reference || "N/A",
        },
        {
          name: "number_of_tables",
          label: "Number of Tables",
          field: (row) =>
            row.sections?.reduce(
              (acc, section) => acc + section.tables.length,
              0
            ) || 0,
        },
        {
          name: "reservation_duration",
          label: "Reservation Duration",
          field: (row) => `${row.reservation_duration} minutes`,
        },
      ],
    };
  },
  components: {
    FBtn,
    GenericList,
  },
};
</script>

<style scoped></style>
