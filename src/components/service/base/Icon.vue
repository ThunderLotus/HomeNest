<template>
  <div :class="wrapClasses" :style="wrapStyles">
    <i v-if="props?.css" :class="cssClasses" />
    <Icon v-else-if="props?.name" :name="props.name" :class="iconClasses" :style="iconStyles" />
    <img v-else-if="props?.url" :src="props.url" alt="" :class="iconClasses" :style="imgStyles">
  </div>
</template>

<script setup lang="ts">
import type { ServiceIcon } from '~/types'
import { ensureFlaticonCss } from '~/composables/useFlaticon'
import { FLATICON_FAMILIES } from '~/utils/flaticonIcons'

const props = defineProps<ServiceIcon>()

if (props?.css) {
  ensureFlaticonCss(FLATICON_FAMILIES)
}

const iconClasses = 'block h-full w-full'

const cssClasses = computed(() => {
  if (typeof props?.css !== 'string') {
    return iconClasses
  }
  // `css` stores `fi fi-rr-home` (or a bare `fi-rr-home`); make sure the
  // base `fi` class is present so the font-family rule applies.
  const classes = props.css.split(/\s+/).filter(Boolean)
  if (!classes.includes('fi')) {
    classes.unshift('fi')
  }
  return [...classes, iconClasses].join(' ')
})

const wrapClasses = computed(() => ({
  'bg-fg/5 dark:bg-fg/10': props?.wrap && !props?.background,
  'p-2': props?.wrap,
  [iconClasses]: true,
  'border border-fg/10 dark:border-fg/15 rounded-2xl': true,
}))

const wrapStyles = computed(() => ({
  background: props?.background,
  color: props?.color,
}))

const iconStyles = computed(() => {
  const s: Record<string, string> = {}
  if (props?.strokeWidth) {
    s['stroke-width'] = String(props.strokeWidth)
  }
  return s
})

const imgStyles = computed(() => {
  const s: Record<string, string> = {}
  if (props?.size) {
    s['object-fit'] = 'contain'
  }
  return s
})
</script>
