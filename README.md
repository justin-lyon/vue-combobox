# vuenilla-combobox

A vue 3 combobox that inherits the styles from your style system of choice. Some assembly required.

## Usage

```vue
<script setup>
import { VuenillaCombobox } from 'vuenilla-combobox'
import 'vuenilla-combobox/dist/style.css'
</script>

<template>
  <VuenillaCombobox
    label="Pokemon"
    placeholder="🔎 Pokemon..."
    is-label-hidden
    :options="options"
  />
</template>

<style>
:root {
  --vue-combobox-background-color: #1c1b22;
  --vue-combobox-selected-background-color: #fff;
  --vue-combobox-font-color: var(--vue-combobox-selected-background-color);
  --vue-combobox-font-selected-color: var(--vue-combobox-background-color);
  --vue-combobox-border-radius: 0.5rem;
}
</style>
```

## Public Properties

Public properties available to customize the combobox.

| property       | type    | required | default      | example                                | description                                                                                   |
| -------------- | ------- | -------- | ------------ | -------------------------------------- | --------------------------------------------------------------------------------------------- |
| options        | Array   | Yes      | n/a          | `[{ label: 'bulbasaur', value: '1' }]` | The options to be used in the combobox                                                        |
| label          | String  | Yes      | n/a          | Search                                 | The label used for both the display label and the aria label                                  |
| placeholder    | String  | No       | 🔎 Search... | 🔎 Search...                           | The placeholder text for the combobox input                                                   |
| isLabelHidden  | Boolean | No       | `false`      | `true`                                 | Whether the display label should be hidden or not                                             |
| maxDisplayRows | Number  | No       | `10`         | `10`                                   | How many items can be shown at once in the combobox? Regardless of how many options there are |

## CSS Properties

Assign values to these CSS Properties in order to share your styles with the combobox.

| property                                 | description                                                       |
| ---------------------------------------- | ----------------------------------------------------------------- |
| --vue-combobox-font-color                | set the color for the combobox                                    |
| --vue-combobox-background-color          | set the background color for the combobox                         |
| --vue-combobox-border-radius             | set the border radius for the combobox                            |
| --vue-combobox-font-selected-color       | set the font color when a list item is selected and hovered       |
| --vue-combobox-selected-background-color | set the background color when a list item is selected and hovered |
