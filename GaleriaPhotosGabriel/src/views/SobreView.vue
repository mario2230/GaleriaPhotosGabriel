<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title>Sobre</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>

      <div class="sobre-container">

        <div class="sobre-header">

          <div class="sobre-icon">
            <ion-icon :icon="informationCircleOutline" />
          </div>

          <h1>Minha Galeria</h1>

          <p>
            Aplicativo para gerenciamento de fotos.
          </p>

        </div>


        <!-- Versão -->

        <ion-card class="sobre-card">

          <ion-card-header>
            <ion-card-title>Versão do aplicativo</ion-card-title>
          </ion-card-header>

          <ion-card-content>

            <div class="version">
              <span>Versão atual</span>

              <strong>1.0.0</strong>
            </div>

          </ion-card-content>

        </ion-card>


        <!-- Termos de uso -->

        <ion-card class="sobre-card">

          <ion-card-header>
            <ion-card-title>Termos de uso</ion-card-title>
          </ion-card-header>

          <ion-card-content>

            <p>
              Ao utilizar este aplicativo, o usuário concorda
              em utilizar seus recursos de forma adequada e
              responsável.
            </p>

            <p>
              O aplicativo foi desenvolvido para permitir que
              o usuário faça login e gerencie sua galeria
              pessoal de imagens.
            </p>

          </ion-card-content>

        </ion-card>


        <!-- Termos de privacidade -->

        <ion-card class="sobre-card">

          <ion-card-header>
            <ion-card-title>Política de privacidade</ion-card-title>
          </ion-card-header>

          <ion-card-content>

            <p>
              Os dados utilizados pelo aplicativo são
              armazenados localmente no dispositivo através
              do banco de dados SQLite.
            </p>

            <p>
              As informações de cadastro são utilizadas
              exclusivamente para permitir a autenticação
              do usuário no aplicativo.
            </p>

            <p>
              O aplicativo não compartilha essas informações
              com terceiros.
            </p>

          </ion-card-content>

        </ion-card>

      </div>

    </ion-content>

  </ion-page>
</template>


<script setup lang="ts">

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue'

import {
  informationCircleOutline
} from 'ionicons/icons'

</script>


<style scoped>

.sobre-container {
  width: 100%;
  max-width: 700px;

  margin: 0 auto;

  padding: 24px 20px 40px;
}


/* Cabeçalho */

.sobre-header {
  text-align: center;

  margin-bottom: 28px;
}

.sobre-icon {
  width: 72px;
  height: 72px;

  margin: 0 auto 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 20px;

  background: var(--ion-color-primary);

  color: white;

  font-size: 38px;
}

.sobre-header h1 {
  margin: 0 0 8px;

  font-size: 28px;
  font-weight: 700;

  color: var(--ion-text-color);
}

.sobre-header p {
  margin: 0;

  font-size: 14px;

  color: var(--ion-color-medium);
}


/* Cards */

.sobre-card {
  margin: 0 0 16px;

  border-radius: 16px;

  box-shadow: none;

  border: 1px solid
    var(--ion-color-light-shade);
}

.sobre-card ion-card-header {
  padding-bottom: 8px;
}

.sobre-card ion-card-title {
  font-size: 18px;
  font-weight: 600;
}

.sobre-card ion-card-content {
  font-size: 14px;

  line-height: 1.6;

  color: var(--ion-color-medium);
}

.sobre-card p {
  margin: 0 0 12px;
}

.sobre-card p:last-child {
  margin-bottom: 0;
}


/* Versão */

.version {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 4px 0;
}

.version span {
  color: var(--ion-color-medium);
}

.version strong {
  color: var(--ion-text-color);

  font-size: 15px;
}


/* Desktop */

@media (min-width: 768px) {

  .sobre-container {
    padding: 32px 24px 48px;
  }

}

</style>