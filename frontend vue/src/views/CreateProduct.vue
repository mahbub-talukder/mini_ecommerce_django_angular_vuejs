<template >
<div class="_container"  >
    <div   class="form_container" >
        <div class="heading_toolbar">
            <span>{{editForm ? 'Update Products' : 'Create Products'}}</span>
        </div>
        <div class="form_body">
          <form novalidate class="md-layout" @submit.prevent="validateUser">
                    <md-field :class="getValidationClass('product_name')">
                        <label for="product_name">Product Name</label>
                        <md-input type="text" placeholder="Product Name"  name="product_name" id="product_name" autocomplete="product_name" v-model="form.product_name"  />
                        <span class="md-error" v-if="!$v.form.product_name.required">The product name is required</span>
                    </md-field>
                    <md-field :class="getValidationClass('product_code')">
                        <label for="product_code">Product code</label>
                        <md-input type="text" placeholder="Product Code"  name="product_code" id="product_code" autocomplete="product_code" v-model="form.product_code"  />
                        <span class="md-error" v-if="!$v.form.product_code.required">The product code is required</span>
                        
                    </md-field>
                    <md-field :class="getValidationClass('price')">
                        <label for="price">Price</label>
                        <md-input type="number" placeholder="Price" name="price" id="price" autocomplete="price" v-model="form.price"  />
                        <span class="md-error" v-if="!$v.form.price.required">The price is required</span>
                    </md-field>
                    <md-field :class="getValidationClass('brand')">
                        <label for="brand">Brand</label>
                        <md-input type="text" name="brand" id="brand" placeholder="Brand" autocomplete="brand" v-model="form.brand"  />
                        <span class="md-error" v-if="!$v.form.brand.required">The brand is required</span>
                    </md-field>
                    <md-field :class="getValidationClass('rating')">
                        <label for="rating">Rating</label>
                        <md-input type="text" name="rating" placeholder="Type rating between 0 to 5" id="rating" autocomplete="rating" v-model="form.rating"  />
                        <span class="md-error" v-if="!$v.form.rating.required">The rating is required</span>
                    </md-field>
                    <label for="expire_date">Expire date</label>
                        <md-datepicker name="expire_date" id="expire_date" v-model="form.expire_date" />
                    <!-- <md-field :class="getValidationClass('expire_date')">
                        
                        <span class="md-error" v-if="!$v.form.expire_date.required">The price is required</span>
                    </md-field>
                      -->
                    <div class="actions">
                        <md-button type="submit" class="md-primary  md-raised signinbtn" > {{editForm ? 'Update' : 'Submit'}}</md-button>
                    </div>
                    
                  <md-snackbar :md-active.sync="showsnakbar" :md-duration="snackduration" :md-position="snakposition">{{responsemsg}}
                    <md-button class="md-primary" @click="success = false">OK</md-button>
                  </md-snackbar>
                </form>
        </div>
        <!-- <md-button type="submit" class="md-primary md-raised signinbtn" >Submit</md-button> -->
    </div>
</div> 

</template>

<script >
  import { validationMixin } from 'vuelidate'
  import {required} from 'vuelidate/lib/validators'
  import axios from 'axios'
  export default  {
    name: 'CreateProduct',
    props: [],
    mixins: [validationMixin],
    mounted () {
        console.log("queryparams",this.$route.params.id);
        this.product_id = this.$route.params.id;
        if(this.product_id){
          this.editForm = true;
          this.getproductbyId(this.product_id);
        }
    },
    data () {
      return {
        form: {
          product_name : null,
          product_code : null,
          price : null,
          brand : null,
          expire_date : null,
          rating : null,
          
        },
        showsnakbar: false,
        snackduration: 2000,
        snakposition : 'left',
        responsemsg :  null,
        editForm : false,
        product_id : null
      }
    },
    validations: {
      form: {
        product_name: {required},
        product_code: {required},
        price: {required},
        brand: {required},
        expire_date: {required},
        rating: {required}
      }
    },
    methods: {

      getproductbyId(id){
          this.$store.state.isLoading = true;
          axios.get('getproductbyId/'+id).then(res=>{
            console.log('res',res);
            this.form =  res.data;
            this.$store.state.isLoading = false;
          }).catch(error=>{
          console.log('error occured ',error);
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
        this.form.product_name = null
        this.form.product_code = null
        this.form.price = null
        this.form.brand = null
        this.form.expire_date = null
        this.form.rating = null
      },
      submitForm () {
        this.$store.state.isLoading = true;
        let payload = {
          product_name : this.form.product_name,
          product_code : this.form.product_code,
          price : this.form.price,
          brand : this.form.brand,
          expire_date : this.formatDate(this.form.expire_date),
          rating : this.form.rating,
        }
         console.log('payload ',payload);
         if(!this.editForm){
            axios.post('create_products',payload).then(res=>{
              console.log('response ',res);
              this.$store.state.snackmsg =  res.data.message
              this.$store.state.showsnack = true;
              this.$store.state.isLoading = false;
              this.$router.push('/product-list');
            }).catch(error=>{
              console.log('error occured ',error);
              if (error.response) {
                  for (const property in error.response.data) {this.responsemsg = `${property}: ${error.response.data[property]}`;}
                } else {this.responsemsg = 'Something went wrong. Please try again';
              }
              this.$store.state.snackmsg =  this.responsemsg;
              this.$store.state.showsnack = true;
              this.$store.state.isLoading = false;
            })
         }else{
           this.$store.state.isLoading = true;
           axios.put('update_products/'+this.product_id,payload).then(res=>{
              console.log('response ',res);
              this.$store.state.snackmsg =  res.data.message
              this.$store.state.showsnack = true;
              this.$store.state.isLoading = false;
              this.$router.push('/product-list');
            }).catch(error=>{
              console.log('error occured ',error);
              if (error.response) {
                  for (const property in error.response.data) {this.responsemsg = `${property}: ${error.response.data[property]}`;}
                } else {this.responsemsg = 'Something went wrong. Please try again';
              }
              this.$store.state.isLoading = false;
              this.$store.state.snackmsg =  this.responsemsg;
              this.$store.state.showsnack = true;
              this.$store.state.isLoading = false;
            })
         }
        
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.submitForm()
        }
      },
    formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [year, month, day].join('-');
      }
    },
    computed: {
        dateFormat () {
        return 'yyyy-MM-dd'
        }
    }
}


</script>

<style scoped lang="scss">
  ._container{
    margin: 3% 2%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
}

.form_container{
    width: 600px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    .md-field {
      margin: 4px 0 14px !important;
    }
    .heading_toolbar{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        height: 40px;
        background: whitesmoke;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-content: center; */
        align-items: center;
        span{
          padding: 15px;
          font-weight: bold;
          font-size: 16px;
        }
    }
    .form_body{
        padding:  20px;
        .actions{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
    }
}
</style>
