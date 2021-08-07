<template >

  <div class="home_container">
    <div class="title_section">
        <h2>Products</h2>
    </div>
    <section>
        <div class="product_sections">
            <md-progress-spinner md-mode="indeterminate" :md-diameter="30" :md-stroke="6" v-if="$store.state.isLoading"></md-progress-spinner>
            <div v-for="(item, i) in dataList" :key="i" >
                <md-card class="product_card md-elevation-3">
                    <div class="file-thumbnail">
                      <div class="action_btn">
                        <md-button class="md-icon-button"  title="edit" @click="product_edit(item.id)">
                            <md-icon>edit</md-icon>
                            <!-- <md-tooltip md-direction="top">Edit</md-tooltip> -->
                          </md-button>
                       </div>
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

<script >
  import axios from 'axios'
  export default  {
    name: 'Dashboard',
    props: [],
    mounted () {
      this.getAllproduct();
    },
    data () {
      return {
        dataList: [],
        snackmessage : '',
        showsnakbar : false,
        snackduration :  2000,
        snakposition : 'left'
      }
    },
    methods: {
      getAllproduct(){
        this.$store.state.isLoading = true;
        axios.get('allproductList').then(response=>{
          console.log('response',response);
          this.dataList = response.data;
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
      product_edit(item){
        this.$router.push('/edit_product/' + item);
      }
      
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
.home_container{
    width: 100%;
    height: 100%;
    padding : 10px 30px;
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
        align-items: normal;
        .product_card{ 
            margin : 10px;
            padding : 0px !important;
            height: 260px;
            width: 240px;
            // background: #80008030;
            border-radius: 5px;
            
            .file-thumbnail{
                height: 230px;
                width: 240px;
                // border-radius: 15px;
                position: relative;
                .action_btn{
                  display: flex;
                  justify-content: flex-end;
                  align-items: flex-end;
                }
                .image_section{
                    padding: 0px 20px 8px 20px;
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;
                    // background: #80008030;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        height: 100px;
                        width: 100px;
                        border-radius: 50%;
                        border : 1px solid #666;
                        // filter: drop-shadow(0px 10px 6px rgba(0, 0, 0, 0.2));
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
