<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'Error',
  props: {
    msg: {
      type: String as PropType<string>,
      required: true,
    },
  },
  async mounted() {
    await this.$bvModal.msgBoxOk(this.msg, {
      title: 'エラー',
      okVariant: 'warning',
    }).then(() => this.$router.push('/'));
  },
})
</script>
