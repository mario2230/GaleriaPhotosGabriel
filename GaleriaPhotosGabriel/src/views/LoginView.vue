<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="login-container">

        <div class="login-header">
          <div class="logo">
            <ion-icon :icon="imagesOutline" />
          </div>

          <h1>Minha Galeria</h1>
          <p>Entre para acessar suas fotos</p>
        </div>

        <div class="login-form">

          <ion-input
            v-model="email"
            label="E-mail"
            label-placement="floating"
            fill="outline"
            type="email"
            placeholder="Digite seu e-mail"
          >
            <ion-icon
              slot="start"
              :icon="mailOutline"
            />
          </ion-input>

          <ion-input
            v-model="senha"
            label="Senha"
            label-placement="floating"
            fill="outline"
            type="password"
            placeholder="Digite sua senha"
          >
            <ion-icon
              slot="start"
              :icon="lockClosedOutline"
            />
          </ion-input>

          <ion-button
            expand="block"
            class="login-button"
            @click="fazerLogin"
          >
            Entrar
          </ion-button>

        </div>

        <div class="register-section">
          <span>Não possui uma conta?</span>

          <ion-button
            fill="clear"
            @click="irParaCadastro"
          >
            Criar conta
          </ion-button>
        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  toastController
} from '@ionic/vue'

import {
  imagesOutline,
  mailOutline,
  lockClosedOutline
} from 'ionicons/icons'

import { useAuth } from '@/composables/useAuth'

const router = useRouter()

const { login } = useAuth()

const email = ref('')
const senha = ref('')

async function fazerLogin() {
  if (!email.value || !senha.value) {
    const toast = await toastController.create({
      message: 'Preencha todos os campos.',
      duration: 2000,
      position: 'bottom'
    })

    await toast.present()
    return
  }

  const resultado = await login(
    email.value,
    senha.value
  )

  const toast = await toastController.create({
    message: resultado.mensagem,
    duration: 2000,
    position: 'bottom'
  })

  await toast.present()

  if (resultado.sucesso) {
    router.replace('/tabs/home')
  }
}

function irParaCadastro() {
  router.push('/cadastro')
}
</script>

<style scoped>
.login-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 500px;

  margin: 0 auto;
  padding: 32px 24px;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 76px;
  height: 76px;

  margin: 0 auto 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 22px;

  background: var(--ion-color-primary);
  color: white;

  font-size: 42px;
}

.login-header h1 {
  margin: 0 0 8px;

  font-size: 30px;
  font-weight: 700;
}

.login-header p {
  margin: 0;

  font-size: 15px;
  color: var(--ion-color-medium);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

ion-input {
  --border-radius: 12px;
}

.login-button {
  height: 52px;
  margin-top: 8px;

  --border-radius: 12px;

  font-size: 16px;
  font-weight: 600;
}

.register-section {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 28px;

  color: var(--ion-color-medium);
}

.register-section span {
  font-size: 14px;
}

.register-section ion-button {
  margin-top: 2px;
  font-weight: 600;
}
</style>