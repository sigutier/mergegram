<template>
  <div class="login">
    <div class="container__image">
      <div class="image"></div>
    </div>
    <div class="description">
      <section class="title">Sign in to MERGEgram</section>
      <section class="subtitle">
        Please select your country and <br />enter your phone number.
        <!-- //TODO: Quitar el br y ajustar el texto con css -->
      </section>
    </div>
    <div class="container__select">
      <!-- //TODO: Cambiar los códigos de países por los definitivos + España -->
      <select v-model="countries" @changes="searchCodes">
        <option value="AR">Argentina</option>
        <option value="BO">Bolivia</option>
        <option value="BR">Brazil</option>
        <option value="CL">Chile</option>
        <option value="CO">Colombia</option>
        <option value="EC">Ecuador</option>
        <option value="PY">Paraguay</option>
        <option value="UY">Uruguay</option>
        <option value="ES">España</option>
      </select>
    </div>
    <div class="container__phone">
      <input type="text" class="phoneCode" v-model="code" />
      <input type="text" autofocus class="phone" v-model="phone" />
    </div>
    <div class="container__button">
      <div id="p-captcha"></div>
      <button id="sign" class="next" @click="loginWithPhoneNumber">
        INGRESAR
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import firebase from "@/firebase";
import IStorage from "@/interfaces/Storage";

export default defineComponent({
  setup() {
    const countries = ref<string>("ES");
    const code = ref<string>("+ 34");
    const phone = ref<string>("");
    const Storage = inject<IStorage>("Storage");
    // console.log(Storage?.set("token", "12345"));
    const router = useRouter();

    const searchCodes = async (): Promise<void> => {
      try {
        const response: any = await fetch(
          `https://restcountries.eu/rest/v2/alpha?codes=${countries.value}`
        );
        const codes: any[] = await response.json();
        const [firstElement] = codes;
        code.value = `+ ${firstElement.callingCodes[0]}`;
      } catch (error) {
        console.error(error.message);
      }
    };

    const loginWithPhoneNumber = async (): Promise<void> => {
      // console.log("123456789");
      try {
        const phoneNumber = "+34"; // Introducir un número de teléfono válido -NO COMMITEAR CON ÉL ESCRITO
        // const phoneNumber = `${code.value}${phone.value}`;
        // const phoneNumber: string = `+ 34 666 666 666`; Aquí podríamos poner el número de teléfono para no tener que escribirlo cada vez, pero mantengamos nuestra privacidad, que este repo es público
        const appVerifier: any = window.recaptchaVerifier;
        const response = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier);
        if (response) {
          window.confirmationResult = response;
          const code = "914766";
          const confirmation = await response.confirm(code);
          if (confirmation) {
            // ¡El usuario se ha logueado correctamente!

            // const user = confirmation.user; o bien:
            const { user } = confirmation;
            console.log(user);
            Storage.set("refreshToken", user.refreshToken); //TODO: Revisar por qué da error (aunque el login funciona)
            router.push("/");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      // console.log(firebase);
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "p-captcha",
        {
          size: "invisible",
          callback: (response: any) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log("La respuesta es ", response);
          },
        }
      );
    });

    return {
      countries,
      code,
      searchCodes,
      loginWithPhoneNumber,
    };
  },

  //TODO: API de países
});
</script>

<style scoped>
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
  background: url("../assets/logo-mergenarias-round.png") no-repeat;
  background-position: center;
  background-size: contain;
  height: 150px;
  width: 150px;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  width: 250px;
  padding: 10px;
  outline: none;
  border: none;
  height: 40px;
  border-radius: 7px;
}

.container__phone {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
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
  height: 20px;
  border-radius: 0px 7px 7px 0px;
}

.container__button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}
.next {
  text-align: center;
  width: 250px;
  padding: 10px;
  border: none;
  background: #2ea6da;
  color: #fff;
  outline: none;
  border-radius: 7px;
  cursor: pointer;
}

.disabled {
  background: #cdcdcd;
  cursor: auto;
}
</style>
