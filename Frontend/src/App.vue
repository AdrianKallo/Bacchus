<template>
  <div id="app">
    <nav>
      <ul>
        <li v-for="category in categories" :key="category" @click="filterProducts(category)">
          {{ category }}
        </li>
        <li @click="resetFilter">Reset</li>
      </ul>
    </nav>
    <router-view :auctionData="filteredAuctions" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      auctionData: [],
      selectedCategory: null // Store selected category
    };
  },
  created() {
    this.fetchAuctionData();
  },
  methods: {
    fetchAuctionData() {
  axios.get('http://localhost:5173/api/auction')
    .then(response => {
      if (Array.isArray(response.data)) {
        // If response data is an array, directly use it
        this.auctionData = response.data;
      } else if (response.data && response.data.auctions && Array.isArray(response.data.auctions)) {
        // If response data is an object with an 'auctions' property containing an array, use that array
        this.auctionData = response.data.auctions;
      } else {
        console.error('Invalid auction data format:', response.data);
        // Handle error or set this.auctionData to an empty array
        this.auctionData = [];
      }
      // Extract categories from fetched auction data
      this.categories = Array.from(new Set(this.auctionData.map(item => item.productCategory)));
    })
    .catch(error => {
      console.error('Error fetching auction data:', error.message);
      // Handle error
    });
},
    filterProducts(category) {
      this.selectedCategory = category;
    },
    resetFilter() {
      this.selectedCategory = null;
    }
  },
  computed: {
    filteredAuctions() {
      if (!this.selectedCategory) {
        return this.auctionData;
      } else {
        return this.auctionData.filter(auction => auction.productCategory === this.selectedCategory);
      }
    }
  }
};
</script>
