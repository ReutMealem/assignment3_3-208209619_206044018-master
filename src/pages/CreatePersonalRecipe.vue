<template>
  <div class="container">
    <b-modal id="modal-1"  ref="my-modal" title="Create New Personal Recipe" hide-footer class="custom-modal">
    <b-form @submit.prevent="onSave" @reset.prevent="onReset" >
        <b-form-group>
        <b-form-input
            id="input-1"
            v-model="form.recipename"
            type="text"
            placeholder="Enter recipe name"
            required
        ></b-form-input>
        </b-form-group> 

        <b-form-group>
        <b-form-input
            id="input-2"
            v-model="form.servings"
            type="number"
            placeholder="Enter servings number"
            required
        ></b-form-input>
        </b-form-group> 

        <b-form-group>
        <b-form-input
            id="input-3"
            v-model="form.readyInMinutes"
            type="number"
            placeholder="Enter preparation time in minutes "
            required
        ></b-form-input>
        </b-form-group> 

        <b-form-group>
        <b-form-input
            id="input-4"
            v-model="form.image"
            type="url"
            placeholder="Enter the URL image of the recipe "
            required
        ></b-form-input>
        </b-form-group>

        <b-form @submit.prevent="add_ingredient">
          <b-row>
            <b-col>
          <b-form-group>
          <b-form-input v-model="form2.ingredient" style="width:220px;" type="text"  placeholder="Enter ingredient" required></b-form-input>
          </b-form-group>

          <b-form-group>
          <b-form-input v-model="form2.amount" style="width:220px;" type="number"  placeholder="Enter amount" required ></b-form-input>
          </b-form-group>

          <b-form-group>
          <b-form-select v-model="form2.unitLong" style="width:220px;" :options="unitOptions" placeholder="Select unit" required></b-form-select>
          </b-form-group>

          <b-form-group>
            <b-button class="btn-info" pill type="submit" style="background-color: blue; border-color: blue; font-weight: bold; color: white;" @click="add_ingredient">ADD</b-button>

          </b-form-group>
          </b-col>
          <b-col>
          <p><b>RecipesIngredients that you already added:</b>
          <br/>
          {{this.display_ingredients}}
          </p>
          </b-col>

          </b-row>
        </b-form>

        <b-form-group>
          <b-form-textarea
            id="textarea"
            v-model="form3.instruction"
            placeholder="Enter instruction step..."
            rows="4"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group>
          <b-button pill type="button" @click="add_instruction_step">Add Instruction Step</b-button>
        </b-form-group>
        <p><b>Instructions that you already added:</b></p>
        <p>{{ display_instructions }}</p>

    <b-form-checkbox v-model="form.checked_gluten" name="check-button1" switch>
        gluten free 
    </b-form-checkbox>       
    <b-form-checkbox v-model="form.checked_vegan" name="check-button2" switch>
        vegan 
    </b-form-checkbox>
    <b-form-checkbox v-model="form.checked_vegetarian" name="check-button3" switch>
        vegetarian 
    </b-form-checkbox>                  
    <b-row>

      <b-col lg="3" class="pb-2"><b-button pill style="background-color: blue; border-color: blue; font-weight: bold; color: white;" class="btn-warning" type="reset">Reset</b-button></b-col>
      <b-col lg="3" class="pb-2"><b-button pill type="submit" style="background-color: blue; border-color: blue; width:350%; font-weight: bold; color: white;" class="btn-primary">Save</b-button></b-col>

    </b-row>
    </b-form>            
    </b-modal>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      unitOptions: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      form: {
        recipename: '',
        servings: '',
        readyInMinutes: '',
        image: '',
        checked_gluten: false,
        checked_vegetarian: false,
        checked_vegan: false,
      },

      form2: {
        ingredient: '',
        amount: '',
        unitLong:''

      },

      form3: {
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
          recipe_name: this.form.recipename,
          prepare_time: this.form.readyInMinutes ,
          likes: 0,
          is_vegan: this.form.checked_vegan,
          is_veget: this.form.checked_vegetarian,
          is_glutenFree: this.form.checked_gluten,
          portions: this.form.servings,
          image_recipe: this.form.image,
          RecipesIngredients: this.RecipesIngredients,
          RecipesInstructions: this.RecipesInstructions


        }

        );
        // console.log(response)

        await this.onReset();
        this.$refs['my-modal'].hide()
        // moves to login rout right after registration 
        // console.log(response);
      
      } catch (err) {
        console.log(err.response2);
        this.form.submitError = err.response2.data.message;
      }
    },
    async onSave() {
      if (this.RecipesIngredients.length > 0) {
        await this.Save();
        this.$root.toast("Save", "Recipes created successfully", "success");
      } else {
        this.$root.toast("error", "there is no RecipesIngredients", "error");
      }
      this.onReset();
    },
    async onReset(){
     
      this.form={
        recipename: '',
        servings: '',
        readyInMinutes:'',
        image:'',
        checked_gluten: false,
        checked_vegetarian: false,
        checked_vegan: false,
      },
      this.form2={
        ingredient:'',
        amount:'',
        unitLong:''

      }
      this.form3={
        instruction:'',
      }
      this.RecipesIngredients=[],
      this.RecipesInstructions=[],
      this.display_ingredients=""
      this.display_instructions=""

    },
    add_ingredient(){
      if(this.form2.ingredient !== "" && this.form2.amount !=="")
      {      
        let obj = {
        "ingredient_name": this.form2.ingredient,
        "amount": this.form2.amount,
        "unitLong": "changelater",
        }   
      this.RecipesIngredients.push(obj);
      this.display_ingredients += this.form2.ingredient + ":" + this.form2.amount + ", "
      this.reset_ingredient();
      }
    },
    add_instruction_step() {
      if (this.form3.instruction !== '') {
        this.RecipesInstructions.push(this.form3.instruction);
        this.display_instructions +=  this.form3.instruction + ', ' ;
        this.reset_instruction();
      }
    },
    reset_ingredient(){
      this.form2={
        ingredient:'',
        amount:'',
        unitLong:''
      }
    },
    reset_instruction() {
      this.form3.instruction = '';
    },
  }

}
</script>
<style scoped>
.custom-modal {
  max-width: 800px; /* Adjust the width as needed */
}

.custom-modal .modal-content {
  background-color: #F5F5F5; /* Change the background color */
}

.custom-modal .modal-header {
  background-color: #5D6166; /* Change the header background color */
  color: #FFFFFF; /* Change the header text color */
}

.custom-modal .modal-footer {
  background-color: #F19CBB; /* Change the footer background color */
  color: #080807; /* Change the footer text color */
}
</style>