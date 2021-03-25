<template>
  <div
    @click="handleToggle"
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type" />
      <span class="font-regular text-brand-graydark"> {{ feedback.createdAt }} </span>
    </div>
  </div>
</template>

<script>
import Badge from './Badge';

export default {
  components: { Badge },
  props: {
    feedback: { type: Object, required: true }
  },
  setup () {
    function handleToggle () {
    }
    return {
      handleToggle
    };
  }
};
</script>
