<template>
  <div class="login">
    <div class="container__image">
      <div class="image"></div>
    </div>
    <div class="container">
      <form
        @submit.prevent="signUpButtonPressed"
        style="flex-direction: column"
      >
        <!-- First and Last Name Row -->

        <label for="" style="color: white">Nombre</label>
        <input
          class="form-control"
          placeholder="Escribe tu nombre"
          type="text"
          v-model="v$.form.firstName.$model"
        />
        <!-- Error Message -->
        <div v-for="(error, index) of v$.form.firstName.$errors" :key="index">
          <div style="color: violet">{{ error.$message }}</div>
        </div>

        <label for="" style="color: white">Apellidos</label>
        <input
          class="form-control"
          placeholder="Aquí tus apellidos"
          type="text"
          v-model="v$.form.lastName.$model"
        />
        <!-- Error Message -->
        <div v-for="(error, index) of v$.form.lastName.$errors" :key="index">
          <div style="color: violet">{{ error.$message }}</div>
        </div>

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

        <!-- Password Row -->
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
            @click="signUp(router, store, form)"
          >
            Regístrate
          </button>
        </div>
      </form>
    </div>
    <router-link to="/login">Ya tengo una cuenta, quiero ingresar</router-link>
  </div>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { db, firebase } from "@/firebase";
import { Router, useRouter } from "vue-router";
import { Store, useStore } from "vuex";

export function validName(name: string) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)) {
    return true;
  }
  return false;
}

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    return { v$: useVuelidate(), router, store };
  },

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    signUpButtonPressed(e: Event) {
      console.log("Sign In Button Pressed");
      e.preventDefault();
    },
    async signUp(
      router: Router,
      store: Store<any>,
      form: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }
    ) {
      try {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(form.email, form.password);
        if (response && response.user) {
          await response.user.updateProfile({
            displayName: `${form.firstName} ${form.lastName}`,
          });
          window.localStorage.setItem(
            `${process.env.VUE_APP_SITENAME}_refreshToken`,
            response.user.refreshToken
          );
          const dbUsers = db.collection("users");
          dbUsers.add({
            userUid: response.user.uid,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            name: `${form.firstName} ${form.lastName}`,
            photo: "https://i.pravatar.cc/",
          });
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
        firstName: {
          required,
          name_validation: {
            $validator: validName,
            $message:
              "Invalid Name. Valid name only contain letters, dashes (-) and spaces",
          },
        },
        lastName: {
          required,
          name_validation: {
            $validator: validName,
            $message:
              "Invalid Name. Valid name only contain letters, dashes (-) and spaces",
          },
        },
        email: { required, email },
        password: { required, min: minLength(6) },
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
