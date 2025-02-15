<template>
  <div
    ref="scrollContainer"
    class="generic-list overflow-auto h-full rounded shadow-md"
  >
    <slot name="header"></slot>
    <table
      class="min-w-full divide-y divide-gray-200 table-auto border border-gray-200 border-x-0"
    >
      <thead class="bg-white">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="px-6 py-3 text-left font-bold text-black tracking-wider text-sm"
            scope="col"
            :style="cellWidthStyle"
          >
            {{ _.startCase(column.label) }}
          </th>
        </tr>
      </thead>
      <tbody v-if="!loading" class="bg-white divide-y divide-gray-200">
        <tr v-for="(branch, rowIndex) in filteredBranches" :key="rowIndex">
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            :style="cellWidthStyle"
          >
            {{ getValue(branch, column) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="py-4 text-center text-gray-600">Loading...</div>
  </div>
</template>

<script>
export default {
  name: "BranchesList",
  data() {
    return {
      filterData: { accepts_reservations: true },
      modelName: "branches",
      modelIncludes: ["sections", "sections.tables"],
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
              (acc, section) => acc + (section.tables?.length || 0),
              0
            ) || 0,
        },
        {
          name: "reservation_duration",
          label: "Reservation Duration",
          field: (row) => `${row.reservation_duration} minutes`,
        },
      ],
      filteredBranches: [],
    };
  },
  computed: {
    branches() {
      return this.$store.getters["branches/branches"];
    },
    loading() {
      return this.$store.getters["branches/isFetchingBranches"];
    },
    cellWidthStyle() {
      return `width: ${100 / this.columns.length}%`;
    },
  },
  watch: {
    branches: {
      immediate: true,
      deep: true,
      handler(newBranches) {
        this.filteredBranches = newBranches.filter((item) =>
          Object.entries(this.filterData).every(([field, value]) =>
            value ? item[field] === value : true
          )
        );
      },
    },
  },
  methods: {
    getValue(item, column) {
      if (typeof column.field === "function") {
        return column.field(item);
      }
      return item[column.field] ?? "N/A";
    },
  },
  mounted() {
    this.$store.dispatch("branches/fetchAllBranches", {
      modelIncludes: this.modelIncludes,
    });
  },
};
</script>
