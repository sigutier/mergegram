<template>
  <div class="contacts">
    <ul class="contactList">
      <li>
        <img
          src="https://i.pravatar.cc/150?img=42"
          alt="avatar"
          width="65"
          height="65"
        />
        <section class="info">
          <div class="name">Rebeca</div>
          <div class="lastMessage">Mi último mensaje</div>
        </section>
      </li>
      <li>
        <img
          src="https://i.pravatar.cc/150?img=36"
          alt="avatar"
          width="65"
          height="65"
        />
        <section class="info">
          <div class="name">Silvia</div>
          <div class="lastMessage">Mi último mensaje</div>
        </section>
      </li>
      <li>
        <img
          src="https://i.pravatar.cc/150?img=41"
          alt="avatar"
          width="65"
          height="65"
        />
        <section class="info">
          <div class="name">Beatriz</div>
          <div class="lastMessage">Mi último mensaje</div>
        </section>
      </li>
      <li class="active">
        <img
          src="https://i.pravatar.cc/150?img=47"
          alt="avatar"
          width="65"
          height="65"
        />
        <section class="info">
          <div class="name">Pilar</div>
          <div class="lastMessage">Mi último mensaje</div>
        </section>
      </li>
      <li>
        <img
          src="https://i.pravatar.cc/150?img=29"
          alt="avatar"
          width="65"
          height="65"
        />
        <section class="info">
          <div class="name">Clara</div>
          <div class="lastMessage">Mi último mensaje</div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="css" scoped>
@import url("../assets/variables.css");

.contacts {
  width: 100%;
}

.contactList {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
}

li {
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  margin-bottom: 10px;
  border-radius: 2px;
  cursor: pointer;
}

img {
  border-radius: 50%;
}

.info {
  padding: 10px;
  display: flex;
  width: calc(100% - 65px);
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.name {
  font-size: 16px;
}

.lastMessage {
  font-size: 14px;
}

.active {
  background: var(--fontColorActive);
}
</style>
