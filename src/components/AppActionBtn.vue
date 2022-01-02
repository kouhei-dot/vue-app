<template>
  <b-button
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="invalid"
    :variant="invalid ? 'secondary' : 'success'"
    pill
  >
    <slot></slot>
  </b-button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
export default Vue.extend({
  name: 'AppActionBtn',
  props: {
    invalid: {
      type: Boolean as PropType<boolean>,
      default: false,
      required: false,
    },
  },
})
</script>
