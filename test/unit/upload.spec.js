import { mount } from '@vue/test-utils'
import UploadFile from '../../src/components/upload.vue'

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(UploadFile)
    console.log('wrapper', wrapper.name())
    expect(wrapper.name()).toBe('UploadFile')
  })
})