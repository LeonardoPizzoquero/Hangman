let app = new Vue({
    el: '#app',
    //Variáveis utilizadas no jogo
    data: {
        stickman: "forca.png",
        category: "",
        word: "",
        length_word: "",
        letter: [],
        hidden_word: [],
        word_array: [],
        right_word: [],
        wrong_word: [],
        wrong_word_count: [],
        right_word_count: [],
        life: 0,
        relation: 0,
        word_show: false,
        ok: false,
        won: false,
        lost: false,
        guess: false,
        head: false,
        body: false,
        left_arm: false,
        right_arm: false,
        left_leg: false,
        right_leg: false,
        choosing_category: true,
        choosing_word: false,
        choosing_letter: false,
        hasError: false
    },
    methods: {

        //Função para confirmar a categoria escolhida
        okCategory() {

            if (this.category !== "" && isNaN(this.category)) {
                //Mostra e esconde as partes do jogo
                this.ok = true
                this.choosing_category = false
                this.choosing_word = true
            } else {
                alert("Escolha a categoria!")
                document.getElementById("category").focus()
                this.hasError = true
            }
        },

        //Função que confirma a palavra escolhida
        okWord() {

            if (this.word !== "" && isNaN(this.word)) {


                //String com todos os acentos
                let acentos = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ"

                //String com os mesmos índices para alteração dos acentos
                let whitout_acentos = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC"

                //Deixa a palavra minúscula
                let min_word = this.word.toLowerCase()

                //A palavra digitada será transformada em um array e atribuida a world_array
                this.word_array = Array.from(min_word)

                //Remover acentos da palavra digitada
                for (let i = 0; i < this.word_array.length; i++) {
                    //Para cada letra da palavra será verificado se há algum índice do array de acentos
                    for (let x = 0; x < acentos.length; x++) {
                        //Se houver acentos no índice da palavra, altera para o índice sem acento
                        if (this.word_array[i].indexOf(acentos[x]) === 0) {
                            this.word_array[i] = whitout_acentos[x]
                        }
                    }
                }

                for (let i = 0; i < this.word_array.length; i++) {
                    this.length_word = `${i} letra(s)`
                    //this.hidden_word = "_ ".repeat(this.word.length)
                    if (this.word_array[i] == " ") {
                        this.hidden_word.push(" - ")
                    } else {
                        this.hidden_word.push("_ ")
                    }
                }

                this.choosing_word = false
                this.guess = true
                this.choosing_letter = true
                this.word_show = true


            } else {
                alert("Escolha a palavra!")
                document.getElementById("word").focus()
                this.hasError = true
            }

        },

        //Função para remover _ da palavra escondida e revelar ao jogador após a derrota
        show_answer() {
            for (let i = 0; i < this.word.length; i++) {
                Vue.set(this.hidden_word, i, this.word_array[i])
            }
            this.won = false
        },

        //Função que verifica se o usuário perdeu
        lose() {

            //Se a vida do jogador for igual a 6 ou maior, ele perde
            if (this.life >= 6) {
                this.choosing_letter = false
                this.lost = true
                //Mostra a palavra correta
                this.show_answer()
                return false
            }

        },

        //Função que verifica se o usuário ganhou
        win() {

            //Se não houver mais _ no array de respostas, o usuário vence
            if (this.hidden_word.indexOf("_ ") === -1) {
                this.choosing_letter = false
                this.won = true
                return false
            }

        },

        //Função para reiniciar o jogo (Variáveis zeradas)
        restart() {

            this.won = false
            this.choosing_letter = false
            this.ok = false
            this.word_show = false
            this.choosing_category = true
            this.word = ""
            this.category = ""
            this.category = ""
            this.word = ""
            this.lost = false
            this.letter = []
            this.hidden_word = []
            this.word_array = []
            this.length_word = ""
            this.right_word = []
            this.wrong_word = []
            this.life = 0
            this.wrong_word_count = []
            this.right_word_count = []
            this.stickman = "forca.png"

        },

        //Função para verificação da letra digitada
        okLetter() {

            //Verificando se o usuário digitou uma letra e se não é um número
            if (this.letter !== "" && isNaN(this.letter)) {

                //Mantendo a letra minúscula
                let min_letter = this.letter.toLowerCase()

                this.wrong_word_count = []
                this.right_word = []

                //Filtrando letras duplicadas nas respostas corretas
                let duplicates_right = (right_word_count) => this.right_word_count.filter((v, i) => right_word_count.indexOf(v) === i)


                for (let i = 0; i < this.word.length; i++) {

                    //Se o usuário acertar a letra, mostra a posição da letra e também adiciona no contador de letras corretas
                    if (this.word_array[i] === min_letter[0]) {

                        //Maneira do Vue atualizar o índice do array para a letra digitada dinamicamente
                        Vue.set(this.hidden_word, i, min_letter[0])

                        if (min_letter.indexOf(' ') === -1) {
                            this.right_word_count.push(min_letter[0])
                        }

                    } else {

                        this.wrong_word_count.push(min_letter[0])

                        //Se a letra digitada for errada
                        if (this.wrong_word_count.length === this.word.length && this.wrong_word.indexOf(min_letter[0] + ",") === -1 && min_letter.indexOf(' ') === -1) {
                            //Adiciona no array de letras incorretas
                            this.wrong_word.push(min_letter[0] + ",")
                            //Adiciona mais 1 para a vida do jogador, máximo 6 vidas
                            this.life++
                            //Switch para alterar a imagem da forca de acordo com a vida do jogador
                            switch (this.life) {
                                case 0:
                                    this.stickman = "forca.png"
                                    break
                                case 1:
                                    this.stickman = "forca_cabeca.png"
                                    break
                                case 2:
                                    this.stickman = "forca_corpo.png"
                                    break
                                case 3:
                                    this.stickman = "forca_braco_esquerdo.png"
                                    break
                                case 4:
                                    this.stickman = "forca_braco_direito.png"
                                    break
                                case 5:
                                    this.stickman = "forca_perna_esquerda.png"
                                    break
                                case 6:
                                    this.stickman = "forca_perna_direita.png"
                                    break
                            }
                        }

                    }

                    //Verifica se o usuário venceu
                    this.win()

                    //Verifica se o usuário perdeu
                    this.lose()


                }

                //Adiciona a letra correta no array
                if (this.right_word_count.length !== 0) {
                    this.right_word.push(duplicates_right(this.right_word_count) + ",")
                }

                //Remove a última letra digitada para receber uma nova
                this.letter = ""

            } else {
                alert("Escolha uma letra!")
                document.getElementById("letter").focus()
                this.hasError = true
            }

        },

        //Remove a borda vermelha do input ao preencher
        onFill() {
            if (this.hasError == true) {
                this.hasError = false
            }
        }
    }
})