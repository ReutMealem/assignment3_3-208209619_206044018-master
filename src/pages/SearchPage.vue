<template>
  <div class="container">
  <div>
    <div class="title">Search Page</div>
      <b-button id="back" type="submit" v-on:click="showSearchResult=false"  v-if="showSearchResult">Back To Search</b-button>

    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">

      <b-form-group id="input-group-name" label-cols-sm="3" label="Recipe name:" label-for="recipe_name" v-if="!showSearchResult">
        <b-form-input id="recipe_name" v-model="form.recipe_name" type="text" placeholder="Enter Recipe name" required>
        </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-amount" label-cols-sm="3" label="Amount:" label-for="amount" v-if="!showSearchResult">
        <b-form-select id="amount" v-model="form.amount" :options="amount_options" required>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-sort" label-cols-sm="3" label="Sort by:" label-for="sort" v-if="!showSearchResult">
        <b-form-select id="sort" v-model="form.sort" :options="sort_options" required>
        </b-form-select>

      </b-form-group>

     

      <b-form-group id="input-group-cuisine" label-cols-sm="3" label="Cuisine:" label-for="cuisine" v-if="!showSearchResult">
        <b-form-select id="cuisine" v-model="form.cuisine"  :options="cuisines"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-diet" label-cols-sm="3" label="Diet:" label-for="diet" v-if="!showSearchResult">
        <b-form-select id="diet" v-model="form.diet" :options="diets"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-intolerance" label-cols-sm="3" label="Intolerance:" label-for="intolerance" v-if="!showSearchResult">
        <b-form-select id="intolerance" v-model="form.intolerance" :options="intolerances">
        </b-form-select>
      </b-form-group>

      <b-button type="reset" variant="danger" v-if="!showSearchResult">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75" v-if="!showSearchResult">Search</b-button>
      <b-button type="button" class="research" variant="warning" v-on:click="showLastSearch" v-if="($root.store.username) && (!lastSearch=='') && (!showSearchResult)">Last search</b-button>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Search failed: {{ form.submitError }}
    </b-alert>
    <div class="search-results" v-if="showSearchResult">
        <p>
          Search Results for: {{ form.recipe_name }}, amount: {{ form.amount }}, order by: {{ form.sort }}
          <span v-if="form.cuisine">, Cuisine: {{ form.cuisine }}</span>
          <span v-if="form.diet">, Diet: {{ form.diet }}</span>
          <span v-if="form.intolerance">, Intolerance: {{ form.intolerance }}</span>
        </p>
      </div>
    <p v-if="$root.store.username">
      <RecipePreviewList v-if="showSearchResult" v-bind:path="searchPath" page_type="API"></RecipePreviewList>
    </p>
    <p v-else>
      <RecipePreviewList v-if="showSearchResult"  v-bind:path="searchPath" :check_viewed="false"  page_type="API"></RecipePreviewList>
    </p>
    </div>
    <div class="div-back">
      <b-button id="back" type="submit" v-on:click="showSearchResult=false"  v-if="showSearchResult">Back To Search</b-button>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "Search",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      form: {
        recipe_name: "",
        amount: '5',
        sort: 'popularity',
        cuisine: '',
        diet: '',
        intolerance: '',
        submitError: undefined,
      },

      sort_options: [ 'popularity','time'],
      amount_options: [ '5','10', '15'],

      cuisines: ['','African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European',
                  'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
                  'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'],

      diets: ['','Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Low FODMAP', 'Whole30'],
      
      intolerances: ['','Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut'],
      
      lastSearch: localStorage.getItem("lastSearch"),
      showSearchResult: false,
      searchPath: "",
    };
  },
  methods: {
    async onSearch() {
      try {
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
        console.log("this.searchPath: ", this.searchPath)
        this.showSearchResult = true;
        const lastSearch = {
          'recipe_name': this.form.recipe_name,
          'amount': this.form.amount,
          'sort': this.form.sort,
          'cuisine': this.form.cuisine,
          'diet': this.form.diet,
          'intolerance': this.form.intolerance,
          'submitError': this.form.submitError
        };
        
        localStorage.setItem("lastSearch", JSON.stringify(lastSearch));
        this.lastSearch = JSON.parse(localStorage.getItem("lastSearch"))

      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
        this.$root.toast("OOPS", "something went wrong, please try again", "danger");

      }
    },
    onReset() {
      this.form = {
        recipe_name: "",
        amount: '5',
        sort: 'popularity',
        cuisine: '',
        diet:  '',
        intolerance:  '',
      };
    },
    showLastSearch() {
      this.lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
      const lastSearchData = this.lastSearch;
      this.form = {
        recipe_name: lastSearchData.recipe_name,
        amount: lastSearchData.amount,
        sort: lastSearchData.sort,
        cuisine: lastSearchData.cuisine,
        diet: lastSearchData.diet,
        intolerance: lastSearchData.intolerance,
      };
      this.onSearch();
    }
  }
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');
.container {
  max-width: 500px;
}
.title{
  text-align: center;
  font-family: 'Concert One', serif;
  font-size: 40px;
  font-weight: 400;
  color:black;
  padding:20px;
}


.search-results {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.search-results p {
  margin: 0;
}

.search-results span {
  margin-left: 10px;
}

.sticky {
  position: fixed;
}

.research {
  margin-top: 15px;
  align: center;
}

</style>