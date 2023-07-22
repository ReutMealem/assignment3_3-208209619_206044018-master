<template>
  <div class="container">

    <!-- Modal for creating a new personal recipe -->
    <b-modal 
      id="modal-1"
      ref="my-modal"
      title="Create New Personal Recipe"
      hide-footer
      class="recipe-modal"
      >

      <!-- Form to input recipe details -->
      <b-form @submit.prevent="onSave" @reset.prevent="onReset">
        <b-form-group>

          <!-- Input for recipe name --> 
          <b-form-input
            id="input-recipe_name"
            v-model="form.recipe_name"
            type="text"
            placeholder="Enter recipe name"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Input for prepare time -->
        <b-form-group>
          <b-form-input
            id="input-prepare_time"
            v-model="form.prepare_time"
            type="number"
            placeholder="Enter preparation time in minutes "
            required
            min="0"
          ></b-form-input>
        </b-form-group>

        <!-- Input for portions -->
        <b-form-group>
          <b-form-input
            id="input-portions"
            v-model="form.portions"
            type="number"
            placeholder="Enter portions number"
            required
            min="0"
          ></b-form-input>
        </b-form-group>

        <!-- Input for image url -->
        <b-form-group>
          <b-form-input
            id="input-image"
            v-model="form.image_recipe"
            type="url"
            placeholder="Enter the image URL of the recipe "
            required
          ></b-form-input>
        </b-form-group>

        <!-- Checkboxes for specifying dietary restrictions --> 
        <b-form-group>
          <b-row>
            <b-col>
              <b-form-checkbox
                v-model="form.is_vegan"
                name="check-button-Vegan"
                switch
              >
                <span class="checkbox-label">Vegan</span>
              </b-form-checkbox>
              <b-form-checkbox
                v-model="form.is_veget"
                name="check-button-Vegetarian"
                switch
              >
                <span class="checkbox-label">Vegetarian</span>
              </b-form-checkbox>
              <b-form-checkbox
                v-model="form.is_glutenFree"
                name="check-button-GlutenFree"
                switch
              >
                <span class="checkbox-label">Gluten Free</span>
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-form-group>


        <!-- Form for adding ingredients --> 
        <b-form-group>
          <b-form>
            <div class="header">
              <b-form-group>
                Ingredients:
              </b-form-group>
            </div>
            <b-row>
              <b-col>
                <b-form-group>
                  <b-form-input
                    v-model="form_ingredient.ingredient_name"
                    type="text"
                    placeholder="Enter ingredient"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <b-form-input
                    v-model="form_ingredient.amount"
                    type="number"
                    min="0"
                    placeholder="Enter amount"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group>
                  <b-form-select
                    v-model="form_ingredient.unitLong"
                    :options="unitOptions"
                    placeholder="Select unit"
                  ></b-form-select>
                </b-form-group>

                <b-form-group>
                  <b-button
                    type="button"
                    class="buttons"
                    @click="add_ingredient"
                    >Add Ingredient</b-button
                  >
                </b-form-group>
                <p v-if="display_ingredients != ''">
                  <b>Ingredients that you added:</b>
                  <br />
                  {{ display_ingredients }}
                </p>
              </b-col>
            </b-row>
          </b-form>
        </b-form-group>

        <!-- Form for adding instructions --> 
        <b-form-group>
          <div class="header">
            <b-form-group>
            Instruction:
          </b-form-group>
          </div>
         
              <b-form-group>
              <b-form-textarea
                id="textarea-instruction"
                v-model="form_instruction.instruction"
                placeholder="Enter instruction step..."
                rows="2">
              </b-form-textarea>
            </b-form-group>
            <b-form-group>

              <p>
                <b-button type="button" class="buttons" @click="add_instruction_step">
                  Add Instruction Step
                  </b-button>
              </p>
            </b-form-group>
            <b-form-group>
            <b-form-group>
              <p v-if="display_instructions != ''">
                <b>Instructions that you added:</b>
                <br/>
                {{ display_instructions }}
              </p>
            </b-form-group>
          </b-form-group>
        </b-form-group>


        <!-- Buttons to reset the form and save the recipe -->
        <b-row>
          <b-col>
            <b-button
              class="buttons"
              type="reset">Reset
            </b-button>
          </b-col>
          <b-col>
            <b-button
              type="submit"
              style="width: 100%;"
              class="buttons">Save
            </b-button>
          </b-col>
        </b-row>
      
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unitOptions: [
        { value: null, text: "Select unit", disabled: true },
        { value: "cups", text: "cups" },
        { value: "teaspoon", text: "teaspoon" },
        { value: "pound", text: "pound" },
        { value: "Tb", text: "Tb" },
        { value: "pinch", text: "pinch" },
      ],

      // Data properties for the form 
      form: {
        recipe_name: "",
        prepare_time: "",
        is_vegan: false,
        is_veget: false,
        is_glutenFree: false,
        portions: "",
        image_recipe: "",
      },

      form_ingredient: {
        ingredient: "",
        amount: "",
        unitLong: null,
      },

      form_instruction: {
        instruction: "",
      },

      RecipesIngredients: [],
      display_ingredients: "",
      RecipesInstructions: [],
      display_instructions: "",
    };
  },
  mounted() {
    this.onReset();
  },
  methods: {
    // Method to save the new recipe
    async Save() {
      try {
        // Fetch the user ID 
        const response1 = await this.axios.get(
          this.$root.store.server_domain + "/users/getUserId"
        );
        const user_id = response1.data.user_id;

        // POST the new recipe data to the server
        const response2 = await this.axios.post(
          this.$root.store.server_domain + "/users/createPersonalRecipe",
          {
            user_id: user_id,
            recipe_name: this.form.recipe_name,
            prepare_time: this.form.prepare_time,
            likes: 0,
            is_vegan: this.form.is_vegan,
            is_veget: this.form.is_veget,
            is_glutenFree: this.form.is_glutenFree,
            portions: this.form.portions,
            image_recipe: this.form.image_recipe,
            RecipesIngredients: this.RecipesIngredients,
            RecipesInstructions: this.RecipesInstructions,
          }
        );
        // Reset the form and close the modal
        await this.onReset();
        this.$refs["my-modal"].hide();
        
      } catch (err) {
        console.log(err.response2);
        this.$root.toast("error", "Error in creating recipe", "danger");
      }
    },
    // Method to handle form submission
    async onSave() {
      if ( this.RecipesIngredients.length > 0 && this.RecipesInstructions.length > 0 ) {
        // Call the Save method and display success toast
        await this.Save();
        this.$root.toast("success", "Recipe created successfully", "success");
      } else {
        // Display a warning toast if the form is incomplete
        let errorMessage = "";
        if (this.RecipesIngredients.length === 0) {
          errorMessage += "Ingredients field is empty. ";
        }
        if (this.RecipesInstructions.length === 0) {
          errorMessage += "Instructions field is empty. ";
        }
        this.$root.toast("OOPS", errorMessage, "warning");
      }
      
    },
    // Method to reset the form
    async onReset() {
      (this.form = {
        recipe_name: "",
        prepare_time: "",
        is_vegan: false,
        is_veget: false,
        is_glutenFree: false,
        portions: "",
        image_recipe: "",
      }),
        (this.form_ingredient = {
          ingredient_name: "",
          amount: "",
          unitLong: null,
        });
      this.form_instruction = {
        instruction: "",
      };
      (this.RecipesIngredients = []),
        (this.RecipesInstructions = []),
        (this.display_ingredients = ""),
      (this.display_instructions = "")
    },
    // Method to add an ingredient to the form
    add_ingredient() {
      if ( this.form_ingredient.ingredient_name !== "" && this.form_ingredient.amount !== "" ) {
      // Add ingredient to the RecipesIngredients array and update display
      let obj = {
          ingredient_name: this.form_ingredient.ingredient_name,
          amount: this.form_ingredient.amount,
          unitLong: this.form_ingredient.unitLong,
        };
        this.RecipesIngredients.push(obj);
        this.display_ingredients +=
          this.form_ingredient.ingredient_name +
          ": " +
          this.form_ingredient.amount +
          " " +
          this.form_ingredient.unitLong +
          ", ";
        this.form_ingredient = {
          ingredient_name: "",
          amount: "",
          unitLong: null,
        };
      }
    },

    // Method to add an instruction step to the form
    add_instruction_step() {
      // Add instruction step to the RecipesInstructions array and update display
      if (this.form_instruction.instruction !== "") {
        this.RecipesInstructions.push(this.form_instruction.instruction);
        this.display_instructions += this.form_instruction.instruction + ", ";
        this.form_instruction.instruction = "";
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');
.header{
  font-family: 'Concert One', serif;
  font-size: 20px;
}
.title-tag {
  font-family: 'Concert One', serif; 
  font-size: 30px;
}
.recipe-modal {
  background-color: #f7f7f7;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.b-form-input,
.b-form-select,
.b-form-textarea {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 10px;
  font-size: 14px;
}

.b-form-input:hover,.b-form-select:hover,.b-form-textarea:hover,.b-form-input:focus,.b-form-select:focus,.b-form-textarea:focus {
  border-color: #4285f4; 
  box-shadow: 0 0 5px rgba(66, 133, 244, 0.5); 
}

.b-form-checkbox {
  margin-right: 10px;
}
.checkbox-label {
  font-size: 16px;
}
.buttons {
  font-family: 'Concert One', serif;
  font-size:16px;
  font-weight: 400;
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 8px 10px;
  text-align: center;
  border-radius: 10px;
  background-color:  #28b1bd;
  color:white;

}
.buttons:hover {
  color:black;
  background-color: white;
}
.create_comp{
  background-color: black;
  background-size: cover;
}
</style>