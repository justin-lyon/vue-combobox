import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'

import ComboboxInput from './ComboboxInput.vue'

describe('ComboboxInput', () => {
  test('it should mount', () => {
    const wrapper = mount(ComboboxInput, {
      props: {
        label: 'anystring',
        options: []
      }
    })
    expect(wrapper).toBeDefined()
  })
})
