<template>
  <div class="login">
    <div class="container__image">
      <div class="image"></div>
    </div>
    <div class="description">
      <section class="title">Sign in to EDgram</section>
      <section class="subtitle">
        Please confirm your country and <br />enter your phone number.
      </section>
    </div>
    <div class="container__select">
      <select v-model="countries" @changes="searchCodes">
        <option value="AR">Argentina</option>
        <option value="BO">Bolivia</option>
        <option value="BR">Brazil</option>
        <option value="CL">Chile</option>
        <option value="CO">Colombia</option>
        <option value="EC">Ecuador</option>
        <option value="PY">Paraguay</option>
        <option value="UY">Uruguay</option>
      </select>
    </div>
    <div class="container__phone">
      <input type="text" class="phoneCode" />
      <input type="text" autofocus class="phone" />
    </div>
    <div class="container__button">
      <div id="sign-container"></div>
      <button id="sign" class="next">INGRESAR</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import IStorage from "@/interfaces/Storage";

export default defineComponent({
  setup() {
    const Storage = inject<IStorage>("Storage");
    console.log(Storage?.set("token", "12345"));
    const countries = ref<string>("CL");
    const code = ref<string>("+ 562");
    const searchCodes = async (): Promise<void> => {
      try {
        const response: any = await fetch(
          `https://restcountries.eu/rest/v2/alpha?codes=${countries.value}`
        );
        const codes: any[] = await response.json();
        const [firstElement] = codes;
        code.value = `+ ${firstElement.callingCodes[0]}`;
      } catch (error) {
        //console.log(error.message); ojo poner un mensaje de error
      }
    };
    return {
      countries,
      code,
      searchCodes,
    };
  },

  //API PAISES?
});
</script>

<style lang="scss" scoped>
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

  .container__image {
    padding-bottom: 10px;

    .image {
      background: url("/public/logoTelegram.png") no-repeat;
      background-position: center;
      background-size: contain;
      height: 150px;
      width: 150px;
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;

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
  }

  .container__select {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 15px;

    select {
      width: 250px;
      padding: 10px;
      outline: none;
      border: none;
      height: 40px;
      border-radius: 7px;
    }
  }

  .container__phone {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 15px;

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
  }

  .container__button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 40px;

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
  }
}
</style>
