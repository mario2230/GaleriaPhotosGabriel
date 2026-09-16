import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

export function fotoUse(){


async function salvarFoto(conteudo: string) {
    await Filesystem.writeFile({
        path: 'foto-${Data.now()}.jpg',
        data: conteudo,
        directory: Directory.Data,
        encoding: Encoding.UTF8
    })
}

return {
    salvarFoto
}

}


