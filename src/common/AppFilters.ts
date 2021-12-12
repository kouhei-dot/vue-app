import Vue from 'vue';
import { ValidationContext } from 'vee-validate/dist/types/components/common';
import { ValidationFlags } from 'vee-validate/dist/types/types';

Vue.filter('validState', (context: ValidationContext & ValidationFlags): boolean | null => {
  if (context.dirty) {
    return context.valid
  } else {
    return null;
  }
});
