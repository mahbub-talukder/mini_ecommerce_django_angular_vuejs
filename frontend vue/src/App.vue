<template>
  <div id="app">
    <Progressbar v-if="$store.state.isLoading" />
    <md-snackbar :md-active.sync="$store.state.showsnack" :md-duration="$store.state.snackduration" md-position="left"> {{$store.state.snackmsg}}
                <md-button class="md-primary" @click="$store.state.showsnack = false">OK</md-button>
    </md-snackbar>
    <div class="page-container">
      <md-app md-waterfall md-mode="fixed">
        <md-app-toolbar class="md-primary main_toolbar" md-elevation="2">
          <div class="toolbar_section">
            <div class="brand_logo" @click="navigate()">
              <img alt="Brandlogo"  src="./assets/logo/logo.png" />
            </div>
            <div>
              <div
                class="toolbarbtn after_login"
                v-if="$store.state.isAuthenticated"
              >
                <div class="avatar">
                  <img src="./assets/profile.jpg" alt="profile" />
                </div>
                <md-menu md-size="medium" md-align-trigger>
                  <md-button md-menu-trigger
                    >Mahbub
                    <md-tooltip md-direction="top">Profile</md-tooltip>
                    <md-icon>keyboard_arrow_down</md-icon>
                  </md-button>

                  <md-menu-content>
                    <md-menu-item :to="{ path: '/dashboard' }"
                      >Dashboard</md-menu-item
                    >
                    <md-menu-item>Password Change</md-menu-item>
                    <md-menu-item @click="logout()">Logout</md-menu-item>
                  </md-menu-content>
                </md-menu>
              </div>
              <div class="toolbarbtn" v-else>
                <md-button class="md-primary" @click="showDialog = true">
                  <md-icon>shopping_cart</md-icon>
                  <span> Cart ({{ cartTotalLength }}) </span>
                </md-button>
                <md-button class="md-primary" :to="{ path: '/log-in' }"
                  >SignIN</md-button
                >
                <md-button class="md-primary" :to="{ path: '/sign-up' }">
                  SignUp</md-button
                >
              </div>
            </div>
          </div>
        </md-app-toolbar>

        <md-app-drawer
          :md-active.sync="menuVisible"
          md-permanent="clipped"
          md-persistent="mini"
          v-if="$store.state.isAuthenticated"
        >
          <md-button
            class="md-icon-button"
            @click="toggleMenu"
            v-if="!menuVisible"
          >
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
          <md-toolbar class="md-transparent" md-elevation="0">
            <span>Navigation</span>

            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>
          <md-list>
            <md-list-item :to="{ path: '/dashboard' }">
              <md-icon>dashboard</md-icon>
              <span class="md-list-item-text">Dashboard</span>
            </md-list-item>
            <md-list-item v-if="menuVisible">
              <span class="product">PRODUCT</span>
              <!-- <span class="md-list-item-text">Sent Mail</span> -->
            </md-list-item>

            <md-list-item :to="{ path: '/create-product' }">
              <md-icon>add</md-icon>
              <span class="md-list-item-text">Create Product</span>
            </md-list-item>

            <md-list-item :to="{ path: '/product-list' }">
              <md-icon>view_list</md-icon>
              <span class="md-list-item-text">Product List</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <router-view />
        </md-app-content>
      </md-app>

      <!-- dialog section start -->
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title class="dialog_title">
          <span>Shooping Carft</span>
          <span>
            <md-button
              class="md-icon-button"
              @click="showDialog = false"
            >
              <md-icon>close</md-icon>
              <md-tooltip>Close</md-tooltip>
            </md-button>
          </span>
        </md-dialog-title>
          <div class="dialog_container">
            <table class="craft_table" v-if="cartTotalLength">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in cart.items" :key="i">
                  <td>{{ item.product_name }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <input type="number" class="qty_input" v-model="item.qty" />
                  </td>
                  <td class="price_column">{{ item.price * item.qty }}</td>
                  <td style="width: 20px">
                    <md-button
                      class="md-icon-button"
                      @click="removeitem(item)"
                    >
                      <md-icon>close</md-icon>
                      <md-tooltip>Remove Item</md-tooltip>
                    </md-button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style="text-align: center" colspan="3">Total Payable</td>
                  <td class="price_column">$ {{grandtotal}}</td> 
                  <td></td>
                </tr>
              </tfoot>
            </table>

            <div class="emptymsg" v-if="cartTotalLength === 0">
              <p>{{snackmsg ? snackmsg : 'Your carft is empty!' }}</p>
            </div>

            <!-- <div class="pay_btn" v-if="cartTotalLength">
              <md-button class="md-raised md-primary"  @click="purshace()" >Shop now</md-button>
              
            </div> -->
          </div>
        <md-dialog-actions>
          <md-button class="md-primary" @click="purshace()"> <md-icon>payment</md-icon> Shop Now </md-button>
          <md-button class="md-accent" @click="clearCarft()"> <md-icon>clear</md-icon> Clear Cart</md-button
          >
        </md-dialog-actions>
      </md-dialog>
      <!-- dialgo end -->
    </div>
    <md-snackbar :md-active.sync="showsnakbar" :md-duration="snackduration" md-position="left"> {{snackmsg}}
      <md-button class="md-primary" @click="showsnakbar = false">OK</md-button>
    </md-snackbar>
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .dialog_title {
        display: flex;
        justify-content: space-between;
        gap: 20px;
  }
  .md-app .md-content.md-theme-default {
    padding: 0px !important;
  }
  .md-app {
    height: 100vh;
    .main_toolbar {
      min-height: 40px !important;
      background-color: white;
      border-bottom: 1px solid #cccccc;
    }
  }

  .toolbar_section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .brand_logo {
      img {
        width: 35px;
        height: 35px;
      }
    }
    .toolbarbtn {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      .md-button,
      .md-icon {
        color: black;
      }
      &.after_login {
        .avatar {
          img {
            width: 40px;
            height: 36px;
            border-radius: 50%;
          }
        }
        .md-icon {
          color: black !important;
        }
      }
    }
  }
  .product {
    color: rgba(0, 0, 0, 0.38);
  }
}

// Demo purposes only
.md-drawer {
  width: 250px !important;
  max-width: calc(100vw - 125px);
}
.router-link-exact-active {
  background: #3949ab !important;
  color: white !important;
}
.md-list-item-router.router-link-exact-active {
  .md-list-item-text,
  .md-icon,
  .md-list-item-content {
    color: white !important;
  }
  
}


.md-dialog .md-dialog-container {
    .dialog_title {
      display: flex;
      justify-content: space-between;
    }
    .emptymsg {
      display: flex;
      justify-content: center;
    }
   .dialog_container {
        height: 80vh;
        width: 40vw;
        padding-bottom: 20px;
        overflow: scroll;
        overflow-x: hidden;
        -ms-overflow-style: -ms-autohiding-scrollbar; 
        scrollbar-width: none;  
        padding: 0px 15px 0px 25px;
        .item_row {
          padding: 0px 11px;
          margin: 0px 10px;
          border-top: 1px solid #cccccc;
        }
        .craft_table {
          width: 100%;
          border-collapse: collapse;
          .qty_input {
            border: 0px;
            background: transparent;
            margin: 0px;
            padding: 0px;
            width: 50px;
            text-align: center;
            margin-left: 10px;
          }
          td,
          th {
            border-bottom: 1px solid #cccccc;
          }
          td {
            padding: 5px;
          }
          .price_column{
            text-align: right;
          }
          th {
            padding: 15px 5px;
          }
          tfoot {
            background-color: whitesmoke;
            td {
              font-weight: bolder;
            }
          }
        }

        .item_row:last-of-type {
          border-bottom: 1px solid #cccccc;
        }
        .pay_btn {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          .icons {
            margin-right: 10px;
          }
        }
    }
    .dialog_container::-webkit-scrollbar {
        display: none;
    }  
  }
  .md-list-item-content {
    min-height: 30px !important;
  }
</style>

<script>
import Progressbar from "./components/Progressbar";
import axios from "axios";
export default {
  components: {
    Progressbar,
  },
  data: () => ({
    menuVisible: true,
    showDialog: false,
    snackduration :  2000,
    showsnakbar : false,
    snackmsg : '',
    cart: {
      items: [],
    },
  }),
  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    navigate(){
      this.$router.push("/");
    },
    logout() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");

      this.$store.commit("removeToken");

      this.$router.push("/");
    },
    purshace() {
      this.snackmsg = "Payment getway and shipping details is not implemented,this just demo";
      this.showsnakbar = true;
      this.$store.commit('clearCart');
      this.cart = this.$store.state.cart;
    },
    clearCarft(){
      this.$store.commit('clearCart');
      this.cart = this.$store.state.cart;
      this.snackmsg = "Your cart is clear";
      this.showsnakbar = true;
    },
    removeitem(item) {
      this.cart.items = this.cart.items.filter(i => i.id !== item.id);

    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].qty;
      }

      return totalLength;
    },
    grandtotal(){
    return this.cart.items.reduce((acc,cur)=> acc + (cur.price * cur.qty),0) 
    }
  }
  
};
</script>
