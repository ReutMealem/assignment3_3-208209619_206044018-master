<template>
  <div class="container">
    <h1 class="title">Register</h1>

    <!-- Register Form --> 
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">

      <!-- Username Input -->
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username should contain letters only
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- First Name Input -->
      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
          First Name can only contain letters
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.maxLength">
          First Name should contain 700 chars only
        </b-form-invalid-feedback>
        
      </b-form-group>

      <!-- Last Name Input -->
      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
          Last Name can only contain letters
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.maxLength">
          Last Name should contain 700 chars only
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country Select -->
      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback> Country is required </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password Input -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.containsNumber"
        >
          Contain at least one number
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="
            $v.form.password.required && !$v.form.password.containsSpecialChar
          "
        >
          Contain at least one special character
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirm Password Input -->
      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>


      <!-- Email Input -->
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Invalid email format
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.maxLength">
          Email should contain 700 chars only
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Reset and Register Buttons -->
      <b-button type="reset" class="ml-1 click-button">Reset</b-button>
      <b-button type="submit" class="ml-3 w-60 click-button">Register</b-button>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>

    <!-- Register Error Alert -->
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined,
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      // Validation rules for the registration form fields
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      firstName: {
        required,
        alpha,
        maxLength: maxLength(700), 
      },
      lastName: {
        required,
        alpha,
        maxLength: maxLength(700), 
      },
      country: {
        required,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        containsNumber(p) {
          return /\d/.test(p);
        },
        containsSpecialChar(p) {
          return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(p);
        },
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      email: {
        required,
        email,
        maxLength: maxLength(700), 
      },
    },
  },
  mounted() {
    // Initialize countries select options
    this.countries.push(...countries);
  },
  methods: {
    // Validate the state of the form input
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/Register",
          {
            username: this.form.username,
            firstname: this.form.firstName,
            lastname: this.form.lastName,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email,
          }
        );
        // Redirect to the login page after successful registration
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    // Handle the form submission
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    // Handle the form reset
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
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
  background-color: rgba(255, 255, 255, 0.8);
}

.click-button:hover {
  color: black;
  background-color:  rgb(245, 230, 220);
}
</style>
