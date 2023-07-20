<template>
  <div class="container">
    <b-modal id="modal-1"  ref="my-modal" title="Create New Personal Recipe" hide-footer class="custom-modal">
    <b-form @submit.prevent="onSave" @onReset.prevent="onReset" >
        <b-form-group>
        <b-form-input
            id="input-recipe_name"
            v-model="form.recipe_name"
            type="text"
            placeholder="Enter recipe name"
            required
        ></b-form-input>
        </b-form-group> 

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

        

        <b-form-group>
        <b-form-input
            id="input-image"
            v-model="form.image_recipe"
            type="url"
            placeholder="Enter the URL image_recipe of the recipe "
            required
        ></b-form-input>
        </b-form-group>
        <b-row>
          <b-col>
        <b-form-checkbox v-model="form.is_vegan" name="check-button-Vegan" switch>
          <span class="checkbox-label">Vegan</span>
        </b-form-checkbox>
        <b-form-checkbox v-model="form.is_veget" name="check-button-Vegetarian" switch>
            <span class="checkbox-label">Vegetarian</span>
        </b-form-checkbox>  
        <b-form-checkbox v-model="form.is_glutenFree" name="check-button-GlutenFree" switch>
          <span class="checkbox-label">Gluten Free</span>
        </b-form-checkbox>    
        </b-col>
        </b-row>
        <b-form @submit.prevent="add_ingredient">
          <b-row>
            Ingredients:
          </b-row>
          <b-row>
            <b-col>
          <b-form-group>
          <b-form-input v-model="form_ingredient.ingredient_name" style="width:220px;" type="text"  placeholder="Enter ingredient" required></b-form-input>
          </b-form-group>

          <b-form-group>
          <b-form-input v-model="form_ingredient.amount" style="width:220px;" type="number" min="0"  placeholder="Enter amount" required ></b-form-input>
          </b-form-group>

          <b-form-group>
          <b-form-select v-model="form_ingredient.unitLong" style="width:220px;" :options="unitOptions" placeholder="Select unit"></b-form-select>
          </b-form-group>

          <b-form-group>
            <b-button pill type="button"  style="background-color: blue; border-color: blue; font-weight: bold; color: white;" @click="add_ingredient">Add Ingredient</b-button>

          </b-form-group>
          <p v-if="display_ingredients != ''">
            <b>Ingredients that you added:</b>
          <br/>
          {{display_ingredients}}
          </p>
          </b-col>

          </b-row>
        </b-form>

        <b-form-group>
          <b-row>
            Instruction:
          </b-row>
          <b-form-textarea
            id="textarea-instruction"
            v-model="form_instruction.instruction"
            placeholder="Enter instruction step..."
            rows="2" 
          ></b-form-textarea>
        </b-form-group>

        <b-form-group>
          <b-button pill type="button" @click="add_instruction_step">Add Instruction Step</b-button>
        </b-form-group>
        <p v-if="display_instructions != ''">
          <b>Instructions that you added:</b></p>
        <p>{{ display_instructions }}</p>
                  
    <b-row>

      <b-col><b-button pill style="background-color: blue; border-color: blue; font-weight: bold; color: white;" class="btn-warning" type="onReset">onReset</b-button></b-col>
      <b-col><b-button pill type="submit" style="background-color: blue; border-color: blue; width:350%; font-weight: bold; color: white;" class="btn-primary">Save</b-button></b-col>

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
      { value: null, text: 'Select unit', disabled: true },
      { value: 'cups', text: 'cups' },
      { value: 'teaspoon', text: 'teaspoon' },
      { value: 'pound', text: 'pound' },
      { value: 'Tb', text: 'Tb' },
      { value: 'pinch', text: 'pinch' }
      ],

      form: {
        recipe_name: '',
        prepare_time: '',
        is_vegan: false,
        is_veget: false,
        is_glutenFree: false,
        portions: '',
        image_recipe: '',
        
      },

      form_ingredient: {
        ingredient: '',
        amount: '',
        unitLong: null

      },

      form_instruction: {
        instruction: '',
      },

      RecipesIngredients: [],
      display_ingredients: '',
      RecipesInstructions: [],
      display_instructions: '',
    };
  },
  mounted() {
      this.onReset();
  },
  methods: {
    async Save() {
      try {
          const response1 = await this.axios.get(
            this.$root.store.server_domain + "/users/getUserId"
        );
        const user_id = response1.data.user_id;
      
        const response2 = await this.axios.post(
          this.$root.store.server_domain + "/users/createPersonalRecipe",
        {
          user_id: user_id,
          recipe_name: this.form.recipe_name,
          prepare_time: this.form.prepare_time ,
          likes: 0,
          is_vegan: this.form.is_vegan,
          is_veget: this.form.is_veget,
          is_glutenFree: this.form.is_glutenFree,
          portions: this.form.portions,
          image_recipe: this.form.image_recipe,
          RecipesIngredients: this.RecipesIngredients,
          RecipesInstructions: this.RecipesInstructions


        }

        );
        await this.onReset();
        this.$refs['my-modal'].hide()
      
      } catch (err) {
        console.log(err.response2);
        this.$root.toast("error", "Error in creating recipe", "danger");

      }
    },
    async onSave() {
      if (this.RecipesIngredients.length > 0 && this.RecipesInstructions.length > 0) {
      await this.Save();
      this.$root.toast("success", "Recipe created successfully", "success");
      } 
      else {
        let errorMessage = "";
        if (this.RecipesIngredients.length === 0) {
          errorMessage += "Ingredients field is empty. ";
        }
        if (this.RecipesInstructions.length === 0) {
          errorMessage += "Instructions field is empty. ";
        }
        this.$root.toast("OOPS", errorMessage, "warning");
      }
      this.onReset();
    },

    async onReset(){
      this.form={
        recipe_name: '',
        prepare_time: '',
        is_vegan: false,
        is_veget: false,
        is_glutenFree: false,
        portions: '',
        image_recipe: '',
      },
      this.form_ingredient={
        ingredient_name:'',
        amount:'',
        unitLong: null

      }
      this.form_instruction={
        instruction:'',
      }
      this.RecipesIngredients=[],
      this.RecipesInstructions=[],
      this.display_ingredients=""
      this.display_instructions=""

    },
    add_ingredient(){
      if(this.form_ingredient.ingredient_name !== "" && this.form_ingredient.amount !=="")
      {      
        let obj = {
        "ingredient_name": this.form_ingredient.ingredient_name,
        "amount": this.form_ingredient.amount,
        "unitLong": this.form_ingredient.unitLong,
        }   
        this.RecipesIngredients.push(obj);
        this.display_ingredients += this.form_ingredient.ingredient_name + ": " + this.form_ingredient.amount + " " + this.form_ingredient.unitLong +", "
        this.form_ingredient={
          ingredient_name:'',
          amount:'',
          unitLong: null
        }      
      }
    },
    add_instruction_step() {
      if (this.form_instruction.instruction !== '') {
        this.RecipesInstructions.push(this.form_instruction.instruction);
        this.display_instructions +=  this.form_instruction.instruction + ', ' ;
        this.form_instruction.instruction = '';
      }
    },
  }

}
</script>
<style scoped>
.custom-modal {
  max-width: 800px; 
}

.custom-modal .modal-content {
  background-color: #F5F5F5; 
}

.custom-modal .modal-header {
  background-color: #5D6166; 
  color: #FFFFFF; 
}

.custom-modal .modal-footer {
  background-color: #F19CBB; 
  color: #080807; 
}
.b-form-select {
  width: 220px;
}
.checkbox-label {
    margin-bottom: 10px;
    margin-right: 10px;

  }
</style>