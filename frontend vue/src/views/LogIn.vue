<template >

  <section class="log-in">
    <div class="login_intro">
       <div id="register-intro">
        <div class="logo" >
            <img src="../assets/logo/logo.png">
        </div>
        <div class="title" >
            Welcome to admin panel
        </div>
      </div>
    </div>
    <div class="login_form md-elevation-8" >
        <div id="login-form">

            <div class="title">SIGNIN</div>
                <form novalidate class="md-layout" @submit.prevent="validateUser">
                    <md-field :class="getValidationClass('email')">
                        <label for="email">Email</label>
                        <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"  />
                        <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                      </md-field>
                      <md-field :class="getValidationClass('password')">
                        <label for="password">Password</label>
                        <md-input name="first-name" id="password"  v-model="form.password"  />
                        <span class="md-error" v-if="!$v.form.password.required">password is required</span>
                      </md-field>
                      <md-button type="submit" class="md-primary md-raised signinbtn" >SignIn</md-button>
                  <md-snackbar :md-active.sync="showsnakbar" :md-duration="snackduration" :md-position="snakposition"> {{responsemsg}}
                    <md-button class="md-primary" @click="showsnakbar = false">OK</md-button>
                  </md-snackbar>
                </form>
             

            <div class="register">
                <span class="text">Don't have an account?</span>
                <router-link to="/sign-up">Create an account</router-link>
               
            </div>
        </div>
    </div>

  </section>

</template>

<script >
 import { validationMixin } from 'vuelidate'
 import axios from 'axios'
  import {
    required,
    email
  } from 'vuelidate/lib/validators'
  export default  {
    name: 'LogIn',
    props: [],
    mixins: [validationMixin],
    mounted () {

    },
    data () {
      return {
        form: {
        password : null,
        email: null,
      },
      showsnakbar: false,
      snackduration: 2000,
      snakposition : 'left',
      responsemsg : null
      }
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    },
    methods: {
       getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.password = null
        this.form.email = null
      },
      saveUser () {
        this.$store.state.isLoading = true;
        let payload = {
          email : this.form.email,
          password :  this.form.password
        }
        // Instead of this timeout, here you can call your API
        axios.post('login',payload).then(response=>{
              this.responsemsg =  response.data.message
              this.showsnakbar = true;
              console.log('response',response); 
              this.$store.state.isLoading = false;
              const token = response.data.token

              this.$store.commit('setToken', token)
              
              axios.defaults.headers.common["Authorization"] = "Bearer " + token

              localStorage.setItem("token", token)

              const toPath = this.$route.query.to || '/dashboard'

              this.$router.push(toPath)
        }).catch(error=>{
          if (error.response) {
              for (const property in error.response.data) {
                  this.responsemsg = `${property}: ${error.response.data[property]}`;
              }
          } else {
              this.responsemsg = 'Something went wrong. Please try again';
              
              console.log(JSON.stringify(error))
          }
          this.$store.state.isLoading = false;
        })
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
.log-in {
  width: 100%;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white url("../assets/bg.png") repeat;
  overflow: hidden;
  background-repeat: cover;
  .login_intro {
    flex: 1;
    height: 100%;
    #register-intro {
      padding: 128px;
      display: flex;
      flex-direction: column;
      .logo {
        width: 200px;
        margin-bottom: 32px;
        text-align: left;
      }
      .title {
        font-size: 42px;
        font-weight: 300;
        line-height: 1;
        text-align: left;
      }
    }
  }
  .login_form {
    width: 350px;
    height: 100%;
    padding: 50px 40px;
    display: flex;
    // background: whitesmoke;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation-name: card_transition;
    animation-duration: 500ms;
    .md-field {
      margin: 4px 0 14px !important;
    }
    .title {
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
    }
    .signinbtn {
      width: 100%;
      margin-top: 20px;
    }
    .register {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }
  }

  @keyframes card_transition {
    from {
      width: 0px;
      opacity: 0;
    }
    to {
      width: 350px;
      opacity: 1;
    }
  }
}
</style>
