<template>
  <div class="login">
    <div class="container__image">
      <div class="image"></div>
    </div>
    <div class="container">
      <form
        @submit.prevent="signInButtonPressed"
        style="flex-direction: column"
      >
        <!-- Email Row -->
        <label for="" style="color: white">Correo electrónico</label>
        <input
          class="form-control"
          placeholder="Introduce tu e-mail"
          type="email"
          v-model="v$.form.email.$model"
        />
        <!-- Error Message -->
        <div v-for="(error, index) of v$.form.email.$errors" :key="index">
          <div style="color: violet">{{ error.$message }}</div>
        </div>

        <!-- Password and Confirm Password Row -->
        <label for="" style="color: white">Contraseña</label>
        <input
          class="form-control"
          placeholder="Escribe tu contraseña"
          type="password"
          v-model="v$.form.password.$model"
        />
        <!-- Error Message -->
        <div v-for="(error, index) of v$.form.password.$errors" :key="index">
          <div style="color: violet">{{ error.$message }}</div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            class="next"
            :disabled="v$.form.$invalid"
            @click="signIn(router, store, form)"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
    <router-link to="/signup">¿Tu primera vez? Date de alta</router-link>
  </div>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { firebase } from "@/firebase";
import { Router, useRouter } from "vue-router";
import { Store, useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    return { v$: useVuelidate(), router, store };
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    signInButtonPressed(e: Event) {
      console.log("Sign In Button Pressed");
      e.preventDefault();
    },
    async signIn(
      router: Router,
      store: Store<any>,
      form: {
        email: string;
        password: string;
      }
    ) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(form.email, form.password);
        if (response) {
          window.localStorage.setItem(
            `${process.env.VUE_APP_SITENAME}_refreshToken`,
            response.user?.refreshToken ?? ""
          );
          store.commit("setLogged", response.user);
          router.push("/");
        }
      } catch (error) {
        alert(error.message);
      }
    },
  },

  validations() {
    return {
      form: {
        email: { required, email },
        password: { required },
      },
    };
  },
};
</script>

<style lang="css" scoped>
.login {
  background: #212121;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container__image {
  padding-bottom: 10px;
}

.image {
  background: url("@/assets/images/origami-crane-logo.png") no-repeat;
  background-position: center;
  background-size: contain;
  height: 150px;
  width: 150px;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  color: #fff;
}

.title {
  margin-top: 15px;
  font-size: 1.8rem;
  font-weight: bold;
}

.subtitle {
  text-align: center;
  margin-top: 7px;
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-weight: bold;
  color: #666666;
}

.container__select {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
}

select {
  width: 230px;
  padding: 10px;
  outline: none;
  border: none;
  height: 20px;
  border-radius: 7px;
}

.container__phone,
*,
::after,
::before {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  box-sizing: content-box !important;
  border-width: 0;
  border-color: currentColor;
}

.phoneCode {
  width: 50px;
  padding: 10px;
  padding-right: 0px;
  outline: none;
  border: none;
  height: 20px;
  text-align: right;
  border-radius: 7px 0px 0px 7px;
}

.phone {
  width: 175px;
  padding: 10px;
  padding-left: 5px;
  outline: none;
  border: none;
  height: 20px !important;
  border-radius: 0px 7px 7px 0px;
}

.container__button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.next {
  text-align: center;
  width: 230px;
  padding: 10px;
  border: none;
  background: #2ea6da;
  color: #fff;
  outline: none;
  border-radius: 7px;
  cursor: pointer;
  margin-top: 40px;
}

.disabled {
  background: #cdcdcd;
  cursor: auto;
}
</style>
