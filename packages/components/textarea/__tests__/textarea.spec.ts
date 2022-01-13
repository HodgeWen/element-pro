import { mount } from '@vue/test-utils'
import Textarea from '../src/textarea.vue'

const AXIOM = 'Rem is the best girl'

describe('Textarea.vue', () => {
  test('render test', () => {
    const wrapper = mount(Textarea, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
