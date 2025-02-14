<template>
  <div
    ref="scrollContainer"
    class="generic-list overflow-auto h-full border border-gray-200 rounded"
    @scroll="throttledOnScroll"
  >
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
        <tr v-for="(item, rowIndex) in displayItems" :key="rowIndex">
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
    <div v-if="loading" class="py-4 text-center text-gray-600">Loading...</div>
  </div>
</template>

<script>
import api from "@/api/axios";
import throttle from "lodash/throttle";

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
    filterData: {
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
      loading: false,
      nextPageUrl: null,
      throttledOnScroll: null,
    };
  },
  computed: {
    cellWidth() {
      return 100 / this.columns.length + "%";
    },
    displayItems() {
      return this.items.filter((item) => {
        return Object.entries(this.filterData).every(([field, value]) => {
          if (value === null || value === undefined || value === "") {
            return true;
          }
          return item[field] === value;
        });
      });
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
      const endpoint = `/${this.modelName}`;
      const params = new URLSearchParams();

      if (this.modelIncludes && Array.isArray(this.modelIncludes)) {
        this.modelIncludes.forEach((include, index) => {
          params.append(`include[${index}]`, include);
        });
      }

      if (this.baseScope && typeof this.baseScope === "object") {
        Object.entries(this.baseScope).forEach(([key, value]) => {
          params.append(`filter[${key}]`, value);
        });
      }

      return params.toString() ? `${endpoint}?${params.toString()}` : endpoint;
    },
    fetchData(url) {
      if (this.loading) return;

      this.loading = true;
      const requestUrl = url ? url.split("v5")[1] : this.buildUrl();

      api
        .get(requestUrl)
        .then((response) => {
          const responseData = response.data;
          if (Array.isArray(responseData.data)) {
            this.items = [...this.items, ...responseData.data];
          }
          this.nextPageUrl = responseData.links?.next || null;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          this.loading = false;
          this.checkIfShouldFetchMore();
        });
    },
    onScroll() {
      const container = this.$refs.scrollContainer;
      if (!container) return;

      const scrollThreshold = 150;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - scrollThreshold
      ) {
        if (this.nextPageUrl && !this.loading) {
          this.fetchData(this.nextPageUrl);
        }
      }
    },
    checkIfShouldFetchMore() {
      this.$nextTick(() => {
        const container = this.$refs.scrollContainer;
        if (
          container &&
          container.scrollHeight <= container.clientHeight &&
          this.nextPageUrl &&
          !this.loading
        ) {
          this.fetchData(this.nextPageUrl);
        }
      });
    },
  },
  watch: {
    displayItems() {
      this.checkIfShouldFetchMore();
    },
    filterData: {
      deep: true,
      handler() {
        this.checkIfShouldFetchMore();
      },
    },
  },
  created() {
    this.fetchData();
    this.throttledOnScroll = throttle(this.onScroll, 200);
  },
  updated() {
    this.checkIfShouldFetchMore();
  },
};
</script>
