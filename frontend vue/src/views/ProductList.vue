<template lang="html">

  <div class="users_container" >
    <div  class="heading" >
        <h1 class="title">Product List </h1>
        <div class="create_btn" >
            <md-button class="md-icon-button" @click="list_mode = false">
              <md-icon>view_module</md-icon>
              <md-tooltip md-direction="top">Grid View</md-tooltip>
            </md-button>
            <md-button class="md-icon-button" @click="list_mode = true">
              <md-icon>view_list</md-icon>
              <md-tooltip md-direction="top">List View</md-tooltip>
            </md-button>
            <md-button class="md-primary" @click="create_new()">
                <md-icon>add</md-icon>
                <span>Add Product</span>
                <md-tooltip md-direction="top">Add Product</md-tooltip>
            </md-button>
        </div>
    </div>
    <div  class="search_section">
        <div class="search_bar"  >
            <md-field class="search_box">
              <label>Seach</label>
              <md-input @keyup="filterdata($event)" v-model="searchinput" placeholder="Seach everythign here .."></md-input>
            </md-field>
        </div>
        <div class="export_section" >
            <md-button class="md-icon-button md-raised md-primary" >
              <md-icon>print</md-icon>
              <md-tooltip md-direction="top">Print</md-tooltip>
            </md-button>
            <md-button class="md-icon-button md-raised md-primary" >
              <md-icon>get_app</md-icon>
              <md-tooltip md-direction="top">Export in excel</md-tooltip>
            </md-button>
        </div>
    </div>
    <div class="grid-view table_container" v-if="!list_mode">
        <div class="mat_table_container">
            <md-table v-model="filteredData" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Product Name" md-sort-by="product_name">{{ item.product_name }}</md-table-cell>
                <md-table-cell md-label="Product Code" md-sort-by="product_code">{{ item.product_code }}</md-table-cell>
                <md-table-cell md-label="Brand" md-sort-by="brand">{{ item.brand }}</md-table-cell>
                <md-table-cell md-label="Price" md-sort-by="price">{{ item.price }}</md-table-cell>
                <md-table-cell md-label="Expire Date" md-sort-by="expire_date">{{ item.expire_date }}</md-table-cell>
                <md-table-cell md-label="Rating" md-sort-by="rating">{{ item.rating }}</md-table-cell>
                <md-table-cell md-label="Action" >
                  <md-button class="md-icon-button" @click="productupdate(item)">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
    </div>
    <div class="list-view" v-if="list_mode">
        <div class="product_sections">
            <md-progress-spinner md-mode="indeterminate" :md-diameter="30" :md-stroke="6" v-if="$store.state.isLoading"></md-progress-spinner>
            <div v-for="(item, i) in filteredData" :key="i" >
                <md-card class="product_card md-elevation-3">
                    <div class="file-thumbnail">
                      <div class="action_btn">
                        <md-button class="md-icon-button"  title="edit" @click="productupdate(item)">
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
    </div>
    <div style="display: none;" id="print-section">
    <div class="print_container">
        <div class="print_heading">
            <h1 style="text-align: center;">Product List</h1>
        </div>
        <div class="print_content">
            <table id="excel_sheet">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Code</th>
                        <th>Product Brand</th>
                        <th>Product Price</th>
                        <th>Expire Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in filteredData" :key="i">
                        <td>{{item.product_name}}</td>
                        <td>{{item.product_code}}</td>
                        <td>{{item.brand}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.expire_date}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>



</template>

<script lang="js">
import axios from "axios";
  export default  {
    name: 'ProductList',
    props: [],
    mounted () {
      this.getAllproduct();
    },
    data () {
      return {
          dataList : [],
          filteredData : [],
          list_mode : false,
          searchinput : null,
          snackmessage : ''
      }
    },
    methods: {
      filterdata(_event){
        let keyword =  _event.target.value;
        this.filteredData =  this.dataList.filter(data=>{
          return data.product_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
          })
        },
        productupdate(item){
          this.$router.push('/edit_product/' + item.id);
        },
        create_new(){
          this.$router.push('/create-product');
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
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .users_container{
    height: 100%;
    margin: 1% 5%;
    // background-color: whitesmoke;
    // border: 1px solid #cccccc;
    // border-radius: 5px;
    .heading{
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
            line-height: 0px;
            font-weight: bolder;
            color:#666;
            flex:1;
            text-align: left;
        }
        .create_btn{
            flex: 0 1;
            display: flex;
            justify-content: end;
            align-items: start;
            gap:2px;
            .add_button{
                border-radius: 25px;
                // background-color: green;
            }
            .add_button span{
                margin-left: 5px;
            }
        }
    }
    .search_section{
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap:16px;
        .search_bar{
            flex-basis:30%;
        }
        .export_section{
            flex: 0 1;
            display: flex;
            justify-content: end;
            align-items: start;
            gap:16px;
        }
    }
    .table_container{
        display: flex;
        justify-content: center;
        align-items: center;
        .mat_table_container{
          width: 100%;
          flex:100%;
          .md-table{
            margin-left: 0px !important;
            margin-right: 0px !important;
          }
          margin-bottom: 30px;
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
