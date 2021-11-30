import { mount } from '@vue/test-utils'
import NewTable from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('NewTable.vue', () => {
  test('render test', () => {
    const wrapper = mount(NewTable, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
