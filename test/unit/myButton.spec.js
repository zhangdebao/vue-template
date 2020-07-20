import { mount } from '@vue/test-utils'
import Test from '../../src/views/test.vue'

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Test)
    // expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find('Button').exists()).toBe(true)
  })
})