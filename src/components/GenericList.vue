<template>
  <div class="generic-list overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 table-auto">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            :style="{ width: cellWidth }"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, rowIndex) in items" :key="rowIndex">
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :style="{ width: cellWidth }"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {{ getValue(item, column) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/api/axios";

export default {
  name: "genericList",
  props: {
    modelName: {
      type: String,
      required: true,
    },
    modelIncludes: {
      type: Array,
      default: () => [],
    },
    baseScope: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    cellWidth() {
      return 100 / this.columns.length + "%";
    },
  },
  methods: {
    getValue(item, column) {
      if (typeof column.field === "function") {
        return column.field(item);
      }
      return item[column.field];
    },
    buildUrl() {
      let endpoint = `/${this.modelName}`;
      const params = new URLSearchParams();

      if (this.modelIncludes && Array.isArray(this.modelIncludes)) {
        this.modelIncludes.forEach((include, index) => {
          params.append(`include[${index}]`, include);
        });
      }

      if (this.baseScope && typeof this.baseScope === "object") {
        Object.keys(this.baseScope).forEach((key) => {
          params.append(`filter[${key}]`, this.baseScope[key]);
        });
      }

      const queryString = params.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }
      return endpoint;
    },
    fetchData() {
      const url = this.buildUrl();
      api
        .get(url)
        .then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
