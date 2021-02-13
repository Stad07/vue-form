<template>
  <div class="form-wrapper">
    <form class="form" autocomplete="off" @submit.prevent="onSubmit">
      <h1>Регистрация</h1>
      <p>Уже есть аккаунт?<span style="margin-left: 6px;">Войти</span></p>

      <div class="form-group">
        <label for="name">Имя</label>
        <input
          type="text"
          id="name"
          class="form-input"
          placeholder="Введите ваше имя"
          v-model.trim="name"
        />
          <div class="invalid-feedback" v-if="!$v.name.required && $v.name.$dirty">Поле не должно быть пустым</div>
          <div class="invalid-feedback" v-if="!$v.name.correctName && $v.name.$dirty">Введено некорректное значение</div>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-input"
          placeholder="Введите ваш email"
          v-model.trim="email"
        />
        <div class="invalid-feedback" v-if="!$v.email.required && $v.email.$dirty">Поле не должно быть пустым</div>
        <div class="invalid-feedback" v-if="!$v.email.email && $v.email.$dirty">Введено некорректное значение</div>
      </div>

      <div class="form-group">
        <label for="phone">Номер телефона</label>
        <input
          type="text"
          id="phone"
          class="form-input"
          placeholder="Введите номер телефона"
          v-model.trim="phone"
        />
        <div class="invalid-feedback" v-if="!$v.phone.correctPhone && $v.phone.$dirty">Введено некорректное значение</div>
      </div>

      <div class="form-group">
        <label for="language">Язык</label>
        <v-select id="language"
          :class="{'selected': !!selectLanguage}"
          :options="options"
          @select="optionSelect"
          :selected="selected"
          v-model="selectLanguage"
        >
        </v-select>
      </div>

      <div class="form-check">
        <v-checkbox class="form-check-input" id="notification"
          :class="{checked: argeeWithRules}"
          v-model="argeeWithRules"
          @checked="checked"
        >
        </v-checkbox>
        <label for="">Принимаю<span><pre> условия </pre></span>использования</label>
      </div>

      <button
        type="submit"
        class="btn form-button"
        :class="[submition ? 'disabled' : 'enabled']"
      >
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script>
import Select from './Select'
import Checkbox from './Checkbox'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Form',
  data () {
    return {
      submitStatus: null,
      name: '',
      email: '',
      phone: '',
      argeeWithRules: false,
      selectLanguage: '',
      selected: 'Язык',
      options: [
        {
          label: 'Русский',
          value: 'Russian'
        },
        {
          label: 'Английский',
          value: 'English'
        },
        {
          label: 'Китайский',
          value: 'China'
        },
        {
          label: 'Испанский',
          value: 'Spanish'
        }
      ]
    }
  },
  components: {
    'v-select': Select,
    'v-checkbox': Checkbox
  },
  computed: {
    submition () {
      return this.$v.$invalid
    }
  },
  methods: {
    optionSelect (option) {
      this.selectLanguage = option.value
      this.selected = option.label
    },
    checked () {
      this.argeeWithRules = !this.argeeWithRules
    },
    onSubmit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          // reset
          this.name = ''
          this.email = ''
          this.phone = ''
          this.selected = 'Язык'
          this.selectLanguage = ''
          this.argeeWithRules = false
          this.$v.$reset()
        }, 500)
      }
    }
  },
  validations: {
    name: {
      required,
      correctName (userName) {
        const regex = /([^-a-zA-z-Zа-яА-Я\s]|[_\\^])/
        return !(regex.test(userName))
      }
    },
    email: {
      required,
      email
    },
    phone: {
      correctPhone: (userPhone) => {
        const regex = /^((\d|\+7)[-]?)?(\(?\d{3}\)?){1}[0-9]+|-*\d$/
        return userPhone ? regex.test(userPhone) && userPhone.split('').filter(i =>
          i !== '(' && i !== ')' && i !== '-' && i !== '+').join('').length === 11 : false
      }
    },
    argeeWithRules: { checked: v => v }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 460px;
  background: #FFF;
  border-radius: 24px;
  box-shadow: 0px 12px 24px rgba(44, 39, 56, 0.02), 0px 32px 64px rgba(44, 39, 56, 0.04);
  padding: 40px 30px;
}

h1 {
  font-weight: bold;
  font-size: 2.125rem;
  line-height: 1;
  margin-bottom: 8px;
}

p {
  margin-bottom: 58px;
}

span {
  color: $accent-color;
  cursor: pointer;
  pre {
    font-family: inherit;
  }
}

.form-group {
  position: relative;
  margin-bottom: 34px;
  &:last-child {
    margin-bottom: 31px;
  }
  label {
    display: inline-block;
    font-weight: 500;
    color: $text-color;
    margin-bottom: 7px;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0px 1000px #fff inset !important;
  }
  .form-input {
    outline: none;
    width: 100%;
    border: 1px solid $secondary-color;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    border-radius: 6px;
    padding: 16px 0 15px 16px;
    &::placeholder {
      color: $placeholder-text-color;
      font-size: 1rem;
      font-family: 'IBM Plex Sans', Helvetica, Arial, sans-serif;
    }
    &:focus {
      border: 2px solid $accent-color;
      padding: 15px 0 14px 15px;
    }
  }
}

.form-check {
  display: flex;
  align-items: center;
  margin-bottom: 37px;
  label {
    display: flex;
  }
  &-input.checked {
    border: 2px solid $accent-color;
    background: url('../assets/image/tick.svg') center no-repeat;
  }
}

.form-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 18px 0;
  box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08), 0px 4px 8px rgba(44, 39, 56, 0.08);
  border: none;
  outline: none;
  border-radius: 6px;
  font-weight: 500;
  line-height: 21px;
  font-size: 1rem;
  cursor: pointer;
  &.disabled {
    background: $secondary-color;
    color: #B1B5BF;
  }
  &.enabled {
    background: $accent-color;
    color: #EBF4F8;
  }
}

.invalid-feedback {
  position: absolute;
  bottom: -22px;
  font-size: 14px;
  line-height: 18px;
  color: $invalid-color;
}
</style>
