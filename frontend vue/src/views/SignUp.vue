<template lang="html">

  <section class="signup">
    <div class="signup_intro">
        <div id="register-intro">
        <div class="logo" >
            <img src="../assets/logo/logo.png">
        </div>
        <div class="title" >
            Welcome to admin panel
        </div>
      </div>
    </div>
    <div class="signup_form md-elevation-8" >
        <div >

            <div class="title">SIGNUP</div>
                <form novalidate class="md-layout" @submit.prevent="validateUser">
                    <md-field :class="getValidationClass('name')">
                        <label for="name">Name</label>
                        <md-input type="text" name="name" id="name" autocomplete="name" v-model="form.name"  />
                        <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                    </md-field>
                    <md-field :class="getValidationClass('email')">
                        <label for="email">Email</label>
                        <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"  />
                        <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                    </md-field>
                    <md-field :class="getValidationClass('phone')">
                        <label for="phone">Phone</label>
                        <md-input type="text" name="phone" id="phone" autocomplete="phone" v-model="form.phone"  />
                        <span class="md-error" v-if="!$v.form.phone.required">The phone is required</span>
                    </md-field>
                    <md-field :class="getValidationClass('password')">
                        <label for="password">Password</label>
                        <md-input name="password" id="password"  v-model="form.password"  />
                        <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
                    </md-field>

                    <md-field :class="getValidationClass('confirm_password')">
                        <label for="confirm_password">Confirm Password</label>
                        <md-input name="confirm_password" id="confirm_password"  v-model="form.confirm_password"  />
                        <!-- <span class="md-error" v-if="!$v.form.confirm_password.required">Confirm password is required</span> -->
                        <span class="md-error" v-if="!passwordmatch">Confirm password is not matches</span>
                    </md-field>

                    <md-button type="submit" class="md-primary md-raised signinbtn" >Submit</md-button>
                  <md-snackbar :md-active.sync="showsnakbar" :md-duration="snackduration" :md-position="snakposition">{{responsemsg}}
                    <md-button class="md-primary" @click="success = false">OK</md-button>
                  </md-snackbar>
                </form>
             

            <div class="register">
                <span class="text">Already have an account?</span>
                <router-link to="/log-in">Sign In</router-link>
               
            </div>
        </div>
    </div>

  </section>

</template>

<script lang="js">
  import { validationMixin } from 'vuelidate'
  import {required,email} from 'vuelidate/lib/validators'
  import axios from 'axios'
  export default  {
    name: 'SignUp',
    props: [],
    mixins: [validationMixin],
    mounted () {

    },
    data () {
      return {
        form: {
          name: null,
          password : null,
          email: null,
          phone : null,
          confirm_password : null,
        },
        showsnakbar: false,
        snackduration: 2000,
        snakposition : 'left',
        responsemsg :  null
      }
    },
    validations: {
      form: {
        name: {
          required
        },
        email: {
          required,
          email
        },
        password: {
          required
        },
        phone: {
          required
        },
        confirm_password: {
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
        this.form.name = null
        this.form.phone = null
        this.form.password = null
        this.form.confirm_password = null
        this.form.email = null
      },
      saveUser () {
        this.$store.state.isLoading = true;
        let payload = {
          name : this.form.name,
          email :  this.form.email,
          password :  this.form.password
        }
        // Instead of this timeout, here you can call your API
        axios.post('registration',payload).then(res=>{
              this.responsemsg =  res.data.message
              this.showsnakbar = true;
              console.log('response',res); 
              this.$store.state.isLoading = false;
        }).catch(e=>{
          this.responsemsg =  e.data.error ? e.data.error : JSON.stringify(e);
          this.showsnakbar = true;
          console.log('error',e); 
          this.$store.state.isLoading = false;
        })
        // window.setTimeout(() => {
        //   this.showsnakbar = true 
        //   this.$store.state.isLoading = false;
        //   console.log('form value',payload);
        //   this.clearForm();
        // }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    },
    computed: {
        passwordmatch(){
            if(!this.form.password || !this.form.confirm_password ){
              console.log('undifined');
              return null
            }else if (this.form.password === this.form.confirm_password){
              console.log('matches');
              return true
            }else{
              console.log('not matches');
              return false
            }
            
        }
        
    }
}


</script>

<style scoped lang="scss">
  .signup {
      width: 100%;
      height: calc(100vh - 40px);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: white url('../assets/bg.png') repeat;
      overflow: hidden;
      background-repeat: cover;
      .signup_intro{
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
      .signup_form{
        width: 350px;
        height: 100%;
        padding  : 50px 40px;
        display: flex;
        // background: whitesmoke;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation-name: card_transition;
        animation-duration: 500ms;
        .md-field{
          margin: 4px 0 14px !important;
        }
        .title{
          padding: 10px;
          font-size: 20px;
          font-weight: bold;
        }
        .signinbtn{
          width: 100%;
          margin-top: 20px;
        }
        .register{
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          
        }
      }

      

      @keyframes card_transition {
        from {width: 0px;opacity: 0;}
        to {width: 350px;opacity: 1;}
      }
  }
</style>
