import { shallowMount } from '@vue/test-utils'
import BitCoin from '@/components/BitCoin.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(BitCoin, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
