<template>
  <!-- Menu Bar --> 
  <div class="menu_bar">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-brand href="#">
          <!-- LiRe Logo -->
          <img src="@/assets/logo.png" height="50" width="80" alt="LiRe" />
        </b-navbar-brand>

        <!-- Home Link -->
        <b-navbar-nav>
          <b-nav-text>
            <router-link
              :to="{ name: 'main' }"
              tag="b-navbar-brand"
              active-class="active"
              class="nav-link"
              exact
            >
              <span class="item">Home</span>
            </router-link>
          </b-nav-text>
        </b-navbar-nav>

        <!-- Search Link -->
        <b-navbar-nav>
          <b-nav-text class="item">
            <router-link
              :to="{ name: 'search' }"
              tag="b-navbar-brand"
              active-class="active"
              class="nav-link"
              exact
            >
              <span class="item">Search</span>
            </router-link>
          </b-nav-text>
        </b-navbar-nav>

        <!-- About Link -->
        <b-navbar-nav>
          <b-nav-text class="item">
            <router-link
              :to="{ name: 'about' }"
              tag="b-navbar-brand"
              active-class="active"
              class="nav-link"
              exact
            >
              <span class="item">About</span>
            </router-link>
          </b-nav-text>
        </b-navbar-nav>

        <!-- Private Dropdown (for authenticated users) --> 
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav v-if="$root.store.username">
            <b-dropdown :disabled="false" text="Private" class="item" variant="transparent" >
              <b-navbar-nav>
                <router-link
                  :to="{ name: 'favorites' }"
                  tag="b-dropdown-item"
                  active-class="active"
                  class="nav-link"
                  exact
                >
                  <span class="item_drop">Favorites Recipes</span>
                </router-link>
              </b-navbar-nav>

              <!-- Personal Recipes Link -->
              <b-navbar-nav>
                <router-link
                  :to="{ name: 'personal' }"
                  tag="b-dropdown-item"
                  active-class="active"
                  class="nav-link"
                  exact
                >
                  <span class="item_drop">Personal Recipes</span>
                </router-link>
              </b-navbar-nav>

              <!-- Family Recipes Link -->
              <b-navbar-nav>
                <router-link
                  :to="{ name: 'family' }"
                  tag="b-dropdown-item"
                  active-class="active"
                  class="nav-link"
                  exact
                >
                  <span class="item_drop">Family Recipes</span>
                </router-link>
              </b-navbar-nav>
            </b-dropdown>
          </b-navbar-nav>

          <!-- Create New Recipe Dropdown (for authenticated users) -->
          <b-navbar-nav v-if="$root.store.username" >
            <b-dropdown
              :disabled="false"
              text="Create New Recipe"
              class="item"
              variant="transparent"
              
            >
              <!-- Create Personal Recipe Modal -->
              <b-dropdown-item
                v-b-modal.modal-1
                id="modal-1"
                @click="showPersonalModal"
              >
                <span class="item_drop">Create Personal Recipe</span>
              </b-dropdown-item>

              <CreatePersonalRecipe v-if="createPersonalRecipeClicked">
              </CreatePersonalRecipe>

              <!-- Create Family Recipe Modal -->
              <b-dropdown-item
                v-b-modal.modal-2
                id="modal-2"
                @click="showFamilyModal"
              >
                <span class="item_drop">Create Family Recipe</span>
              </b-dropdown-item>

              <CreateFamilyRecipe v-if="createFamilyRecipeClicked">
              </CreateFamilyRecipe>
            </b-dropdown>
          </b-navbar-nav>

          <!-- Register and Login Links (for non-authenticated users) -->
          <b-navbar-nav v-if="!$root.store.username" class="ml-auto">
            <!-- Register Link -->
            <b-navbar-nav>
              <router-link
                :to="{ name: 'register' }"
                tag="b-navbar-brand"
                active-class="active"
                class="nav-link"
                exact
              >
                <b-nav-text>
                  <span class="item">Register</span>
                </b-nav-text>
              </router-link>
            </b-navbar-nav>

            <!-- Login Link -->
            <b-navbar-nav>
              <b-nav-text>
                <router-link
                  :to="{ name: 'login' }"
                  tag="b-navbar-brand"
                  active-class="active"
                  class="nav-link"
                  exact
                >
                  <span class="item">Login</span>
                </router-link>
              </b-nav-text>
            </b-navbar-nav>

            <!-- Guest Welcome Message -->
            <b-navbar-nav>
              <b-nav-text>
                <span class="guest">Hello Guest</span>
              </b-nav-text>
            </b-navbar-nav>
          </b-navbar-nav>

          <!-- User Dropdown (for authenticated users) --> 
          <b-navbar-nav v-else class="ml-auto">
            <b-navbar-nav>
              <b-dropdown right class="item" variant="transparent">
                <template #button-content>
                  <em>{{ $root.store.username }}</em>
                </template>
                
                <!-- Logout Link --> 
                <b-dropdown-item @click="Logout">
                  <span class="log_out">Log Out</span>
                </b-dropdown-item>
              </b-dropdown>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import CreatePersonalRecipe from "@/pages/CreatePersonalRecipe";
import CreateFamilyRecipe from "@/pages/CreateFamilyRecipe";

export default {
  name: "navbar",
  components: {
    CreatePersonalRecipe,
    CreateFamilyRecipe,
  },
  data() {
    return {
      createPersonalRecipeClicked: false,
      createFamilyRecipeClicked: false,
    };
  },
  mounted() {
    this.createPersonalRecipeClicked = false;
    this.createFamilyRecipeClicked = false;
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    showPersonalModal() {
      console.log("createPersonalRecipeClicked");
      this.createPersonalRecipeClicked = true;
    },
    showFamilyModal() {
      console.log("createFamilyRecipeClicked");
      this.createFamilyRecipeClicked = true;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap");
.item {
  padding: 5px;
  font-family: "Concert One", serif;
  color: black;
  text-shadow: 0.1px 1px white;
}

.item:hover {
  color: rgb(150, 218, 214);
  text-shadow: 0.1px 1px black;
  cursor: pointer;
}

.guest {
  font-family: "Concert One", serif;
  color: black;
  text-shadow: 0.5px 1px white;
  margin-top: 50px;
}

.item_drop {
  font-family: "Concert One", serif;
  text-shadow: 0.5px 1px white;
  color: black;
  margin-top: 50px;
}

.log_out{
  font-family: "Concert One", serif;
  color: black;
  margin-top: 50px;
}


</style>