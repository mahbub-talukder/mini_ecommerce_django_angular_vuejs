<template>
  <div class="home_container">
    <div class="title_section">
        <h2>Latest products</h2>
        <md-field class="search_box">
          <label>Seach</label>
          <md-input @keyup="filterdata($event)" v-model="searchinput" placeholder="Seach everythign here .."></md-input>
        </md-field>
    </div>
    <section>
        <div class="product_sections">
            <md-progress-spinner md-mode="indeterminate" :md-diameter="30" :md-stroke="6" v-if="loading"></md-progress-spinner>
            <div v-for="(item, i) in filteredData" :key="i" >
                <md-card class="product_card md-elevation-8">
                    <div class="file-thumbnail">
                        <div class="image_section">
                            <img src="../assets/product.png" >
                        </div>
                        <div class="heading_section">
                            <h4>{{item.product_name}}</h4>
                            <p>{{item.brand}}</p>
                            <div class="rating_section">
                                <div>
                                    <span>Rating :</span>
                                </div>
                                <div  class="rating">
                                    <md-icon>{{item.rating >=1 ? 'star' : 'star_border'}}</md-icon>
                                    <md-icon>{{item.rating >=2 ? 'star' : 'star_border'}}</md-icon>
                                    <md-icon>{{item.rating >=3 ? 'star' : 'star_border'}}</md-icon>
                                    <md-icon>{{item.rating >=4 ? 'star' : 'star_border'}}</md-icon>
                                    <md-icon>{{item.rating >=5 ? 'star' : 'star_border'}}</md-icon>
                                </div>
                            </div>
                            <div class="gross_sell">
                                <span>Price :</span>
                                <span>${{item.price}}</span>
                            </div>

                        </div>
                        <div  class="overlay_section">
                            <div class="qty_section btn" >
                                <button @click="decrement()" md-icon-button><md-icon>remove</md-icon></button>
                                <input type="number" min="0" class="qty" v-model="qty">
                                <button @click="increment()" md-icon-button><md-icon>add</md-icon></button>
                            </div>
                            <div class="qty_section" >
                                <span mat-stroked-button @click="addToCart(item)">Add to Craft</span>
                            </div>
                        </div>
                    </div>
                </md-card>
            </div>
        </div>
    </section>
    <md-snackbar :md-active.sync="showsnakbar" :md-duration="snackduration" :md-position="snakposition"> {{snackmessage}}
                    <md-button class="md-primary" @click="showsnakbar = false">OK</md-button>
    </md-snackbar>
</div>

</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'Home',
  props: [],
    data () {
      return {
        searchinput : '',
        loading : false,
        dataList : [],
        filteredData : [],
        qty : 1,
        snackmessage : '',
        showsnakbar : false,
        snackduration :  2000,
        snakposition : 'left'

      }
    },
    mounted(){
      this.getAllproduct();
    },
    methods: {
      increment(){
        this.qty ++
      },
      decrement(){
        if(this.qty>1){
          this.qty --
        }
        
      },
      filterdata(_event){
        let keyword =  _event.target.value;
        this.filteredData =  this.dataList.filter(data=>{
          return data.product_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        })
      },
      getAllproduct(){
        this.$store.state.isLoading = true;
        axios.get('allproductList').then(response=>{
          console.log('response',response);
          this.dataList = response.data;
          this.filteredData = response.data;
          this.$store.state.isLoading = false;
          
        }).catch(error=>{
          console.log('error',error);
          if (error.response) {
              for (const property in error.response.data) {
                  this.snackmessage = `${property}: ${error.response.data[property]}`;
              }
          } else {
              this.snackmessage = 'Something went wrong. Please try again later';
              
              console.log(JSON.stringify(error))
          }
          this.$store.state.isLoading = false;
        })
      },
      addToCart(data) {
            if (isNaN(this.qty) || this.qty < 1) {
                this.qty = 1
            }
            data.added=  true;
            data.qty = this.qty;
            console.log('data',data);
            this.$store.commit('addToCart', data)
            this.qty = 1
            this.showsnakbar =  true;
            this.snackmessage = "This item is added to craft"
        }
    },
    computed: {
      data_length() {
            return this.dataList.length;
        }
      
    }
}
</script>
<style scoped lang="scss">
  .home_container{
    width: 100%;
    height: 100%;
    padding : 10px 50px;
    .title_section{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      h2{
        text-align: left;
        font-weight: normal;
        font-size: 20px;
        color: #666;
        font-family: 'Roboto';
      }
      .search_box{
        flex: 0 1;
      }
    }
    .product_sections{
       display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: stretch;
        .product_card{ 
            margin : 10px;
            padding : 0px !important;
            height: 230px;
            width: 220px;
            border-radius: 15px;
            // background: whitesmoke !important;
            .file-thumbnail{
                height: 230px;
                width: 220px;
                border-radius: 15px;
                position: relative;
                .image_section{
                    padding: 20px 20px 8px 20px;
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;
                    background: #80008030;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        height: 100px;
                        width: 100px;
                        border-radius: 50%;
                        filter: drop-shadow(0px 10px 6px rgba(0, 0, 0, 0.2));
                        // border: 2px solid #cccccc;

                        
                    }
                }
                .heading_section{
                    padding-left: 16px;
                    .checked{
                        color: orange;
                    }
                    span{
                        font-size: 14px;
                    }
                    p{
                        line-height: 0px;
                    }
                    h4{
                        line-height: 0px;
                        font-weight: bold;
                    }
                    .rating_section{
                      display: flex;
                      gap:5px;
                      .rating{
                        display: flex;
                        gap : 2px;
                        md-icon{
                            font-size: 14px;
                        }
                    }
                    }
                    .gross_sell{
                      display: flex;
                      gap:5px;
                    }
                    
                }
              .overlay_section{
                display: none;
                padding-top: 70px;
                .qty_section{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  &.btn{
                    margin-bottom: 15px;
                  }
                  input{

                  }
                }
              }  
            }
            .file-thumbnail:hover{
                .overlay_section{
                display: block;
                height: 230px;
                width: 220px;
                border-radius: 15px;
                position: absolute;
                background: rgba(0, 0, 0, 0.3);
                // opacity: 0.5;
                left: 0;
                top: 0;
                span{
                    width: 220px;
                    padding: 8px 0px;
                    // border: 1px solid #666;
                    color:white;
                    background-color: #f76868cf;
                    box-shadow: 1px 0px 7px 1px lightgrey;
                    text-align: center;
                    font-size: 18px;
                    cursor: pointer;
                }
                .qty{
                    width: 40px;
                    height: 30px;
                    margin: 0px;
                    padding: 0px;
                    border-radius: 2px;
                    text-align: center;
                    appearance: none;
                    border:1px;
                    -webkit-appearance: none;
                }
            }
            }
            
            
        }
    }
  }
</style>

