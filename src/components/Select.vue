<template>
  <div class="form-select">
    <div class="form-control"
      @click="optionsIsVisible = !optionsIsVisible"
      :class="{'active': optionsIsVisible}"
    > {{ selected }}
    </div>
    <div class="options"
      v-show="optionsIsVisible"
    >
      <span
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    selected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      optionsIsVisible: false
    }
  },
  methods: {
    selectOption (option) {
      this.$emit('select', option)
      this.optionsIsVisible = false
    },
    hideSelect () {
      this.optionsIsVisible = false
    }
  },
  mounted () {
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.hideSelect())
  }
}
</script>

<style lang="scss" scoped>
.form-select {
  background: url('../assets/image/down-arrow.svg') 97% center no-repeat;
  color: $placeholder-text-color;
  &.selected {
    color: $main-color;
  }
  .form-control {
    outline: none;
    width: 100%;
    margin-bottom: 4px;
    padding: 16px 0 15px 16px;
    border: 1px solid $secondary-color;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    border-radius: 6px;
    &.active {
      border: 2px solid $accent-color;
      padding: 15px 0 14px 15px;
    }
  }
  .options {
    position: absolute;
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 100%;
    border: 1px solid $secondary-color;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04), 0px 20px 20px rgba(44, 39, 56, 0.04);
    border-radius: 6px;
    & > span {
      padding: 12px 0 11px 15px;
      color: $text-color;
      &:hover {
        background: $bg-options-color;
        transition: all .4s ease-out;
      }
    }
  }
}
</style>
