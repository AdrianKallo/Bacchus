<template>
  <div>
    <h1>Ongoing Auctions</h1>
    <div v-for="auction in filteredAuctions" :key="auction.id">
      <h2>{{ auction.title }}</h2>
      <p>Description: {{ auction.description }}</p>
      <p>Remaining Time: {{ calculateRemainingTime(auction.biddingEndDate) }}</p>
      <p v-if="isAuctionOpen(auction.biddingEndDate)">Make Offer:</p>
      <input v-if="isAuctionOpen(auction.biddingEndDate)" type="number" v-model="offerAmount" placeholder="Enter offer amount">
      <button v-if="isAuctionOpen(auction.biddingEndDate)" @click="makeOffer(auction.id, auction.productId)">Submit Offer</button>
    </div>
  </div>
</template>

  <script>
  import axios from 'axios';
  
  export default {
    props: ['auctionData'],
    data() {
      return {
        offerAmount: null,
        selectedCategory: null // Store selected category
      };
    },
    computed: {
      filteredAuctions() {
        if (!this.selectedCategory) {
          return this.auctionData;
        } else {
          return this.auctionData.filter(auction => auction.productCategory === this.selectedCategory);
        }
      }
    },
    methods: {
      calculateRemainingTime(endDate) {
        const now = new Date();
        const end = new Date(endDate);
        const diff = end - now;
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
      },
      isAuctionOpen(endDate) {
        return new Date(endDate) > new Date();
      },
      makeOffer(auctionId, productId) {
        if (!this.offerAmount || isNaN(parseFloat(this.offerAmount))) {
          alert('Please enter a valid offer amount.');
          return;
        }
        const offer = {
          auctionId: auctionId,
          productId: productId, // Pass product ID along with the offer
          offerAmount: parseFloat(this.offerAmount)
        };
        axios.post('http://localhost:5173/api/offers', offer)
          .then(response => {
            console.log('Offer submitted successfully:', response.data);
            // Optionally, you can update the UI to indicate that the offer was successfully submitted
          })
          .catch(error => {
            console.error('Error submitting offer:', error);
            // Handle error
          });
      }
    }
  };
  </script>
  