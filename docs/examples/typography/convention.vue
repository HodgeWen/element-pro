<template>
  <table class="demo-typo-size">
    <tbody>
      <tr>
        <td>Level</td>
        <td>Font Size</td>
        <td class="color-dark-light">Demo</td>
      </tr>
      <tr
        v-for="(fontSize, i) in fontSizes"
        :key="i"
        :style="`font-size: var(--el-font-size-${fontSize.type})`"
      >
        <td>{{ fontSize.level }}</td>
        <td>{{ fontSize.size + ' ' + formatType(fontSize.type) }}</td>
        <td>Build with Element</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
const fontSizes = [
  {
    level: 'Supplementary text',
    type: 'extra-small',
    size: '12px',
  },
  {
    level: 'Body (small)',
    type: 'small',
    size: '13px',
  },
  {
    level: 'Body',
    type: 'base',
    size: '14px',
  },
  {
    level: 'Small Title',
    type: 'medium',
    size: '16px',
  },
  {
    level: 'Title',
    type: 'large',
    size: '18px',
  },
  {
    level: 'Main Title',
    type: 'extra-large',
    size: '20px',
  },
]
export default {
  data() {
    return {
      fontSizes,
    }
  },
  methods: {
    formatType(type) {
      return type
        .split('-')
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join(' ')
    },
  },
}
</script>
