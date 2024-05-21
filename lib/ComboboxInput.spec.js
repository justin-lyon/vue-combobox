import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'

import ComboboxInput from './ComboboxInput.vue'

const INPUT = '[data-test=input]'
const LISTBOX = '[data-test=listbox]'
const LIST_ITEM = '[data-test=listitem]'
const LIST_ITEM_SELECTED = '.selected[data-test=listitem]'
const CHEVRON_BUTTON = '[data-test=chevronButton]'
const CLEAR_BUTTON = '[data-test=clearButton]'

const OPTIONS = [
  { label: 'bulbasaur', value: '1' },
  { label: 'ivysaur', value: '2' },
  { label: 'venasaur', value: '3' }
]

const doMount = (options = OPTIONS) => {
  return mount(ComboboxInput, {
    props: {
      label: 'anystring',
      options
    }
  })
}

describe('ComboboxInput', () => {
  test('it should mount', () => {
    const wrapper = doMount()
    expect(wrapper).toBeDefined()

    const combobox = wrapper.find('div.combobox')
    expect(combobox).toBeDefined()
  })

  test('it should filter options by label', async () => {
    const wrapper = doMount()

    const input = wrapper.find(INPUT)
    await input.setValue('bulb')
    await input.trigger('keyup')

    const options = wrapper.findAll(LIST_ITEM)
    expect(options).toHaveLength(1)
    expect(options[0].text()).toBe('bulbasaur')
  })

  describe('on click', () => {
    test('it should toggle listbox visibility when the chevron is clicked', async () => {
      const wrapper = doMount()

      expect(wrapper.find(LISTBOX).classes()).toContain('hidden')
      await wrapper.find(CHEVRON_BUTTON).trigger('click')
      expect(wrapper.find(LISTBOX).classes()).toStrictEqual(['listbox'])
      await wrapper.find(CHEVRON_BUTTON).trigger('click')
      expect(wrapper.find(LISTBOX).classes()).toContain('hidden')
    })

    test('it should clear the search input when the clear icon is clicked', async () => {
      const wrapper = doMount()
      const input = wrapper.find(INPUT)
      await input.setValue('anystring')

      await wrapper.find(CLEAR_BUTTON).trigger('click')

      const newValue = await wrapper.find(INPUT).element.value
      expect(newValue).toBe('')
    })

    test('it should select an option when it is clicked from the listbox', async () => {
      const wrapper = doMount()
      await wrapper.find(LISTBOX).trigger('click')

      await wrapper.find(LIST_ITEM).trigger('click')

      expect(wrapper.find(INPUT).element.value).toBe('bulbasaur')
    })
  })

  describe('on arrow down', () => {
    test('it should open a hidden listbox', async () => {
      const wrapper = doMount()

      expect(wrapper.find(LISTBOX).classes()).toContain('hidden')
      await wrapper.find(INPUT).trigger('keyup.ArrowDown')

      expect(wrapper.find(LISTBOX).classes()).not.toContain('hidden')
    })

    test('when the listbox is open, it should move down the listitems in the listbox', async () => {
      const wrapper = doMount()
      expect(wrapper.findAll(LIST_ITEM)).toHaveLength(3)
      await wrapper.find(INPUT).trigger('keyup.ArrowDown')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('bulbasaur')

      await wrapper.find(INPUT).trigger('keyup.ArrowDown')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('ivysaur')

      await wrapper.find(INPUT).trigger('keyup.ArrowDown')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('venasaur')

      await wrapper.find(INPUT).trigger('keyup.ArrowDown')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('bulbasaur')
    })
  })

  describe('on arrow up', () => {
    test('it should open a hidden listbox', async () => {
      const wrapper = doMount()

      expect(wrapper.find(LISTBOX).classes()).toContain('hidden')
      await wrapper.find(INPUT).trigger('keyup.ArrowUp')

      expect(wrapper.find(LISTBOX).classes()).not.toContain('hidden')
    })

    test('when the listbox is open, it should move up the listitems in the listbox', async () => {
      const wrapper = doMount()
      await wrapper.find(INPUT).trigger('keyup.ArrowUp')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('bulbasaur')

      await wrapper.find(INPUT).trigger('keyup.ArrowUp')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('venasaur')

      await wrapper.find(INPUT).trigger('keyup.ArrowUp')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('ivysaur')

      await wrapper.find(INPUT).trigger('keyup.ArrowUp')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('bulbasaur')
    })
  })

  describe('on escape', () => {
    test('it should hide the listbox when open', async () => {
      const wrapper = doMount()

      await wrapper.find(INPUT).trigger('keyup.ArrowDown')
      expect(wrapper.find(LISTBOX).classes()).not.toContain('hidden')
      await wrapper.find(INPUT).trigger('keyup.Escape')
      expect(wrapper.find(LISTBOX).classes()).toContain('hidden')
    })

    test('it should clear the text input when the listbox is closed', async () => {
      const wrapper = doMount()

      await wrapper.find(INPUT).trigger('keyup')
      expect(wrapper.find(LISTBOX).classes()).not.toContain('hidden')
      await wrapper.find(INPUT).trigger('keyup.Escape')
      expect(wrapper.find(LISTBOX).classes()).toContain('hidden')

      await wrapper.find(INPUT).setValue('char')
      expect(wrapper.find(INPUT).element.value).toBe('char')
      await wrapper.find(INPUT).trigger('keyup.Escape')
      expect(wrapper.find(INPUT).element.value).toBe('')
    })
  })

  describe('on enter', () => {
    test('it should select the current active item when the listbox is open', async () => {
      const wrapper = doMount()
      expect(wrapper.findAll(LIST_ITEM)).toHaveLength(3)
      await wrapper.find(INPUT).trigger('keyup.ArrowDown')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('bulbasaur')

      await wrapper.find(INPUT).trigger('keyup.ArrowDown')
      expect(wrapper.find(LIST_ITEM_SELECTED).text()).toBe('ivysaur')

      expect(wrapper.find(INPUT).element.value).toBe('')
      await wrapper.find(INPUT).trigger('keyup.Enter')
      expect(wrapper.find(INPUT).element.value).toBe('ivysaur')
    })
  })
})
