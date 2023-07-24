<script setup lang="ts">
import { useFetch } from "@vueuse/core";

import { Product } from "../models/product.model";
import BaseLoading from "../components/BaseLoading.vue";
import { computed, ref } from "@vue/reactivity";
import { MDBInput, MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
import {
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBBadge,
} from "mdb-vue-ui-kit";

const { isFetching, data: products } = useFetch(
  "https://fakestoreapi.com/products?sort=desc"
)
  .get()
  .json<Product[]>();

const query = ref("");

const searchProducts = computed(() =>
  products.value?.filter((product) =>
    product.title.toLowerCase().includes(query.value.toLowerCase())
  )
);
</script>

<template>
  <MDBNavbar
    container
    expand="lg"
    bg=""
    class="d-flex justify-content-between bg-gradient-to-r from-purple-500 to-pink-500"
  >
    <MDBNavbarBrand class="mx-auto col-md-4 col-lg-6">
      <MDBIcon icon="mdb" iconStyle="fab" size="2x" />
    </MDBNavbarBrand>

    <form class="d-flex input-group w-auto">
      <input
        v-model="query"
        type="search"
        class="form-control"
        placeholder="Search"
        aria-label="Search"
      />
    </form>

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

  <div class="home-container mx-auto mt-5">
    <div class="container">
      <div class="row">
        <v-col
          v-for="product of searchProducts"
          :key="product.id"
          col="12"
          md="3"
        >
          <v-card
            id="productId"
            class="mx-auto product-card"
            variant="elevated"
            :to="{ name: 'product-detail', params: { productId: product.id } }"
          >
            <div class="card card_red text-center">
              <div class="title">
                <div class="mt-1">
                  <i
                    class="fa-regular fa-heart"
                    style="margin-inline-start: 70%; color: #343434"
                  ></i>
                </div>
                <img
                  class="product-img mx-auto"
                  :src="product.image"
                  alt="Card image cap"
                  lazy-src="https://picsum.photos/1/1"
                />
              </div>
              <div class="price">
                <h4><sup>$</sup>{{ product.price }}</h4>
              </div>
              <div class="option">
                <ul>
                  <li
                    class="d-inline-block text-truncate"
                    style="max-width: 200px"
                  >
                    <i class="fa fa-check" aria-hidden="true"></i
                    >{{ product.title }}
                  </li>
                  <li></li>
                </ul>
              </div>
              <a
                :to="{
                  name: 'product-detail',
                  params: { productId: product.id },
                }"
                href="#"
                >View More
              </a>
            </div>
          </v-card>
        </v-col>
      </div>
    </div>
  </div>
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
.product-img {
  transition: all 0.3s ease-in-out;
  /*
  height: 200px;

  display: block; */
  max-width: 180px;
  display: inline-block;
  padding: 10px;
  height: 150px;
}

.product-card:hover .product-img {
  transform: scale(1.1);
}

.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
  border-radius: 20px;
}

.home-container {
}

/* */

body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

section {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 140px 0;
}

.card {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 15px;
  margin: 0 auto;
  padding-bottom: 10px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  background: linear-gradient(
    -45deg,
    rgba(102, 137, 157, 0.34) 0%,
    #8d9ad7
  ) !important;
}
.card:hover {
  transform: scale(1.05);
}
.card_red,
.card-body {
  /* background: linear-gradient(-45deg, rgba(102, 137, 157, 0.34) 0%, #8d9ad7); */
}
.card_violet,
.card_violet .title .fa {
  background: linear-gradient(-45deg, #f403d1, #64b5f6);
}
.card_three,
.card_three .title .fa {
  background: linear-gradient(-45deg, #24ff72, #9a4eff);
}

.card:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
  transform: skewY(-5deg) scale(1.5);
}

.title h2 {
  position: relative;
  margin: 20px 0 0;
  padding: 0;
  color: linear-gradient(-45deg, rgba(102, 137, 157, 0.34) 0%, #8d9ad7);
  font-size: 28px;
  z-index: 2;
}
.price {
  position: relative;
  z-index: 2;
}
.price h4 {
  margin: 0;
  padding: 10px 0;
  color: #fff;
  font-size: 30px;
}
.option {
  position: relative;
  z-index: 2;
}
.option ul {
  margin: 0;
  padding: 0;
}
.option ul li {
  margin: 0;
  padding: 0;
  list-style: none;
  color: #fff;
  font-size: 16px;
}

.title {
  width: 100%;
  background-color: #fff;
}

.card a {
  margin: 0;
  padding: 0 10px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 400;
}
</style>
