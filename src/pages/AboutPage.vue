<template>
    <div class="container">
      <div class="title">
        <b-row>
          <b-col>
            About us:
          </b-col>
          <b-col></b-col>
          <b-col>
            About our website:
          </b-col>
        </b-row>
      </div>

      <!-- Display information about each creator using Bootstrap-Vue cards -->
      <b-row>
        <b-col cols="6" md="4" v-for="(partner, index) in partners" :key="index">
          <b-card
            :title="partner.name"
            :img-src="partner.image"
            img-alt="Image"
            img-top
            tag="article"
            style="width: 20rem; height: 50rem;"
            class="mb-2"
          >
            <b-card-text>{{ partner.description }}</b-card-text>
            <b-button :href="partner.linkedIn" class="button">View LinkedIn</b-button>
          </b-card>
        </b-col>
         <!-- Display information about the current website using a Bootstrap-Vue card -->
        <b-col>
          <b-card 
            title="OUR WEBSITE"
            :img-src= "image_web"
            img-alt="Image"
            img-top
            img-height="305px"
            img-width="200px"
            tag="article"
            style="width: 20rem; height: 50rem;"
            class="mb-2">

            <b-card-text>
              Discover a World of Flavors!
              Embrace the joy of cooking and create masterpieces in your kitchen.
              Sign up for free and become part of our vibrant community. 
              Our website is your canvas, and every dish is a delightful creation. Ready to cook up magic?
              Enjoy your culinary journey, and may your kitchen be filled with wonderful memories!  
            </b-card-text>
            <b-button :to="{ name: 'main' }" class="button">Explore our recipes website</b-button>
          </b-card>
        </b-col>
      </b-row>

  
      <div class="title">
        <b-row>
          About our older website:
        </b-row>
      </div>
      <!-- Display information about each older project using Bootstrap-Vue cards --> 
      <b-row>
        <b-col v-for="(website, index) in older_websites" :key="index" cols="4">
          <b-card
            :title="website.name"
            :img-src="website.image"
            img-alt="Image"
            img-top
            tag="article"
            style="width: 20rem; height: 58rem;"
            class="mb-2"
          >
            <b-card-text>{{ website.description }}</b-card-text>
            <b-button :href="website.linkToWeb" class="button">View Website</b-button>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </template>
  

<script>
export default {
  data() {
    return {
      // Image of the current website
      image_web:require("@/assets/logo.png"),
      // Array of objects representing creators (partners) with their information
      partners: [
        {
          name: "Lidor Avital",
          image: require("@/assets/Lidor.jpg"),
          description:
          "I am a passionate BCS student in Information and Software Engineering. As a web developer, this is my debut full-stack project, and I'm excited to present it to you. Join me on this journey of culinary exploration, and I hope you find inspiration and joy in the recipes we've curated for you.",
          linkedIn: "https://www.linkedin.com/in/lidor-avital-58a719259/",
        },
        {
          name: "Reut Mealem",
          image: require("../assets/Reut.jpg"),
          description:
          "I am an enthusiastic BCS student in Information and Software Engineering. This web full-stack project marks my first foray into the world of web development, and I'm thrilled to showcase it to you. Together, let's embark on a gastronomic adventure and discover the wonders of cooking.",
          linkedIn: "https://www.linkedin.com/in/reut-mealem-344141270/",
        },
      ],
      // Array of objects representing older projects with their information
      older_websites: [
        {
          name: "Spaceships Game",
          image: require("@/assets/spaceships.jpg"),
          description:
            "Welcome to Spaceships, a web-based game that puts you in control of a powerful spaceship. Engage in thrilling battles as you navigate through space, taking on enemy spaceships while skillfully evading their fire. Your mission is to defeat all the enemies and survive until the timer runs out. Click on the link to experience the excitement! Test your skills and enjoy the adrenaline rush. Good luck, and may the galaxy be with you!",
          linkToWeb: "https://web-development-environments-2023.github.io/assignment2-206044018_208209619/",
        },
        {
          name: "Reut Mealem's First  Web",
          image: require("../assets/reutWeb.jpg"),
          description:
          "This website dedicated to my grandfather, Michael. He is 80 years old and currently resides in Hadera. I created this website to honor him because he has been a significant influence in my life as both an educator and a shesh besh player (the best of the best!). I have a deep love and appreciation for my grandfather, and I hope this website can serve as a tribute to his life and his many accomplishments.",
          linkToWeb: "https://web-development-environments-2023.github.io/206044018/",
        },
        {
          name: "Lidor Avital's First Web",
          image: require("../assets/lidorWeb.jpg"),
          description:
            "This website is a heartfelt tribute to Joe Biden, a distinguished statesman and leader. With immense admiration and respect for his contributions, I've created this platform to celebrate his life and achievements. As a significant figure in politics, his impact has inspired countless individuals worldwide. Join me in honoring his legacy and the positive changes he's brought to the world.",
          linkToWeb: "https://www.linkedin.com/in/reut-mealem-344141270/",
        },
      ],
    };
  },
};
</script>

  
<style lang="scss" scoped>

  @import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');
  .button{
    align-items: center;
    padding: 8px;
    border-radius: 10px;
    font-family: 'Concert One', serif;
    font-size:16px;
    font-weight: 400;
    color:#000000;
    background-color: rgba(255, 255, 255, 0.5);
    width:100%;
    box-shadow: 0 5px #999;

  }
  .button:hover {
    color:white;
    background-color:  #28b1bd;
  }

  .button:active {
    box-shadow: 0 3px #666;
  }
  .card {
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Concert One', serif;
  font-size: 20px;
  font-weight: 400;
  color:black;
}
.title{
  padding: 15px;
  font-size: 40px;
  font-weight: 400;
}
.container{
  // text-align: center;
  font-family: 'Concert One', serif;
  // font-size: 20px;
  color:black;
}
</style>