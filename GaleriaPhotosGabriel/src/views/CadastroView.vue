<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="cadastro-container">

        <div class="cadastro-header">
          <h1>Criar conta</h1>
          <p>Cadastre-se para acessar sua galeria</p>
        </div>

        <div class="cadastro-form">

          <ion-input
            v-model="nome"
            label="Nome"
            label-placement="floating"
            fill="outline"
            type="text"
            placeholder="Digite seu nome"
          />

          <ion-input
            v-model="email"
            label="E-mail"
            label-placement="floating"
            fill="outline"
            type="email"
            placeholder="Digite seu e-mail"
          />

          <ion-input
            v-model="senha"
            label="Senha"
            label-placement="floating"
            fill="outline"
            type="password"
            placeholder="Digite sua senha"
          />

          <ion-input
            v-model="confirmarSenha"
            label="Confirmar senha"
            label-placement="floating"
            fill="outline"
            type="password"
            placeholder="Digite sua senha novamente"
          />

          <ion-button
            expand="block"
            class="cadastro-button"
            @click="fazerCadastro"
          >
            Cadastrar
          </ion-button>

        </div>

        <div class="login-section">
          <span>Já possui uma conta?</span>

          <ion-button
            fill="clear"
            @click="voltarLogin"
          >
            Voltar para o login
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
  toastController
} from '@ionic/vue'

import { useAuth } from '@/composables/useAuth'

const router = useRouter()

const { cadastrar } = useAuth()

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')

async function fazerCadastro() {

  if (
    !nome.value ||
    !email.value ||
    !senha.value ||
    !confirmarSenha.value
  ) {
    await mostrarMensagem('Preencha todos os campos.')
    return
  }

  if (senha.value !== confirmarSenha.value) {
    await mostrarMensagem('As senhas não são iguais.')
    return
  }

  const resultado = await cadastrar(
    nome.value,
    email.value,
    senha.value
  )

  await mostrarMensagem(resultado.mensagem)

  if (resultado.sucesso) {
    router.replace('/login')
  }
}

async function mostrarMensagem(mensagem: string) {
  const toast = await toastController.create({
    message: mensagem,
    duration: 2000,
    position: 'bottom'
  })

  await toast.present()
}

function voltarLogin() {
  router.replace('/login')
}
</script>

<style scoped>
.cadastro-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 500px;

  margin: 0 auto;
  padding: 32px 24px;
}

.cadastro-header {
  text-align: center;
  margin-bottom: 32px;
}

.cadastro-header h1 {
  margin: 0 0 8px;

  font-size: 30px;
  font-weight: 700;
}

.cadastro-header p {
  margin: 0;

  font-size: 15px;
  color: var(--ion-color-medium);
}

.cadastro-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

ion-input {
  --border-radius: 12px;
}

.cadastro-button {
  height: 52px;
  margin-top: 8px;

  --border-radius: 12px;

  font-size: 16px;
  font-weight: 600;
}

.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 24px;

  color: var(--ion-color-medium);
}

.login-section span {
  font-size: 14px;
}

.login-section ion-button {
  margin-top: 2px;
  font-weight: 600;
}
</style>