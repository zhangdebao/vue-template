import { mount } from '@vue/test-utils'
import UploadFile from '../../src/components/upload.vue'

describe('Component', () => {
  test('Upload上传文件测试', async () => {
    const width = 120 
    const height = 150
    const url = 'https://exerland-bbs.oss-cn-shanghai.aliyuncs.com/g.jpeg'
    const wrapper = mount(UploadFile, {
      propsData: {
        width: width,
        height: height,
        value: url
      },
    })
    expect(wrapper.props().width).toBe(120)
    expect(wrapper.props().height).toBe(150)
    expect(wrapper.find('img').html()).toBe(`<img src="${url}?x-oss-process=image/resize,m_fill,w_${width},h_${height}" class="avatar" style="width: ${width}px; height: ${height}px;">`)
    await wrapper.setProps({
      value: ''
    })
    expect(wrapper.find('i').exists()).toBeTruthy()
    expect(wrapper.findComponent(UploadFile).exists()).toBeTruthy()
    await wrapper.setProps({
      value: 'url'
    })
    expect(wrapper.props().value).toBe('url')
  })
})