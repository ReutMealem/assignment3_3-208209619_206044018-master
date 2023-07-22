<template>
  <div class="container">
    <h1 class="title">Login</h1>

    <!-- Login Form --> 
    <b-form @submit.prevent="onLogin">
      <!-- Username Input -->
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password Input --> 
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Login Button -->
      <b-button
        type="submit"
        variant="primary"
        style="width: 100px; display: block"
        class="mx-auto w-100 click-button"
        >Login</b-button
      >
      <!-- Registration Link -->
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>

    <!-- Login Error Alert --> 
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "login",
  data() {
    return {
      // Login form data 
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    // Validation rules for login form fields 
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    // Helper method to check validation state of a field
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    // Login function that sends the login request to the server 
    async Login() {
      try {
        // Send login request to the server 
        const response = await this.axios.post(
          this.$root.store.server_domain + "/Login",

          {
            username: this.form.username,
            password: this.form.password,
          }
        );
        // Login successful, update login status and redirect to home 
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        // Login failed, display the error message 
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    // Handle login form submission 
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // Proceed with login if validation passed
      this.Login();
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap");

.container {
  // text-align: center;
  font-family: "Concert One", serif;
  font-size: 20px;
  color: black;
  max-width: 600px;

  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
}
.title {
  text-align: center;
  font-size: 40px;
  font-weight: 400;
  padding: 15px;
}
.click-button {
  font-family: "Concert One", serif;
  font-size: 18px;
  font-weight: 400;
  color: black;
  width: 20%;
  padding: 8px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
}
.button1 {
  margin-right: 320px;
  background-color: rgba(245, 48, 48, 0.664);
}
.click-button:hover {
  color: white;
  background-color: #28b1bd;
}
</style>
