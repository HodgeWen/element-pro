<template>
  <teleport v-if="container" :to="container">
    <div ref="containerRef" class="el-teleport" :style="containerStyle">
      <slot />
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import isServer from '@element-pro/utils/isServer'
import { elTeleportProps } from './teleport'

export default defineComponent({
  props: elTeleportProps,
  setup(props) {
    const containerRef = ref<HTMLElement>()
    const containerStyle = computed(() => {
      return props.container === 'body' ||
        (isServer && props.container === document.body)
        ? [
            props.style,
            {
              position: 'absolute',
              top: `0px`,
              left: `0px`,
              zIndex: props.zIndex,
            },
          ]
        : {}
    })
    return {
      containerRef,
      containerStyle,
    }
  },
})
</script>
