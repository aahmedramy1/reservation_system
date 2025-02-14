<template>
  <div class="px-12 py-6 bg-gray-100">
    <GenericList
      :columns="columns"
      model-name="branches"
      :filter-data="{ accepts_reservations: true }"
      :model-includes="['sections', 'sections.tables']"
    />
  </div>
</template>

<script>
import GenericList from "@/components/GenericList.vue";

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
    GenericList,
  },
};
</script>

<style scoped></style>
