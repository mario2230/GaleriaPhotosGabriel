<template>
    <ion-page>

        <ion-header>
            <ion-toolbar>
                <ion-title>Minha Galeria</ion-title>

                <ion-buttons slot="end">
                    <ion-button @click="sair">
                        <ion-icon :icon="logOutOutline" />
                        <ion-label>Sair</ion-label>
                    </ion-button>
                </ion-buttons>

            </ion-toolbar>
        </ion-header>

        <ion-content>

            <div class="gallery-container">

                <div class="gallery-header">
                    <h1>Minhas fotos</h1>
                    <p>
                        {{ fotos.length }}
                        {{ fotos.length === 1 ? 'foto adicionada' : 'fotos adicionadas' }}
                    </p>
                </div>

                <div v-if="fotos.length > 0" class="gallery">

                    <div v-for="(foto, index) in fotos" :key="index" class="photo-card">

                        <img :src="foto" alt="Foto da galeria" />

                        <ion-button class="remove-button" fill="clear" @click="removerFoto(index)">
                            <ion-icon :icon="trashOutline" />
                        </ion-button>

                    </div>

                </div>


                <div v-else class="empty-gallery">
                    <ion-icon :icon="imagesOutline" />

                    <h2>Nenhuma foto</h2>

                    <p>
                        Adicione uma foto usando o botão abaixo.
                    </p>
                </div>

            </div>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="adicionarFoto">
                    <ion-icon :icon="addOutline" />
                </ion-fab-button>
            </ion-fab>

        </ion-content>

    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
    Camera,
    CameraResultType,
    CameraSource
} from '@capacitor/camera'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonButtons,
  IonLabel,
  toastController
} from '@ionic/vue'

import {
    addOutline,
    imagesOutline,
    trashOutline,
    logOutOutline
} from 'ionicons/icons'

import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()

const { logout } = useAuth()

function sair() {
  logout()

  router.replace('/login')
}

const fotos = ref<string[]>([])


async function adicionarFoto() {
    try {

        const foto = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Prompt,
            quality: 90,
            width: 800
        })

        if (foto.dataUrl) {
            fotos.value.push(foto.dataUrl)

            await mostrarToast(
                'Foto adicionada com sucesso!',
                'success'
            )
        }

    } catch (err: unknown) {

        if (String(err).toLowerCase().includes('cancel')) {
            return
        }

        console.error('Erro ao adicionar foto:', err)

        await mostrarToast(
            'Não foi possível acessar a câmera ou galeria.',
            'danger'
        )
    }
}


async function removerFoto(index: number) {

    fotos.value.splice(index, 1)

    await mostrarToast(
        'Foto removida.',
        'success'
    )
}

async function mostrarToast(
    mensagem: string,
    cor: 'success' | 'danger'
) {

    const toast = await toastController.create({
        message: mensagem,
        duration: 1800,
        position: 'bottom',
        color: cor
    })

    await toast.present()
}
</script>

<style scoped>
.gallery-container {
    width: 100%;
    max-width: 1200px;

    margin: 0 auto;

    padding: 20px 16px 100px;
}


.gallery-header {
    margin-bottom: 20px;
}

.gallery-header h1 {
    margin: 0;

    font-size: 26px;
    font-weight: 700;

    color: var(--ion-text-color);
}

.gallery-header p {
    margin: 6px 0 0;

    font-size: 14px;

    color: var(--ion-color-medium);
}


.gallery {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 12px;
}



.photo-card {
    position: relative;

    width: 100%;

    aspect-ratio: 1 / 1;

    overflow: hidden;

    border-radius: 14px;

    background: var(--ion-color-light);
}

.photo-card img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
}


.remove-button {
    position: absolute;

    top: 6px;
    right: 6px;

    width: 38px;
    height: 38px;

    margin: 0;

    --padding-start: 0;
    --padding-end: 0;

    --border-radius: 50%;

    --background: rgba(0, 0, 0, 0.65);

    --color: white;
}

.remove-button ion-icon {
    font-size: 20px;
}



.empty-gallery {
    min-height: 350px;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    text-align: center;

    padding: 40px 20px;
}

.empty-gallery>ion-icon {
    font-size: 72px;

    margin-bottom: 16px;

    color: var(--ion-color-medium);
}

.empty-gallery h2 {
    margin: 0 0 8px;

    font-size: 20px;
    font-weight: 600;

    color: var(--ion-text-color);
}

.empty-gallery p {
    max-width: 280px;

    margin: 0;

    font-size: 14px;
    line-height: 1.5;

    color: var(--ion-color-medium);
}



ion-fab-button {
    --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    margin: 0 16px 16px 0;
}




@media (min-width: 576px) {
    .gallery {
        grid-template-columns: repeat(3, 1fr);
    }
}




@media (min-width: 992px) {
    .gallery {
        grid-template-columns: repeat(4, 1fr);
    }

    .gallery-container {
        padding-left: 24px;
        padding-right: 24px;
    }
}
</style>