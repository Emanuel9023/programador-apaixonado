
const mensagem =
    "Entre tantos universos e infinitas galáxias, " +
    "você é a estrela que ilumina a minha vida.";

const $ = id => document.getElementById(id);

const esperar = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

let iniciado = false;

$("abrir").addEventListener("click", async () => {

    if (iniciado) return;
    iniciado = true;

    $("inicio").style.display = "none";
    $("cenario").hidden = false;

    criarEstrelas();
    criarCadentes();

    // A lua nasce
    await esperar(4800);

    // Os personagens se encontram
    $("rapaz").classList.add("andar");
    $("garota").classList.add("andar");

    await esperar(4200);

    // A rosa aparece perto do rapaz
    const flor = $("flor");
    const imagem = $("florImagem");

    imagem.src = "assets/rosa.png";
    flor.classList.add("visivel");

    await esperar(900);

    // A rosa flutua até a garota
    flor.classList.add("flutuando");

    // Pétalas acompanham a trajetória
    for (let i = 0; i < 7; i++) {
        criarPetalasNaRosa(4);
        await esperar(450);
    }

    await esperar(350);

    flor.classList.remove("flutuando");
    flor.classList.add("entregue");

    // A rosa começa a desabrochar
    await trocarFlor("rosa_abrindo.png", 700);

    criarPetalasNaRosa(12);

    await trocarFlor("rosa_florescida.png", 850);

    criarPetalasNaRosa(18);

    // Transformação no buquê
    await trocarFlor("buque.png", 900);

    criarPetalasNaRosa(25);

    flor.classList.add("florescer");

    // Estrelas brilham mais
    intensificarEstrelas();

    await esperar(1200);

    // Declaração romântica
    await mostrarMensagem();

    $("coracao").classList.add("ativo");

});

async function trocarFlor(arquivo, pausa) {
    await esperar(pausa);
    $("florImagem").src = "assets/" + arquivo;
}

function criarEstrelas() {

    const camada = $("estrelas");
    camada.replaceChildren();

    for (let i = 0; i < 85; i++) {

        const estrela = document.createElement("span");
        estrela.className = "estrela";

        estrela.style.left = Math.random() * 100 + "%";
        estrela.style.top = Math.random() * 85 + "%";

        estrela.style.setProperty(
            "--size",
            (1 + Math.random() * 2) + "px"
        );

        estrela.style.setProperty(
            "--dur",
            (2 + Math.random() * 3) + "s"
        );

        estrela.style.setProperty(
            "--delay",
            (-Math.random() * 5) + "s"
        );

        camada.append(estrela);
    }
}

function criarCadentes() {

    const camada = $("cadentes");
    camada.replaceChildren();

    for (let i = 0; i < 3; i++) {

        const cadente = document.createElement("span");
        cadente.className = "cadente";

        cadente.style.left =
            (65 + Math.random() * 28) + "%";

        cadente.style.top =
            (5 + Math.random() * 28) + "%";

        cadente.style.setProperty(
            "--delay",
            (2 + i * 3) + "s"
        );

        camada.append(cadente);
    }
}

function criarPetalasNaRosa(quantidade) {

    const camada = $("particulas");
    const flor = $("flor");

    const palco = $("palco").getBoundingClientRect();
    const posicao = flor.getBoundingClientRect();

    const centroX =
        posicao.left + posicao.width / 2 - palco.left;

    const centroY =
        posicao.top + posicao.height * 0.25 - palco.top;

    for (let i = 0; i < quantidade; i++) {

        const petala = document.createElement("span");
        petala.className = "petala";

        petala.style.left = centroX + "px";
        petala.style.top = centroY + "px";

        petala.style.setProperty(
            "--dx",
            ((Math.random() - 0.5) * 160) + "px"
        );

        petala.style.setProperty(
            "--dy",
            ((Math.random() - 0.5) * 130) + "px"
        );

        petala.style.setProperty(
            "--rot",
            (Math.random() * 450) + "deg"
        );

        petala.style.setProperty(
            "--delay",
            (Math.random() * 0.25) + "s"
        );

        camada.append(petala);

        setTimeout(() => petala.remove(), 2500);
    }
}

function intensificarEstrelas() {

    document.querySelectorAll(".estrela")
        .forEach(estrela => {

            estrela.style.boxShadow =
                "0 0 14px #f4dbff, " +
                "0 0 25px #c79bff";

        });
}

async function mostrarMensagem() {

    const elemento = $("frase");
    elemento.textContent = "";

    for (const palavra of mensagem.split(" ")) {

        elemento.textContent +=
            (elemento.textContent ? " " : "") +
            palavra;

        await esperar(330);
    }
}
