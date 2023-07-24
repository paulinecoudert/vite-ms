<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import { Product } from "../models/product.model";

import { useRoute } from "vue-router";
// import BaseLoading from "../components/BaseLoading.vue";
import { MDBIcon } from "mdb-vue-ui-kit";
import {
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBBadge,
} from "mdb-vue-ui-kit";

const {
  params: { productId },
} = useRoute();

const { isFetching, data: product } = useFetch(
  `https://fakestoreapi.com/products/${productId}`
)
  .get()
  .json<Product>();
</script>

<template>
  <MDBNavbar
    container
    expand="lg"
    bg=""
    class="d-flex justify-content-between bg-gradient-to-r from-purple-500 to-pink-500"
  >
    <MDBNavbarBrand class="mx-auto col-md-8 col-lg-8">
      <MDBIcon icon="mdb" iconStyle="fab" size="2x" />
    </MDBNavbarBrand>

    <MDBNavbarNav
      class="col-md-2 mx-auto col-4 ml-3 mb-lg-0 ml-4 mr-0 d-flex flex-row"
    >
      <MDBNavbarItem to="#" class="me-3 me-lg-0" linkClass="link-secondary"
        ><MDBIcon icon="shopping-cart"></MDBIcon>
      </MDBNavbarItem>
      <MDBNavbarItem to="#" class="me-3 me-lg-0" linkClass="link-secondary">
        <MDBIcon icon="bell" />
        <MDBBadge notification color="danger" pill>1</MDBBadge>
      </MDBNavbarItem>
      <MDBNavbarItem href="#" class="me-3 me-lg-0">
        <img
          src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
          class="rounded-circle"
          height="22"
          alt=""
          loading="lazy"
        />
      </MDBNavbarItem>
    </MDBNavbarNav>
  </MDBNavbar>
  <v-container>
    <v-btn
      class="text-white"
      style="
        background: linear-gradient(-45deg, rgba(102, 137, 157, 0.34), #8d9ad7);
      "
      variant="text"
      @click="$router.back()"
    >
      <v-icon start icon="mdi-arrow-left"></v-icon>
      Back
    </v-btn>

    <div class="d-flex flex-wrap p-2">
      <div v-if="product" class="p-2 col-xs-12 col-sm-6 flex-fill">
        <v-img :src="product.image" max-width="400" class=""></v-img>
      </div>
      <div v-if="product" class="p-2 col-xs-12 col-sm-6 flex-fill">
        <span class="text-h4">{{ product.title }}</span>
        <span class="d-flex description">{{ product.description }}</span>
        <h4 class="price"><sup>$</sup>{{ product.price }}</h4>
        <div class="buttons-group">
          <v-btn to="/" variant="text">buy now</v-btn>

          <v-btn
            to="/"
            class="text-white"
            style="background: linear-gradient(-45deg, #66899d57, #8d9ad7)"
          >
            add to cart
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
  <footer class="text-center text-lg-start shadow p-3 mt-3 bg-white rounded">
    <!-- Copyright -->
    <div class="text-center p-3">
      © 2023 Copyright:
      <a class="text-dark">MineShop</a>
    </div>
    <!-- Copyright -->
  </footer>
  <base-loading :loading="isFetching"></base-loading>
</template>

<style scoped>
.buttons-group {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 2em;
}

.price {
  margin: 0;
  padding: 20px 0;
  color: #8d9ad7;
  font-size: 60px;
}

.text-h4 {
  margin: 0;
  padding: 20px 0;
  color: #8d9ad7;
  font-size: 24px;
}

.description {
  margin: 0;
  padding: 20px 0;
  color: #3e3f43;
  font-size: 16px;
  gap: 3rem;
}
</style>
