<template>
  <div class="min-w-[30vw]">
    <header class="flex justify-start p-4">
      <div class="font-bold text-2xl">Add Branches</div>
    </header>
    <div class="bg-gray-100 px-4 py-6"></div>
    <footer class="flex justify-end gap-3 items-center p-4">
      <f-btn
        class="min-w-[5rem]"
        text-color="#4f4f4f"
        color="#e5e7eb"
        label="Cancel"
        :outline="true"
        @click="$emit('close')"
      />
      <f-btn
        class="min-w-[5rem] h-full"
        text-color="#ffffff"
        color="#440099"
        label="Save"
        @click="$emit('close')"
      />
    </footer>
  </div>
</template>

<script>
import FBtn from "@/components/FBtn.vue";

export default {
  name: "AddBranchesDialog",
  components: { FBtn },
};
</script>

<style scoped></style>
