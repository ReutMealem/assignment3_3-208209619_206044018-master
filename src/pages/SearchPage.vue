<template>
  <div class="container">
    <div>
      <div class="title">Search Page</div>

      <!-- Back to Search Button -->
      <b-button
        class="buttons button-back"
        type="submit"
        v-on:click="showSearchResult = false"
        v-if="showSearchResult"
        >Back To Search</b-button
      >

      <!-- Search Form -->
      <div class="formd mx-auto">
        <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
          <b-form-group
            id="input-group-name"
            label-cols-sm="3"
            label="Recipe name:"
            label-for="recipe_name"
            v-if="!showSearchResult"
          >
            <!-- Recipe Name Input -->
            <b-form-input
              id="recipe_name"
              v-model="form.recipe_name"
              type="text"
              placeholder="Enter Recipe name"
              required
            >
            </b-form-input>
          </b-form-group>

          <!-- Amount Select -->
          <b-form-group
            id="input-group-amount"
            label-cols-sm="3"
            label="Amount:"
            label-for="amount"
            v-if="!showSearchResult"
          >
            <b-form-select
              id="amount"
              v-model="form.amount"
              :options="amount_options"
              required
            >
            </b-form-select>
          </b-form-group>

          <!-- Sort By Select -->
          <b-form-group
            id="input-group-sort"
            label-cols-sm="3"
            label="Sort by:"
            label-for="sort"
            v-if="!showSearchResult"
          >
            <b-form-select
              id="sort"
              v-model="form.sort"
              :options="sort_options"
              required
            >
            </b-form-select>
          </b-form-group>

          <!-- Cuisine Select -->
          <b-form-group
            id="input-group-cuisine"
            label-cols-sm="3"
            label="Cuisine:"
            label-for="cuisine"
            v-if="!showSearchResult"
          >
            <b-form-select
              id="cuisine"
              v-model="form.cuisine"
              :options="cuisines"
            ></b-form-select>
          </b-form-group>

          <!-- Diet Select -->
          <b-form-group
            id="input-group-diet"
            label-cols-sm="3"
            label="Diet:"
            label-for="diet"
            v-if="!showSearchResult"
          >
            <b-form-select
              id="diet"
              v-model="form.diet"
              :options="diets"
            ></b-form-select>
          </b-form-group>

          <!-- Intolerance Select -->
          <b-form-group
            id="input-group-intolerance"
            label-cols-sm="3"
            label="Intolerance:"
            label-for="intolerance"
            v-if="!showSearchResult"
          >
            <b-form-select
              id="intolerance"
              v-model="form.intolerance"
              :options="intolerances"
            >
            </b-form-select>
          </b-form-group>

          <!-- Reset and Search Buttons -->
          <b-form-group>
            <b-button
              type="reset"
              v-if="!showSearchResult"
              class="ml-5 w-15 buttons"
              >Reset</b-button
            >
            <b-button
              type="submit"
              v-if="!showSearchResult"
              class="ml-5 w-20 buttons"
              >Search</b-button
            >
          </b-form-group>

          <!-- Last Search Button -->
          <b-form-group>
            <b-button
              type="button"
              class="buttons"
              v-on:click="showLastSearch"
              v-if="
                $root.store.username && !lastSearch == '' && !showSearchResult
              "
              >Last search</b-button
            >
          </b-form-group>
        </b-form>
      </div>


      <!-- Search Error Alert -->
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Search failed: {{ form.submitError }}
      </b-alert>


      <!-- Search Results Display -->
      <div class="results">
        <span v-if="showSearchResult"
          >Search Results for: {{ form.recipe_name }}, Amount:
          {{ form.amount }}, Order by: {{ form.sort }}</span
        >
        <p v-if="showSearchResult">
          <span v-if="form.cuisine">Cuisine: {{ form.cuisine }}, </span>
          <span v-if="form.diet">Diet: {{ form.diet }}, </span>
          <span v-if="form.intolerance"
            >Intolerance: {{ form.intolerance }}</span
          >
        </p>
      </div>

      <!-- Recipe Preview List -->
      <p v-if="$root.store.username">
        <RecipePreviewList
          v-if="showSearchResult"
          title="Search result"
          v-bind:path="searchPath"
          page_type="API"
        ></RecipePreviewList>
      </p>
      <p v-else>
        <RecipePreviewList
          v-if="showSearchResult"
          title="Search result"
          v-bind:path="searchPath"
          :check_viewed="false"
          page_type="API"
        ></RecipePreviewList>
      </p>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "Search",
  components: {
    RecipePreviewList,
  },
  data() {
    return {

      // Form Data 
      form: {
        recipe_name: "",
        amount: "5",
        sort: "popularity",
        cuisine: "",
        diet: "",
        intolerance: "",
        submitError: undefined,
      },
      // Available Sort, Amount, Cuisines Options
      sort_options: ["popularity", "time"],
      amount_options: ["5", "10", "15"],
      cuisines: ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'],
      diets: ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'],
      intolerances: ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut'],

      
      // Last Search Data 
      lastSearch: localStorage.getItem("lastSearch"),

      // Flag to Show Search Results 
      showSearchResult: false,

      // Search Path 
      searchPath: "",
    };
  },
  methods: {
    // Perform Search
    async onSearch() {
      try {
        // Prepare Search Path
        this.searchPath = "/recipes/searchRecipes/";
        if (this.form.recipe_name) {
          this.searchPath += this.form.recipe_name + "/";
        } else {
          this.searchPath += "null/";
        }

        if (this.form.amount) {
          this.searchPath += this.form.amount + "/";
        } else {
          this.searchPath += "5/";
        }

        if (this.form.sort) {
          this.searchPath += this.form.sort + "/";
        } else {
          this.searchPath += "null/";
        }

        if (this.form.cuisine) {
          this.searchPath += this.form.cuisine + "/";
        } else {
          this.searchPath += "null/";
        }

        if (this.form.diet) {
          this.searchPath += this.form.diet + "/";
        } else {
          this.searchPath += "null/";
        }

        if (this.form.intolerance) {
          this.searchPath += this.form.intolerance;
        } else {
          this.searchPath += "null";
        }

        console.log("this.searchPath: ", this.searchPath);
        this.showSearchResult = true;
        this.lastSearch = {
          recipe_name: this.form.recipe_name,
          amount: this.form.amount,
          sort: this.form.sort,
          cuisine: this.form.cuisine,
          diet: this.form.diet,
          intolerance: this.form.intolerance,
          submitError: this.form.submitError,
        };
        localStorage.setItem("lastSearch", JSON.stringify(this.lastSearch));
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
        this.$root.toast(
          "OOPS",
          "something went wrong, please try again",
          "danger"
        );
      }
    },
    // Reset Search Form
    onReset() {
      this.form = {
        recipe_name: "",
        amount: "5",
        sort: "popularity",
        cuisine: "",
        diet: "",
        intolerance: "",
      };
    },
    // Update Last Search Results and Show
    showLastSearch() {
      if (this.lastSearch != "") {
        this.lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
        this.form.recipe_name = this.lastSearch.recipe_name;
        this.form.amount = this.lastSearch.amount;
        this.form.sort = this.lastSearch.sort;
        this.form.cuisine = this.lastSearch.cuisine;
        this.form.diet = this.lastSearch.diet;
        this.form.intolerance = this.lastSearch.intolerance;
        this.onSearch();
        // this.onReset();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap");
.buttons {
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  font-family: "Concert One", serif;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  background-color: rgba(255, 255, 255, 0.5);
  width: 35%;
}
.button-back {
  margin-left: 18px;
}
.buttons:hover {
  color: white;
  background-color: #28b1bd;
}
.results {
  border-radius: 10px;
  width: 50rem;
  color: black;
  background-color: rgba(255, 255, 255, 0.447);
  margin-left: 18px;
  // padding:5px;
}
.container {
  font-family: "Concert One", serif;
  font-size: 20px;
  color: black;
}
.formd {
  max-width: 600px;
}
.title {
  text-align: center;
  padding: 15px;
  font-size: 40px;
  font-weight: 400;
}
.sticky {
  position: fixed;
}
.research {
  text-align: center;
  margin-top: 15px;
}
</style>