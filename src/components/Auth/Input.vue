<template>
  <div>
<!--    <div class="flex items-center justify-between">-->
<!--      <label :for="props.label" class="block text-sm/6 font-medium text-gray-900">{{props.label }}</label>-->
<!--    </div>-->
    <div class="mt-2">
      <input :id="props.label" @input="newValue" :placeholder="props.label" v-model="value" :name="props.label" :type="props.type" autocomplete="off" required class="h-[3rem] dark:text-white p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" >

    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  type: String,
  label: String,
  pr:String
})
const value = ref('')
const emit = defineEmits(['update-data']);

const newValue = () => {
  emit('update-data', value.value, props.pr);
};
</script>

<style scoped>

</style>
