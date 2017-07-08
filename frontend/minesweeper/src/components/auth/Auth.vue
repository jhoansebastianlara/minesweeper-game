<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container-small">
          <a class="close-modal" @click="$emit('close')">
            <img src="../../assets/icons/close.png" alt="">
          </a>

          <div class="modal-header">
            <h2>{{ $t('global.login') }}</h2>
          </div>

          <div class="modal-body">
            <div class="input-container">
              <label for="email">{{ $t('user.email') }}:</label>
              <input type="text"
                     v-model.trim="user.email"
                     class="cool-input"
                     name="email"
                     id="email"
                     placeholder="me@example.com"
                     maxlength="100">
              <span class="error-message" v-show="user.email != '' && !isValidEmail">
                {{ $t('user.enter_valid_email_error') }}
              </span>
            </div>

            <div class="buttons">
              <a class="btn_"
                 :disabled="!formIsValid"
                 @click="doLogin">{{ $t('global.login') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import authMixin from '@/mixins/authMixin'

  export default {
    data () {
      return {
        user: {
          email: ''
        }
      }
    },

    computed: {
      isValidEmail () {
        return this.validateEmail(this.user.email)
      },

      formIsValid () {
        return (this.user.email !== '' && this.isValidEmail)
      }
    },

    methods: {
      doLogin () {
        if (this.formIsValid) {
          console.log('email: ', this.user.email)
          this.login(this.user.email).then(response => {
            if (!response.success) {
              alert(this.$t('global.general_error'))
            }

            this.$emit('close')
          }, (responseError) => {
            alert(this.$t('global.general_error'))
            this.$emit('close')
          })
        }
      },

      validateEmail (email) {
        var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      }
    },

    mixins: [authMixin]
  }
</script>

<style lang="scss">
  @import "~styles";

  .input-container {
    margin-bottom: .6em;

    .error-message {
      color: color(danger);
      font-size: 1rem;
    }
  }

  .buttons {
    margin-right: .2em;
    display: flex;
    justify-content:flex-end;
    align-items: center;
  }
</style>
