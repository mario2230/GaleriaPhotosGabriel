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

                    <div
                        v-for="(foto, index) in fotos"
                        :key="foto.uri"
                        class="photo-card"
                    >

                        <img
                            :src="foto.url"
                            alt="Foto da galeria"
                        />


                        <!-- Botão remover -->
                        <ion-button
                            class="remove-button"
                            fill="clear"
                            @click="removerFoto(index)"
                        >
                            <ion-icon :icon="trashOutline" />
                        </ion-button>


                        <!-- Botão compartilhar -->
                        <ion-button
                            class="share-button"
                            expand="block"
                            fill="outline"
                            @click="compartilharFoto(foto.uri)"
                        >
                            <ion-icon
                                slot="start"
                                :icon="shareOutline"
                            />

                            Compartilhar
                        </ion-button>

                    </div>

                </div>


                <!-- Galeria vazia -->
                <div
                    v-else
                    class="empty-gallery"
                >

                    <ion-icon :icon="imagesOutline" />

                    <h2>Nenhuma foto</h2>

                    <p>
                        Adicione uma foto usando o botão abaixo.
                    </p>

                </div>

            </div>


            <!-- Botão adicionar -->
            <ion-fab
                vertical="bottom"
                horizontal="end"
                slot="fixed"
            >

                <ion-fab-button @click="adicionarFoto">

                    <ion-icon :icon="addOutline" />

                </ion-fab-button>

            </ion-fab>

        </ion-content>

    </ion-page>
</template>


<script setup lang="ts">

import { onMounted, ref } from 'vue'


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
    logOutOutline,
    shareOutline
} from 'ionicons/icons'


import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

import {
    Directory,
    Filesystem
} from '@capacitor/filesystem'

import { Share } from '@capacitor/share'


const router = useRouter()

const { logout } = useAuth()


/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

function sair() {

    logout()

    router.replace('/login')
}


/*
|--------------------------------------------------------------------------
| Tipo da foto
|--------------------------------------------------------------------------
|
| url → usada para mostrar a imagem na tela
|
| uri → caminho do arquivo salvo no dispositivo,
|       usado para compartilhar
|
|--------------------------------------------------------------------------
*/

interface Foto {

    url: string

    uri: string
}


/*
|--------------------------------------------------------------------------
| Lista de fotos
|--------------------------------------------------------------------------
*/

const fotos = ref<Foto[]>([])


/*
|--------------------------------------------------------------------------
| Compartilhar foto
|--------------------------------------------------------------------------
*/

async function compartilharFoto(uri: string) {

    try {

        await Share.share({

            title: 'Minha Foto',

            text: 'Confira a minha foto!',

            url: uri,

            dialogTitle: 'Compartilhar foto'

        })

    } catch (error) {

        console.log(
            'Compartilhamento cancelado ou indisponível:',
            error
        )

    }

}


/*
|--------------------------------------------------------------------------
| Salvar imagem no dispositivo
|--------------------------------------------------------------------------
*/

async function salvarImagem(
    dataUrl: string
): Promise<string> {

    const base64Data = dataUrl.split(',')[1]


    if (!base64Data) {

        throw new Error(
            'Formato de imagem inválido'
        )

    }


    const nomeArquivo =
        `foto-${Date.now()}.jpg`


    const resultado =
        await Filesystem.writeFile({

            path: nomeArquivo,

            data: base64Data,

            directory: Directory.Data

        })


    return resultado.uri
}


/*
|--------------------------------------------------------------------------
| Processar foto
|--------------------------------------------------------------------------
*/

async function processarFoto(
    dataUrl: string
) {

    if (!dataUrl) return


    const uri =
        await salvarImagem(dataUrl)


    fotos.value.push({

        url: dataUrl,

        uri: uri

    })

}


/*
|--------------------------------------------------------------------------
| Adicionar foto
|--------------------------------------------------------------------------
*/

async function adicionarFoto() {

    try {

        const foto =
            await Camera.getPhoto({

                resultType:
                    CameraResultType.DataUrl,

                source:
                    CameraSource.Prompt,

                quality: 90,

                width: 800

            })


        if (foto.dataUrl) {

            await processarFoto(
                foto.dataUrl
            )

        }

    } catch (err: unknown) {

        /*
        | Ignora cancelamento da câmera/galeria
        */

        if (
            String(err)
                .toLowerCase()
                .includes('cancel')
        ) {

            return

        }


        console.error(
            'Erro ao adicionar foto:',
            err
        )


        await mostrarToast(

            'Não foi possível acessar a câmera ou galeria.',

            'danger'

        )

    }

}


/*
|--------------------------------------------------------------------------
| Remover foto
|--------------------------------------------------------------------------
*/

async function removerFoto(
    index: number
) {

    fotos.value.splice(
        index,
        1
    )


    await mostrarToast(

        'Foto removida.',

        'success'

    )

}


/*
|--------------------------------------------------------------------------
| Toast
|--------------------------------------------------------------------------
*/

async function mostrarToast(

    mensagem: string,

    cor: 'success' | 'danger'

) {

    const toast =
        await toastController.create({

            message: mensagem,

            duration: 1800,

            position: 'bottom',

            color: cor

        })


    await toast.present()

}


/*
|--------------------------------------------------------------------------
| Verificar permissões
|--------------------------------------------------------------------------
*/

async function verificarPermissao() {

    try {

        const status =
            await Camera.checkPermissions()


        if (
            status.camera !== 'granted'
        ) {

            const result =
                await Camera.requestPermissions()


            if (
                result.camera !== 'granted'
            ) {

                await mostrarToast(
                    'Permissão da câmera negada.',
                    'danger'
                )

                return false

            }

        }


        return true

    } catch (error) {

        console.error(
            'Erro ao verificar permissão:',
            error
        )

        return false

    }

}


/*
|--------------------------------------------------------------------------
| Inicialização
|--------------------------------------------------------------------------
*/

onMounted(

    verificarPermissao

)

</script>


<style scoped>

.gallery-container {

    width: 100%;

    max-width: 1200px;

    margin: 0 auto;

    padding: 20px 16px 100px;

}


/*
|--------------------------------------------------------------------------
| Cabeçalho
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| Galeria
|--------------------------------------------------------------------------
*/

.gallery {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 12px;

}


/*
|--------------------------------------------------------------------------
| Card da foto
|--------------------------------------------------------------------------
*/

.photo-card {

    position: relative;

    width: 100%;

    aspect-ratio: 1 / 1;

    overflow: hidden;

    border-radius: 14px;

    background:
        var(--ion-color-light);

}


/*
|--------------------------------------------------------------------------
| Imagem
|--------------------------------------------------------------------------
*/

.photo-card img {

    width: 100%;

    height: 100%;

    display: block;

    object-fit: cover;

}


/*
|--------------------------------------------------------------------------
| Botão remover
|--------------------------------------------------------------------------
*/

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

    --background:
        rgba(0, 0, 0, 0.65);

    --color: white;

}


.remove-button ion-icon {

    font-size: 20px;

}


/*
|--------------------------------------------------------------------------
| Botão compartilhar
|--------------------------------------------------------------------------
*/

.share-button {

    position: absolute;

    left: 8px;

    right: 8px;

    bottom: 8px;

    margin: 0;

    --background:
        rgba(255, 255, 255, 0.92);

    --color:
        var(--ion-color-primary);

    --border-color:
        var(--ion-color-primary);

}


/*
|--------------------------------------------------------------------------
| Galeria vazia
|--------------------------------------------------------------------------
*/

.empty-gallery {

    min-height: 350px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;

    padding: 40px 20px;

}


.empty-gallery > ion-icon {

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


/*
|--------------------------------------------------------------------------
| FAB
|--------------------------------------------------------------------------
*/

ion-fab-button {

    --box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.2);

    margin:
        0 16px 16px 0;

}


/*
|--------------------------------------------------------------------------
| Tablet
|--------------------------------------------------------------------------
*/

@media (min-width: 576px) {

    .gallery {

        grid-template-columns:
            repeat(3, 1fr);

    }

}


/*
|--------------------------------------------------------------------------
| Desktop
|--------------------------------------------------------------------------
*/

@media (min-width: 992px) {

    .gallery {

        grid-template-columns:
            repeat(4, 1fr);

    }


    .gallery-container {

        padding-left: 24px;

        padding-right: 24px;

    }

}

</style>