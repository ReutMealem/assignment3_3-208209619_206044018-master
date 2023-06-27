<template>
    <div class="container">
        <b-row>
        About us:
        </b-row>
      <b-row>
        <b-col cols="6" md="4" v-for="(partner, index) in partners" :key="index">
          <b-card
            :title="partner.name"
            :img-src="partner.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>{{ partner.description }}</b-card-text>
            <b-button :href="partner.linkedIn" class="button">View LinkedIn</b-button>
          </b-card>
        </b-col>
      </b-row>
  
      <b-row>
            About our recipes website:
        </b-row>
      <b-row>
        <b-col>
          <b-card
            title="OUR WEBSITE"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              This website is all about our favorite stuff, which is food. Enjoy our website by exploring different recipes that are easy to make and, in the end, very tasty.
              Here you can search for recipes by name or ingredient, customize recipes to your diet, tolerance, or cuisine.
              You can also add your own delicious recipes to the website so that everyone can enjoy them.
              Feel free to register and sign in – it's for free!
              Ready to cook, Chef?
            </b-card-text>
            <b-button :to="{ name: 'main' }" class="button">Explore our recipes website</b-button>
          </b-card>
        </b-col>
      </b-row>
  
      <b-row>
            About our older website:
        </b-row>
      <b-row>
        <b-col v-for="(website, index) in older_websites" :key="index" cols="4">
          <b-card
            :title="website.name"
            :img-src="website.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
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
      partners: [
        {
          name: "Lidor Avital",
          image: require("@/assets/Lidor.jpg"),
          description:
            "I am a BCS student in Information and Software Engineering. This is my first web full-stack project, and I hope you enjoy it.",
          linkedIn: "https://www.linkedin.com/in/lidor-avital-58a719259/",
        },
        {
          name: "Reut Mealem",
          image: require("../assets/Reut.jpg"),
          description:
            "I am a BCS student in Information and Software Engineering. Excited to be a part of this web full-stack project!",
          linkedIn: "https://www.linkedin.com/in/reut-mealem-344141270/",
        },
      ],

      older_websites: [
        {
          name: "Spaceships",
          image: require("@/assets/Lidor.jpg"),
          description:
            "I am a BCS student in Information and Software Engineering. This is my first web full-stack project, and I hope you enjoy it.",
          linkToWeb: "https://www.linkedin.com/in/lidor-avital-58a719259/",
        },
        {
          name: "Reut Mealem Web",
          image: require("../assets/Reut.jpg"),
          description:
            "I am a BCS student in Information and Software Engineering. Excited to be a part of this web full-stack project!",
          linkToWeb: "https://www.linkedin.com/in/reut-mealem-344141270/",
        },
        {
          name: "Lidor Avital Web",
          image: require("../assets/Reut.jpg"),
          description:
            "I am a BCS student in Information and Software Engineering. Excited to be a part of this web full-stack project!",
          linkToWeb: "https://www.linkedin.com/in/reut-mealem-344141270/",
        },
      ],
    };
  },
};
</script>

  
  <style>
.button {
  display: inline-block;
  padding: 10px 50px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #92817a;
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px #999;
}

.button:hover {
  background-color: #854d27;
}

.button:active {
  background-color: #854d27;
  box-shadow: 0 3px #666;
  transform: translateY(4px);
}
</style>