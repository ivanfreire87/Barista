
$(document).ready(function () {
    
    $('.listaOuter, .listaInner').dragscrollable({
        dragSelector: 'img',
        acceptPropagatedEvent: false
    });

    $('.listaOuter, .listaInner').dragscrollable({
        dragSelector: 'div',
        acceptPropagatedEvent: false
    });

    $('.listaOuter, .listaInner').dragscrollable({
        dragSelector: 'img',
        acceptPropagatedEvent: false
    });

    
    var totalMusicas = 15
    var cancelarPedido = false
    var confirmarRemover = false
    var i = 1
    var genero = 0
    var efeitoMenu = 'slide'
    var efeitoMenuDireita = { direction: 'right' }
    var efeitoMenuEsquerda = { direction: 'left' }
    var efeitoMenuCima = { direction: 'up' }
    var efeitoMenuBaixo = { direction: 'down' }
    var efeitoMenuDuracao = 500

    var divMenuActual = $('#divMenuPrincipal')
	var divMusicasActual = $('#divMusicasPrincipal')
    var pedidoAberto = 0
    var fecharPedido = 0
    var contaAberta = 0
    var confirmado = 0
    var apedir = 0
    var npedido = 1
    var numeroMusicas = 0
    var musicaInfoAberto = 'spaceman'
    var w = 136 * 2;
    $('.listaInner').css('width', w)
    $('#counter')
    var criaNomeProduto = new Array()
    var produto = new Array()
    var produtoMusica = new Array()
    var produtoPrecoBase = new Array()
    var produtoPreco = new Array()
    var produtoNome = new Array()
    var produtoNomeCerto = new Array
    var produtoNomeArtista = new Array()
    var clicado = new Array()
    var totalVotos = 0
    var votou = new Array()
    var criado = new Array()
    var total = 0
    var menuAberto = 0;
    var musicasAberto = 0;
	var totalConta = 0;
	$('#noTotalValorConta').append('0,00');

	function jukeboxMostra(){
	    if ($('#jukebox').is(':visible')) {
	        $('#jukebox').toggle(efeitoMenu, efeitoMenuBaixo, efeitoMenuDuracao)
	        $('#musicatopo').show()
	    }
	    else {
	        $('#jukebox').toggle(efeitoMenu, efeitoMenuBaixo, efeitoMenuDuracao)
	        $('#musicatopo').hide()
	    }
	}

	
	/****************************Conta****************************************/
	$('#conta').click(function () {
	    
	    if (contaAberta == 0) {        
		    if (menuAberto == 1) {
		        if (confirmado == 1) {
		            $('#botaoOK').click()
		            confirmado = 0
		        }
		        else {
		            w = larguraMenu()
		            $('.listaInner').css('width', w)
		            divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao, function () {
		                $('#divConta').show()
		                contaAberta = 1
		            })
		            menuAberto = 0

		            $('#confirmacao').hide()
		            $('#confirmacaoRemover').hide()
		            $('#confirmacaoCancelar').hide()
		            if (apedir == 1) {
		                $('#divPedido').show()
		                apedir = 0
		            }
		            if (total > 0 || fecharPedido == 1) {
		                $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
		                fecharPedido = 0
		                pedidoAberto = 0
		            }
		            divMenuActual = $('#divMenuPrincipal')
		            $('#botaoMenu').text("Menu")
		            $('.sair').hide()
		            
		        }
		    }

		    else if (musicasAberto == 1) {
		        divMusicasActual.animate({ "height": "265" }, 500);
		        divMusicasActual.animate({ "margin-top": "46" }, 500);
		        divMusicasActual.toggle(efeitoMenu, efeitoMenuEsquerda, efeitoMenuDuracao, function () {
		            $('#divConta').show()
		            contaAberta = 1
		        })
		        musicasAberto = 0
		        divMusicasActual = $('#divMusicasPrincipal')
		        $('#botaoMusicas').text("Músicas")
		        $('.sairMusicas').hide()
		    }



		    else {
		        jukeboxMostra()
		        $('#divConta').show()
		        contaAberta = 1
		    }

			if(totalConta == 0){
				$('#infoConta').remove()
				$('#listaConta').append('<p id="infoConta" style="margin-top:3px; margin-left:25px">Sem produtos por pagar!</p>')
				
			}
	    } else {
            jukeboxMostra()
			$('#divConta').hide()
			contaAberta=0
		}
		
	})

	$('.sairConta').click(function () {
	    jukeboxMostra()
	    $('#divConta').hide()
	    contaAberta = 0

	})
	
	
	$('#pagarConta').click(function() {
	    $('#listaConta').empty()
	    $('#listaConta').append('<p id="infoConta" style="margin-top:3px; margin-left:25px">Sem produtos por pagar!</p>')
		$('#noTotalValorConta').text('0,00')
        npedido = 1
        totalConta = 0
        contaAberta = 0
        $('#pagarConta').hide()
	})


	$(document).click(function () {
	    $('#help').hide()
	});

	$('#ajuda').mousedown(function () {
	    

	    if(apedir == 1 && total > 0)
	        $('#help').css("background-image", "url(pics/AjudaConfirmacao.png)")
	    else if (apedir == 1 && total == 0)
	        $('#help').css("background-image", "url(pics/AjudaConfirmacaoOk.png)")
	    else if(menuAberto == 1) {
	        var divActual = divMenuActual.attr('id');
	        switch (divActual) {
	            case 'divMenuPrincipal':
	                $('#help').css("background-image", "url(pics/AjudaMenuPrincipal.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuPrincipalPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuPrincipalPedidoVazio.png)")
	                break;
	            case 'divMenuBebidas':
	                $('#help').css("background-image", "url(pics/AjudaMenuBebidas.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidasPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidas.png)")
	                break;
	            case 'divMenuComidas':
	                $('#help').css("background-image", "url(pics/AjudaMenuComidas.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidasPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidas.png)")
	                break;
	            case 'divMenuAperitivos':
	                $('#help').css("background-image", "url(pics/AjudaMenuComidasTipo.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidasTipoPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidasTipoPedidoVazio.png)")
	                break;
	            case 'divMenuHamburguers':
	                $('#help').css("background-image", "url(pics/AjudaMenuComidasTipo.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidasTipoPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidasTipoPedidoVazio.png)")
	                break;
	            case 'divMenuCachorros':
	                $('#help').css("background-image", "url(pics/AjudaMenuComidasTipo.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidasTipoPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidasTipoPedidoVazio.png)")
	                break;
	            case 'divMenuTostas':
	                $('#help').css("background-image", "url(pics/AjudaMenuComidasTipo.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidasTipoPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuComidasTipoPedidoVazio.png)")
	                break;
	            case 'divMenuCocktails':
	                $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipo.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipoPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipoPedidoVazio.png)")
	                break;
	            case 'divMenuLongDrinks':
	                $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipo.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipoPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipoPedidoVazio.png)")
	                break;
	            case 'divMenuRefrigerantes':
	                $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipo.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipoPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipoPedidoVazio.png)")
	                break;
	            case 'divMenuCervejas':
	                $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipo.png)")
	                if (total > 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipoPedido.png)")
	                if (pedidoAberto == 1 && total == 0)
	                    $('#help').css("background-image", "url(pics/AjudaMenuBebidasTipoPedidoVazio.png)")
	                break;
	        }
	    }
	    if (musicasAberto == 1) {
	        if(genero == 1){
	            $('#help').css("background-image", "url(pics/AjudaMusicasGenero.png)")
	            if ($('.listaAleatorio').is(":visible"))
	                $('#help').css("background-image", "url(pics/AjudaMusicasGeneroRandom.png)")
	        }
	        if (genero == 1 && $('#divMusicasInfo').is(":visible")) {
	            $('#help').css("background-image", "url(pics/AjudaMusicasGeneroInfo.png)")
	            if ($('.listaAleatorio').is(":visible"))
	                $('#help').css("background-image", "url(pics/AjudaMusicasGeneroInfoRandom.png)")
	        }
	        

	        if (genero == 0) {
	            $('#help').css("background-image", "url(pics/AjudaMusicasPrincipal.png)")
	            if ($('.listaAleatorio').is(":visible"))
	                $('#help').css("background-image", "url(pics/AjudaMusicasPrincipalRandom.png)")
	        }
	   	       
	    }

	    if (musicasAberto == 0 && menuAberto == 0) {
	        $('#help').css("background-image","url(pics/AjudaPrincipal.png)")
	    }

	    $('#help').show()

	})

	


	


    /*************************************************************************************************************************/
    /*********************************************************MENU*********************************************************/
    /*************************************************************************************************************************/

    /*LISTA DE PRODUTOS*/
    function listaProdutos() {
        produtoS('budweiser', 'Budweiser', 'Budweiser', 2.00, 2.00)
        produtoS('cheers', 'Cheers', 'Cheers', 2.00, 2.00)
        produtoS('corona', 'Corona', 'Corona', 2.00, 2.00)
        produtoS('heineken', 'Heineken', 'Heineken', 2.00, 2.00)
        produtoS('sagres', 'Sagres', 'Sagres', 2.00, 2.00)
        produtoS('superBock', 'SuperBock', 'Super Bock', 2.00, 2.00)
        produtoS('caipirinha', 'Caipirinha', 'Caipirinha', 6.00, 6.00)
        produtoS('cosmopolitan', 'Cosmopolitan', 'Cosmopolitan', 6.00, 6.00)
        produtoS('manhattan', 'Manhattan', 'Manhattan', 6.00, 6.00)
        produtoS('margarita', 'Margarita', 'Margarita', 6.00, 6.00)
        produtoS('martini', 'Martini', 'Martini', 6.00, 6.00)
        produtoS('mojito', 'Mojito', 'Mojito', 6.00, 6.00);
        produtoS('morangoska', 'Morangoska', 'Morangoska', 6.00, 6.00)
        produtoS('pinaColada', 'PinaColada', 'Pina Colada', 6.00, 6.00)
        produtoS('vodkaLaranja', 'VodkaLaranja', 'Vodka Laranja', 6.00, 6.00)
        produtoS('gin', 'Gin', 'Gin', 6.00, 6.00)
        produtoS('vodkaRedBull', 'VodkaRedBull', 'Vodka RedBull', 6.00, 6.00)
        produtoS('rumCola', 'RumCola', 'Rum Cola', 6.00, 6.00)
        produtoS('7up', '7Up', '7 Up', 2.00, 2.00)
        produtoS('cocaCola', 'CocaCola', 'Coca Cola', 2.00, 2.00)
        produtoS('colaZero', 'ColaZero', 'Coca Cola Zero', 2.00, 2.00)
        produtoS('fantaAnanas', 'FantaAnanas', 'Fanta Ananás', 2.00, 2.00)
        produtoS('fantaLaranja', 'FantaLaranja', 'Fanta Laranja', 2.00, 2.00)
        produtoS('fantaUva', 'FantaUva', 'Fanta Uva', 2.00, 2.00)
        produtoS('guarana', 'Guarana', 'Guaraná', 2.00, 2.00)
        produtoS('pepsi', 'Pepsi', 'Pepsi', 2.00, 2.00)
        produtoS('pepsiTwist', 'PepsiTwist', 'Pepsi Twist', 2.00, 2.00)
        produtoS('sumolLaranja', 'SumolLaranja', 'Sumol Laranja', 2.00, 2.00)
        produtoS('sumolAnanas', 'SumolAnanas', 'Sumol Ananas', 2.00, 2.00)
        produtoS('amendoim', 'Amendoins', 'Amendoim', 1.20, 1.20)
        produtoS('batata', 'BatatasFritas', 'Batatas Fritas', 1.00, 1.00)
        produtoS('caju', 'Cajus', 'Cajus', 1.20, 1.20)
        produtoS('pistachio', 'Pistachios', 'Pistachios', 1.20, 1.20)
        produtoS('hamburguerSimples', 'HamburguerSimples', 'Hamburguer Simples', 2.50, 2.50)
        produtoS('hamburguerBacon', 'HamburguerBacon', 'Hamburguer Bacon', 3.50, 3.50)
        produtoS('hamburguerQueijo', 'HamburguerQueijo', 'Hamburguer Queijo', 3.00, 3.00)
        produtoS('hamburguerTudo', 'HamburguerTudo', 'Hamburguer Tudo', 4.00, 4.00)
        produtoS('cachorroSimples', 'CachorroSimples', 'Cachorro Simples', 2.50, 2.50)
        produtoS('cachorroTudo', 'CachorroTudo', 'Cachorro Tudo', 3.50, 3.50)
        produtoS('tostaFiambre', 'TostaFiambre', 'Tosta Fiambre', 2.00, 2.00)
        produtoS('tostaQueijo', 'TostaQueijo', 'Tosta Queijo', 2.00, 2.00)
        produtoS('tostaMista', 'TostaMista', 'Tosta Mista', 2.50, 2.50)
    }

    listaProdutos()

    /*BOTAO PARA ABRIR O MENU*/
    $('#divMenuButton').click(function () {
        
        $('#divConta').hide()
        if (menuAberto == 0) {
            if (musicasAberto == 1) {
                divMusicasActual.animate({ "height": "265" }, 500);
                divMusicasActual.animate({ "margin-top": "46" }, 500);
                divMusicasActual.toggle(efeitoMenu, efeitoMenuEsquerda, efeitoMenuDuracao, function () {
                    divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                    $('.sair').show()
                    if (total > 0)
                        $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                    menuAberto = 1
                    musicasAberto = 0
                    contaAberta = 0
                    $('#botaoMenu').text("Fechar")
                    $('.sair').show()

                })
                musicasAberto = 0
                divMusicasActual = $('#divMusicasPrincipal')
                $('#botaoMusicas').text("Músicas")
                $('.sairMusicas').hide()
            }
            

            else {
                if(contaAberta==0)
                    jukeboxMostra()
                divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                if (total > 0)
                    $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                menuAberto = 1
                musicasAberto = 0
                contaAberta = 0
                $('#botaoMenu').text("Fechar")
                $('.sair').show()
            }
        } else {
            jukeboxMostra()
            if (confirmado == 1) {
                $('#botaoOK').click()
                confirmado = 0
            }
            else {
                w = larguraMenu()
                $('.listaInner').css('width', w)
                divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                menuAberto = 0

                $('#confirmacao').hide()
                $('#confirmacaoRemover').hide()
                $('#confirmacaoCancelar').hide()

                if (apedir == 1) {
                    $('#divPedido').show()
                    apedir = 0
                }

                if (total > 0 || fecharPedido == 1) {
                    $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                    fecharPedido = 0
                    pedidoAberto = 0
                }
                divMenuActual = $('#divMenuPrincipal')
                $('#botaoMenu').text("Menu")
                $('.sair').hide()
            }
        }
    })
	
    /*BOTOES VOLTAR*/
    /*VOLTAR PRINCIPAL*/
    $('.voltarPrincipal').click(function () {
        var w = 136 * 2
        $('.listaInner').css('width', w)
        $('.sair').show()
        $('#divMenuPrincipal').show()
        $('#divMenuBebidas').hide()
        $('#divMenuComidas').hide()
        $('#bebidas').show()
        $('#comidas').show()
        $('.voltarPrincipal').hide()
		divMenuActual = $('#divMenuPrincipal')
    })

    /*VOLTAR BEBIDAS*/
    $('.voltarBebidas').click(function () {
        var w = 136 * 4
        $('.listaInner').css('width', w)
        $('.fechar').show()
        $('#divMenuCervejas').hide()
        $('#divMenuCocktails').hide()
        $('#divMenuLongDrinks').hide()
        $('#divMenuRefrigerantes').hide()
        $('#divMenuBebidas').show()
        $('.voltarBebidas').hide()
        $('.voltarPrincipal').show()
		divMenuActual = $('#divMenuBebidas')
    })

    /*VOLTAR COMIDAS*/
    $('.voltarComidas').click(function () {
        var w = 136 * 4
        $('.listaInner').css('width', w)
        $('.fechar').show()
        $('#divMenuAperitivos').hide()
        $('#divMenuCachorros').hide()
        $('#divMenuHamburguers').hide()
        $('#divMenuTostas').hide()
        $('#divMenuComidas').show()
        $('.voltarComidas').hide()
        $('.voltarPrincipal').show()
		divMenuActual = $('#divMenuComidas')
    })

    /*VOLTAR CONFIRMACAO*/
    $('#botaoVoltar').click(function () {
        $('#confirmacao').hide()
        $('#confirmacaoRemover').hide()
        $('#confirmacaoCancelar').hide()
        $('#divPedido').show()
    })

    /*OPCOES DO MENU*/
    /*BEBIDAS*/
    $('#bebidas').click(function () {
        var w = 136 * 4
        divMenuActual = $('#divMenuBebidas')
        $('.listaInner').css('width', w)
        $('#divMenuPrincipal').hide()
        $('#divMenuBebidas').show()
        $('.voltarPrincipal').show()
        $('.sair').show()
    })

    /*COMIDAS*/
    $('#comidas').click(function () {
        var w = 136 * 4
        divMenuActual = $('#divMenuComidas')
        $('.listaInner').css('width', w)
        $('#divMenuPrincipal').hide()
        $('#divMenuComidas').show()
        $('.voltarPrincipal').show()
        $('.sair').show()
    })

    /*CERVEJA*/
    $('#cerveja').click(function () {
        var w = 136 * 6
        divMenuActual = $('#divMenuCervejas')
        $('.listaInner').css('width', w)
        $('#divMenuBebidas').hide()
        $('#divMenuCervejas').show()
        $('.voltarPrincipal').hide()
        $('.voltarBebidas').show()
        $('.sair').show()
    })

    /*APERITIVOS*/
    $('#aperitivos').click(function () {
        var w = 136 * 4
        divMenuActual = $('#divMenuAperitivos')
        $('.listaInner').css('width', w)
        $('#divMenuComidas').hide()
        $('#divMenuAperitivos').show()
        $('.voltarPrincipal').hide()
        $('.voltarComidas').show()
        $('.sair').show()
    })

    /*HAMBURGUERS*/
    $('#hamburguers').click(function () {
        var w = 136 * 4
        divMenuActual = $('#divMenuHamburguers')
        $('.listaInner').css('width', w)
        $('#divMenuComidas').hide()
        $('#divMenuHamburguers').show()
        $('.voltarPrincipal').hide()
        $('.voltarComidas').show()
        $('.sair').show()
    })

    /*CACHORRO*/
    $('#cachorros').click(function () {
        var w = 136 * 2
        divMenuActual = $('#divMenuCachorros')
        $('.listaInner').css('width', w)
        $('#divMenuComidas').hide()
        $('#divMenuCachorros').show()
        $('.voltarPrincipal').hide()
        $('.voltarComidas').show()
        $('.sair').show()
    })

    /*TOSTAS*/
    $('#tostas').click(function () {
        var w = 136 * 3
        divMenuActual = $('#divMenuTostas')
        $('.listaInner').css('width', w)
        $('#divMenuComidas').hide()
        $('#divMenuTostas').show()
        $('.voltarPrincipal').hide()
        $('.voltarComidas').show()
        $('.sair').show()
    })

    /*COCKTAILS*/
    $('#cocktails').click(function () {
        var w = 136 * 8
        divMenuActual = $('#divMenuCocktails')
        $('.listaInner').css('width', w)
        $('#divMenuBebidas').hide()
        $('#divMenuCocktails').show()
        $('.voltarPrincipal').hide()
        $('.voltarBebidas').show()
        $('.sair').show()
    })

    /*LONG DRINKS*/
    $('#longDrinks').click(function () {
        var w = 136 * 4
        divMenuActual = $('#divMenuLongDrinks')
        $('.listaInner').css('width', w)
        $('#divMenuBebidas').hide()
        $('#divMenuLongDrinks').show()
        $('.voltarPrincipal').hide()
        $('.voltarBebidas').show()
        $('.sair').show()
    })

    /*REFRIGERANTES*/
    $('#refrigerantes').click(function () {
        var w = 136 * 11
        divMenuActual = $('#divMenuRefrigerantes')
        $('.listaInner').css('width', w)
        $('#divMenuBebidas').hide()
        $('#divMenuRefrigerantes').show()
        $('.voltarPrincipal').hide()
        $('.voltarBebidas').show()
        $('.sair').show()
    })

    /*OUTROS*/
    /*BOTAO PEDIR*/
    $('#botaoPedir').click(function () {
        $('#divTotal2').show()
        $('#confirmacao').show()
        $('#listaPedido').show()
        $('#divPedido').hide()
        $('#msgConfirmacao').hide()
        $('#botaoOK').hide()
        $('#botaoVoltar').show()
        apedir = 1
    })

    /*BOTAO CANCELAR - PARA CANCELAR O PEDIDO*/
    $('#botaoCancelar').click(function () {
        $('#confirmacaoCancelar').show()          
    })

    $('.botaoCancelarCancelar').click(function () {
        $('#confirmacaoCancelar').hide()
    })

    $('.botaoConfirmacaoCancelar').click(function () {
        $('#confirmacaoCancelar').hide()
        $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
        fecharPedido = 0
        pedidoAberto = 0
        
        $('#botaoOK').click()
        $('#botaoMenu').text("Menu")
    })

    /*BOTAO CONFIRMAR - PARA CONFIRMAR QUE O PEDIDO ESTA CORRECTO*/
    $('#botaoConfirmar').click(function () {
        $('#botaoConfirmar').hide()
        $('#listaConfirmacao').hide()
        $('#divTotal2').hide()
        $('#msgConfirmacao').show()
        $('#botaoVoltar').hide()
        $('#botaoOK').show()
        
        $('#pagarConta').show()
        $('#infoConta').remove()
        $('#listaConta').append('<span style = "text-decoration:underline;">' + npedido + 'º Pedido <span>')
        npedido++
        $('#listaConfirmacao > li').clone().appendTo('#listaConta')
        totalConta = totalConta + total
        $('#noTotalValorConta').text(totalConta.toPrecision(3))

        $('#listaConta').append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
        $('#listaConta').append('Valor: ' + total.toPrecision(3) + '€')
        $('#listaConta').append('<br> <br>')

        $('#conta').off()
        $('#divMenuButton').off()
        $('#divMusicasButton').off()

        confirmado = 1
        pedidoAberto = 0
        $('#listaPedido').empty()
        reiniciar()

    })

    /*BOTAO OK - PARA SAIR DA MENSAGEM DE PEDIDO EFECTUADO*/
    $('#botaoOK').click(function () {
        

        jukeboxMostra()
        $('#confirmacao').hide()
        $('#confirmacaoRemover').hide()
        $('#confirmacaoCancelar').hide()
        $('#botaoConfirmar').show()
        $('#listaConfirmacao').show()
        $('#divTotal').show()
        $('.sair').hide()
        $('.voltarPrincipal').hide()
        $('.voltarBebidas').hide()
        $('.voltarComidas').hide()
        $('#divJukebox').show()
        divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
        divMenuActual = $('#divMenuPrincipal')
        $('#botaoMenu').text("Menu")

       


        $('#listaPedido').empty()
        reiniciar()
        confirmado = 0
        menuAberto = 0
        pedidoAberto = 0
        apedir = 0
        $('#pagarConta').show()

        $('#conta').off()
        $('#divMenuButton').off()
        $('#divMusicasButton').off()
        $('#divMusicasButton').click(function () {
            $('#divConta').hide()

            var w = 136 * 4
            if (musicasAberto == 0) {

                /*fecha o menu*/
                if (menuAberto == 1) {
                    if (confirmado == 1) {
                        $('#botaoOK').click()
                        confirmado = 0
                    }
                    else {
                        w = larguraMenu()
                        $('.listaInner').css('width', w)
                        divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                        menuAberto = 0

                        $('#confirmacao').hide()
                        $('#confirmacaoRemover').hide()
                        $('#confirmacaoCancelar').hide()
                        if (apedir == 1) {
                            $('#divPedido').show()
                            apedir = 0
                        }
                        if (total > 0 || fecharPedido == 1) {
                            $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                            fecharPedido = 0
                            pedidoAberto = 0
                        }
                        divMenuActual = $('#divMenuPrincipal')
                        $('#botaoMenu').text("Menu")
                        $('.sair').hide()
                    }
                }
                else
                    jukeboxMostra()
                $('.listaInner').css('width', w)
                divMusicasActual.toggle(efeitoMenu, efeitoMenuEsquerda, efeitoMenuDuracao)
                divMusicasActual.animate({ "margin-top": "8" }, 500);
                divMusicasActual.animate({ "height": "510" }, 500);

                $('.divMusicasSeguintes').hide()
                $('#divMusicasInfo').hide()
                $('#voltarMenuMusica').hide()
                $('#divJukebox').show()
                $('#divMusicasInfo').hide()
                $('#voltarMenuMusica').hide()

                $('#electronicaTitulo').hide()
                $('#listaElectronica').hide()

                $('#rockTitulo').hide()
                $('#listaRock').hide()

                $('#80sTitulo').hide()
                $('#lista80s').hide()

                $('#musicasTitulo').show()
                $('#listaGeneros').show()
                $('.sairMusicas').show()
                $('#divJukebox').hide()
                $('#house').show()
                $('.divMusicasSeguintes').show()
                musicasAberto = 1
                menuAberto = 0
                contaAberta = 0
                $('#botaoMusicas').text("Fechar")
                $('.sairMusicas').show()
            } else {
                jukeboxMostra()
                divMusicasActual.animate({ "height": "265" }, 500);
                divMusicasActual.animate({ "margin-top": "46" }, 500);
                divMusicasActual.toggle(efeitoMenu, efeitoMenuEsquerda, efeitoMenuDuracao)
                musicasAberto = 0
                divMusicasActual = $('#divMusicasPrincipal')
                $('#botaoMusicas').text("Músicas")
                $('.sairMusicas').hide()
            }
        })

        $('#divMenuButton').click(function () {

            $('#divConta').hide()
            if (menuAberto == 0) {
                if (musicasAberto == 1) {
                    divMusicasActual.animate({ "height": "265" }, 500);
                    divMusicasActual.animate({ "margin-top": "46" }, 500);
                    divMusicasActual.toggle(efeitoMenu, efeitoMenuEsquerda, efeitoMenuDuracao, function () {
                        divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                        $('.sair').show()
                        if (total > 0)
                            $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                        menuAberto = 1
                        musicasAberto = 0
                        contaAberta = 0
                        $('#botaoMenu').text("Fechar")
                        $('.sair').show()

                    })
                    musicasAberto = 0
                    divMusicasActual = $('#divMusicasPrincipal')
                    $('#botaoMusicas').text("Músicas")
                    $('.sairMusicas').hide()
                }


                else {
                    if (contaAberta == 0)
                        jukeboxMostra()
                    divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                    if (total > 0)
                        $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                    menuAberto = 1
                    musicasAberto = 0
                    contaAberta = 0
                    $('#botaoMenu').text("Fechar")
                    $('.sair').show()
                }
            } else {
                jukeboxMostra()
                if (confirmado == 1) {
                    $('#botaoOK').click()
                    confirmado = 0
                }
                else {
                    w = larguraMenu()
                    $('.listaInner').css('width', w)
                    divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                    menuAberto = 0

                    $('#confirmacao').hide()
                    $('#confirmacaoRemover').hide()
                    $('#confirmacaoCancelar').hide()

                    if (apedir == 1) {
                        $('#divPedido').show()
                        apedir = 0
                    }

                    if (total > 0 || fecharPedido == 1) {
                        $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                        fecharPedido = 0
                        pedidoAberto = 0
                    }
                    divMenuActual = $('#divMenuPrincipal')
                    $('#botaoMenu').text("Menu")
                    $('.sair').hide()
                }
            }
        })

        $('#conta').click(function () {

            if (contaAberta == 0) {
                if (menuAberto == 1) {
                    if (confirmado == 1) {
                        $('#botaoOK').click()
                        confirmado = 0
                    }
                    else {
                        w = larguraMenu()
                        $('.listaInner').css('width', w)
                        divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao, function () {
                            $('#divConta').show()
                            contaAberta = 1
                        })
                        menuAberto = 0

                        $('#confirmacao').hide()
                        $('#confirmacaoRemover').hide()
                        $('#confirmacaoCancelar').hide()
                        if (apedir == 1) {
                            $('#divPedido').show()
                            apedir = 0
                        }
                        if (total > 0 || fecharPedido == 1) {
                            $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
                            fecharPedido = 0
                            pedidoAberto = 0
                        }
                        divMenuActual = $('#divMenuPrincipal')
                        $('#botaoMenu').text("Menu")
                        $('.sair').hide()

                    }
                }

                else if (musicasAberto == 1) {
                    divMusicasActual.animate({ "height": "265" }, 500);
                    divMusicasActual.animate({ "margin-top": "46" }, 500);
                    divMusicasActual.toggle(efeitoMenu, efeitoMenuEsquerda, efeitoMenuDuracao, function () {
                        $('#divConta').show()
                        contaAberta = 1
                    })
                    musicasAberto = 0
                    divMusicasActual = $('#divMusicasPrincipal')
                    $('#botaoMusicas').text("Músicas")
                    $('.sairMusicas').hide()
                }



                else {
                    jukeboxMostra()
                    $('#divConta').show()
                    contaAberta = 1
                }

                if (totalConta == 0) {
                    $('#infoConta').remove()
                    $('#listaConta').append('<p id="infoConta" style="margin-top:3px; margin-left:25px">Sem produtos por pagar!</p>')

                }
            } else {
                jukeboxMostra()
                $('#divConta').hide()
                contaAberta = 0
            }

        })
    })


    /*FUNCOES*/   
    /*INICIALIZA PRODUTOS.*/
    function produtoS(nome, Nome, nomeCerto, precoBase, preco) {
        criaNomeProduto[nome] = criaProduto(nome, nomeCerto)
        produto[nome] = 0
        produtoPrecoBase[nome] = precoBase
        /*preço acumulado de varias unidades do produto*/
        produtoPreco[nome] = preco
        produtoNome[nome] = Nome
        produtoNomeCerto[nome] = nomeCerto
    }

    /*NOVO PRODUTO*/
    function novoProduto(nome, Nome, NomeCerto) {
        if (pedidoAberto == 0 && total == 0) {
            if ($('#divPedido').is(":hidden")) {
                $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
            }
            pedidoAberto = 1		
        }

      
        $('#divPedidoIn').show()
        $('#divPedidoVazio').hide()
        $('#listaPedidoVazio').empty()

        /*click 1ª vez*/
        if (produto[nome] == 0) {
            $('#listaPedido').append(criaNomeProduto[nome])
            produto[nome]++
            total = total + produtoPrecoBase[nome]
            $('#listaConfirmacao').append('<li style="list-style-type:none" id="confirm' + Nome + '">' + produto[nome] + ' x ' + NomeCerto + '' + '</li>')
			$('.noTotalValor').text(total.toPrecision(3))
			$('#' + nome + 'Count').text(produto[nome])
            $('#' + nome + 'Preco').text(produtoPreco[nome].toPrecision(3) + '€')
            $('#' + nome + '').css("border", "3px solid green")
            $('#botaoPedir').show()
        }
        /*click 2ª vez*/
        else {
            if (produto[nome] > 1) {
                $('#mensagemConfirmacaoRemover').text( "Vai remover " + produto[nome] + " x " + NomeCerto + ". Tem a certeza?")
                $('#confirmacaoRemover').show()

                $('.botaoCancelarRemover').click(function () {
                    $('#confirmacaoRemover').hide()
                })

                $('.botaoConfirmacaoRemover').click(function () {
                    $('#confirmacaoRemover').hide()
                    total = total - produtoPreco[nome]
                    produto[nome] = 0
                    produtoPreco[nome] = produtoPrecoBase[nome]
                    removeP(Nome, nome, total)
                    if (total == 0) {
                        fecharPedido = 1
                        $('#divPedidoIn').hide()
                        $('#divPedidoVazio').show()
                        $('#listaPedidoVazio').empty()
                        $('#listaPedidoVazio').append('<p style="margin-top:3px; margin-left:25px">Não tem nenhum produto seleccionado!</p>')

                    }
                })
               
            } else {
                total = total - produtoPreco[nome]
                produto[nome] = 0
                produtoPreco[nome] = produtoPrecoBase[nome]
                removeP(Nome, nome, total)
                if (total == 0) {
                    fecharPedido = 1
                    $('#divPedidoIn').hide()
                    $('#divPedidoVazio').show()
                    $('#listaPedidoVazio').empty()
                    $('#listaPedidoVazio').append('<p style="margin-top:3px; margin-left:25px">Não tem nenhum produto seleccionado!</p>')
                }
            }
        }

        /*+ adiciona mais um*/
        $('#' + nome + 'Mais').click(function () {
            if (produto[nome] < 99) {
                produto[nome]++

                produtoPreco[nome] = produtoPreco[nome] + produtoPrecoBase[nome]
                total = total + produtoPrecoBase[nome]
                $('#confirm' + Nome).remove()
                $('#listaConfirmacao').append('<li style="list-style-type:none" id="confirm' + Nome + '">' + produto[nome] + ' x ' + Nome + '' + '</li>')
                $('.noTotalValor').text(total.toPrecision(3))
                $('#' + nome + 'Count').text(produto[nome])
                if (produto[nome] == 10)
                    $('#' + nome + 'Count').css("margin-left", "-=9")
                $('#' + nome + 'Preco').text(produtoPreco[nome].toPrecision(3) + '€')
            }
        })

        /*- retira um*/
        $('#' + nome + 'Menos').unbind('click')
        $('#' + nome + 'Menos').click(function () {

            if (produtoPreco[nome] > produtoPrecoBase[nome]) {
                produtoPreco[nome] = produtoPreco[nome] - produtoPrecoBase[nome]
                total = total - produtoPrecoBase[nome]
            }
            if (produto[nome] > 1)
                produto[nome]--
            else {
                $('#mensagemConfirmacaoRemover').text("Vai remover " + produto[nome] + " x " + NomeCerto + ". Tem a certeza?")
                $('#confirmacaoRemover').show()

                $('.botaoCancelarRemover').click(function () {
                    $('#confirmacaoRemover').hide()
                })

                $('.botaoConfirmacaoRemover').click(function () {
                    $('#confirmacaoRemover').hide()
                    total = total - produtoPreco[nome]
                    produto[nome] = 0
                    produtoPreco[nome] = produtoPrecoBase[nome]
                    removeP(Nome, nome, total)
                    if (total == 0) {
                        fecharPedido = 1
                        $('#divPedidoIn').hide()
                        $('#divPedidoVazio').show()
                        $('#listaPedidoVazio').empty()
                        $('#listaPedidoVazio').append('<p style="margin-top:3px; margin-left:25px">Não tem nenhum produto seleccionado!</p>')

                    }
                })
            }
            if (total == 0) {
                fecharPedido = 1
                $('#divPedidoIn').hide()
                $('#divPedidoVazio').show()
                $('#listaPedidoVazio').append('<p style="margin-top:3px; margin-left:25px">Não tem nenhum produto seleccionado!</p>')
            }
            $('#confirm' + Nome + '').remove()
            $('#listaConfirmacao').append('<li style="list-style-type:none" id="confirm' + Nome + '">' + produto[nome] + ' x ' + Nome + '' + '</li>')
            $('.noTotalValor').text(total.toPrecision(3))
            $('#' + nome + 'Count').text(produto[nome])
            if (produto[nome] == 9)
                $('#' + nome + 'Count').css("margin-left", "+=9")
            $('#' + nome + 'Preco').text(produtoPreco[nome].toPrecision(3) + '€')

        })
        /*X remove*/
        $('#' + nome + 'Remove').unbind('click')
        $('#' + nome + 'Remove').click(function () {
            if (produto[nome] > 1) {
                $('#mensagemConfirmacaoRemover').text("Vai remover " + produto[nome] + " x " + NomeCerto + ". Tem a certeza?")
                $('#confirmacaoRemover').show()

                $('.botaoCancelarRemover').click(function () {
                    $('#confirmacaoRemover').hide()
                })

                $('.botaoConfirmacaoRemover').click(function () {
                    $('#confirmacaoRemover').hide()
                    total = total - produtoPreco[nome]
                    produto[nome] = 0
                    produtoPreco[nome] = produtoPrecoBase[nome]
                    removeP(Nome, nome, total)
                    if (total == 0) {
                        fecharPedido = 1
                        $('#divPedidoIn').hide()
                        $('#divPedidoVazio').show()
                        $('#listaPedidoVazio').empty()
                        $('#listaPedidoVazio').append('<p style="margin-top:3px; margin-left:25px">Não tem nenhum produto seleccionado!</p>')

                    }
                })
            } else {
                total = total - produtoPreco[nome]
                produto[nome] = 0
                produtoPreco[nome] = produtoPrecoBase[nome]
                removeP(Nome, nome, total)
                if (total == 0) {
                    fecharPedido = 1
                    $('#divPedidoIn').hide()
                    $('#divPedidoVazio').show()
                    $('#listaPedidoVazio').append('<p style="margin-top:3px; margin-left:25px">Não tem nenhum produto seleccionado!</p>')
                }
            }
        })
    }

    /*CRIA NOVO PRODUTO*/
    function criaProduto(id, nomeProduto) {
        var produto = '<li id="' + id + 'Lista" style="list-style-type:none"<div><div class="naLista" id="' + id + 'Menos"><img style="width:15px; height:15px" src="pics/menos.jpg" /></div><div id="' + id + 'Count" class="naLista"></div><div class="naLista" id="' + id + 'Mais"><img style="width:15px; height:15px" src="pics/mais.jpg"/></div><div class="naListaProduto"">' + nomeProduto + '</div><div id="' + id + 'Preco" class="naLista"></div><div class="naLista" style="color:red" id="' + id + 'Remove"><img style="width:15px; height:15px" src="pics/remover.jpg"/></div></div></li>';
        return produto
    }

    /*INSERE PRODUTO NA LISTA*/
    $('.produtoLista').unbind('click');
    $('.produtoLista').click(function () {
        novoProduto(this.id, produtoNome[this.id], produtoNomeCerto[this.id])
    })

    /*REMOVE PRODUTO*/
    function removeP(confirm, id, totalPedido) {
        $('#confirm' + confirm).remove()
		$('.noTotalValor').text(totalPedido.toPrecision(3))
        $('#' + id).css("border", "3px solid transparent")
        $('#' + id + 'Lista').remove()
        if ($('#listaPedido').is(':empty'))
            total = 0
    }

    /*REINICIAR PRODUTOS*/
    function reiniciar() {
        criaNomeProduto.splice(0, criaNomeProduto.length)
        produto.splice(0, produto.length)
        produtoPrecoBase.splice(0, produtoPrecoBase.length)
        produtoPreco.splice(0, produtoPreco.length)
        produtoNome.splice(0, produtoNome.length)
        produtoNomeCerto.splice(0, produtoNomeCerto.length)

        listaProdutos()
        $('.noTotalValor').text('0.00')
        total = 0
        $('.produtoLista').css("border", "3px solid transparent")
        $('#listaPedido').empty()
        $('#listaConfirmacao').empty()
    }

	

/*************************************************************************************************************************/  
/*********************************************************MUSICAS*********************************************************/
/*************************************************************************************************************************/

    /*LISTA DE MUSICAS*/
    function listaProdutosMusica() {
		produtoM('reflektor', 'Reflektor', 'Reflektor','Arcade Fire',9,0)
		produtoM('getLucky', 'Get Lucky', 'Get Lucky','Daft Punk feat Pharrell',10,0)
		produtoM('noBeef', 'No Beef', 'No Beef','Steve Aoki',2,0)
		produtoM('spaceman','Spaceman','Spaceman','Hardwell',0,0)
		produtoM('youMake', 'You Make Me', 'You Make Me','Avicii',3,0)
		produtoM('playHard', 'Play Hard', 'Play Hard','David Guetta',11,0)
		produtoM('animals', 'Animals', 'Animals','Martin Garrix',2,0)
		produtoM('safeAndSound', 'Safe And Sound', 'Safe And Sound', 'Capital Cities', 11, 0)
		produtoM('plug', 'Plug In Baby', 'Plug In Baby', 'Muse', 7, 0)
		produtoM('radioactive', 'Radioactive', 'Radioactive','Imagine Dragons',0,0)
		produtoM('sail', 'Sail', 'Sail','Awolnation',4,0)
		produtoM('team', 'Team', 'Team', 'Lorde', 1, 0)
		produtoM('spin', 'You Spin Me Round', 'You Spin Me Round', 'Dead or Alive', 1, 0)
		produtoM('timeAfterTime', 'Time After Time', 'Time After Time', 'Cyndi Lauper', 1, 0)
		produtoM('dontYou', 'Dont You', 'Dont You', 'Simple Minds', 1, 0)
		$('.musicasLista').sort(sortEm).prependTo($('.listaPedidoMusica'))
		
    }
    
    listaProdutosMusica()
	
    /*BOTAO PARA ABRIR AS MUSICAS*/
    $('#divMusicasButton').click(function () {
        $('#divConta').hide()
        genero = 0
		var w = 136 * 4
		if (musicasAberto == 0) {

		    /*fecha o menu*/
		    if (menuAberto == 1) {
		        if (confirmado == 1) {
		            $('#botaoOK').click()
		            confirmado = 0
		        }
		        else {		            
                    w = larguraMenu()
		            $('.listaInner').css('width', w)
		            divMenuActual.toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
		            menuAberto = 0		       
		        
		            $('#confirmacao').hide()
		            $('#confirmacaoRemover').hide()
		            $('#confirmacaoCancelar').hide()
		            if (apedir == 1) {
		                $('#divPedido').show()
		                apedir = 0
		            }
		            if (total > 0 || fecharPedido == 1) {
		                $('#divPedido').toggle(efeitoMenu, efeitoMenuDireita, efeitoMenuDuracao)
		                fecharPedido = 0
		                pedidoAberto = 0
		            }
		            divMenuActual = $('#divMenuPrincipal')
		            $('#botaoMenu').text("Menu")
		            $('.sair').hide()
		        }
		    }
		    else
                if(contaAberta==0)
		            jukeboxMostra()
		    $('.listaInner').css('width', w)
			divMusicasActual.toggle(efeitoMenu, efeitoMenuEsquerda, efeitoMenuDuracao)
			divMusicasActual.animate({ "margin-top": "8" }, 500);
			divMusicasActual.animate({ "height": "510" }, 500);
			
			$('.divMusicasSeguintes').hide()
			$('#divMusicasInfo').hide()
			$('#voltarMenuMusica').hide()
			$('#divJukebox').show()
			$('#divMusicasInfo').hide()
			$('#voltarMenuMusica').hide()

			$('#electronicaTitulo').hide()
			$('#listaElectronica').hide()

			$('#rockTitulo').hide()
			$('#listaRock').hide()

			$('#80sTitulo').hide()
			$('#lista80s').hide()

			$('#musicasTitulo').show()
			$('#listaGeneros').show()
			$('.sairMusicas').show()
			$('#divJukebox').hide()
			$('#house').show()
			$('.divMusicasSeguintes').show()
			musicasAberto = 1
			menuAberto = 0
			contaAberta = 0
			$('#botaoMusicas').text("Fechar")
			$('.sairMusicas').show()
		} else {
		    jukeboxMostra()
		    divMusicasActual.animate({ "height": "265" }, 500);
		    divMusicasActual.animate({ "margin-top": "46" }, 500);
		    divMusicasActual.toggle(efeitoMenu, efeitoMenuEsquerda, efeitoMenuDuracao)
		    musicasAberto = 0
		    divMusicasActual = $('#divMusicasPrincipal')
		    $('#botaoMusicas').text("Músicas")
		    $('.sairMusicas').hide()
		}
    })

/*BOTOES VOLTAR*/
    /*VOLTAR MENUS MUSICAS*/
    $('#voltarMenuMusica').click(function () {
		divMusicasActual = $('#divMusicasPrincipal')
        $('#divMusicasInfo').hide()
        $('#voltarMenuMusica').hide()

        $('#electronicaTitulo').hide()
        $('#listaElectronica').hide()

		$('#rockTitulo').hide()
		$('#listaRock').hide()

		$('#80sTitulo').hide()
		$('#lista80s').hide()

		$('#musicasTitulo').show()
		$('#listaGeneros').show()
		genero = 0
    })

    $('#electronica').click(function () {
        var w = 136 * 5
        genero = 1
		$('.listaInner').css('width', w)
		$('#voltarMenuMusica').show()
        $('#musicasTitulo').hide()
		$('#listaGeneros').hide()
		$('#electronicaTitulo').show()
		$('#listaElectronica').show()
        $('.sairMusicas').show()
        $('#divJukebox').hide()
        $('.voltarPrincipalMusica').show()
        
    })
    $('#rock').click(function () {
        genero = 1
        var w = 136 * 5
		$('.listaInner').css('width', w)
        $('.sairMusicas').show()
        $('#divJukebox').hide()
        $('#musicasTitulo').hide()
		$('#listaGeneros').hide()
		$('#rockTitulo').show()
		$('#listaRock').show()
		$('#voltarMenuMusica').show()
		$('.voltarPrincipalMusica').show()
        
	})

    $('#80s').click(function () {
        genero = 1
	    var w = 136 * 4
	    $('.listaInner').css('width', w)
	    $('.sairMusicas').show()
	    $('#divJukebox').hide()
	    $('#musicasTitulo').hide()
	    $('#listaGeneros').hide()
	    $('#80Titulo').show()
	    $('#lista80s').show()
	    $('#voltarMenuMusica').show()
	    $('.voltarPrincipalMusica').show()

	})

/*OUTROS*/
   
/*FUNCOES*/
    /*INICIALIZA MUSICAS.*/
	function produtoM(nome, Nome, nomeCerto, nomeArtista, votos, clicadoo) {
	    produtoMusica[nome] = votos
	    totalVotos = totalVotos + votos
	    /*preço acumulado de varias unidades do produto*/
	    produtoNome[nome] = Nome
	    produtoNomeCerto[nome] = nomeCerto
	    produtoNomeArtista[nome] = nomeArtista
	    clicado[nome] = clicadoo
	    votou[nome] = 0
		criado[nome] = 0
	    criaNomeProduto[nome] = criaMusica(nome, Nome)

	    if (clicado[nome] == 0) {
	        $("#divMusicasInfo").append('<div id="' + nome + 'Votos"></div>')
	        $('#' + nome + 'Votos').addClass("votos")
	        $('#' + nome + 'Votos').css('font-size', '50px')
	        $('#' + nome + 'Votos').css('font-size', '50px')
	        $('#' + nome + 'Votos').css('position', 'absolute')
	        $('#' + nome + 'Votos').css('background-color', 'white')
	        $('#' + nome + 'Votos').css('width', '80px')
	        $('#' + nome + 'Votos').css('height', '80px')
	        $('#' + nome + 'Votos').css('margin-top', '190px')
	        $('#' + nome + 'Votos').css('margin-left', '15px')
	        $('#' + nome + 'Votos').text(produtoMusica[nome])

	        $('#divMusicasInfo').append('<button id="' + nome + 'votar">Votar</button>')
	        $('#' + nome + 'votar').addClass("votar")
	        $('#' + nome + 'votar').css('position', 'absolute')
            $('#' + nome + 'removerVoto').css('display', 'block')
	        $('#' + nome + 'votar').css('float', 'left')
	        $('#' + nome + 'votar').css('margin-left', '30px')
	        $('#' + nome + 'votar').css('margin-top', '150px')

	        $('#divMusicasInfo').append('<button id="' + nome + 'removerVoto">Remover Voto</button>')
	        $('#' + nome + 'removerVoto').addClass("removerVoto")
	        $('#' + nome + 'removerVoto').css('position', 'absolute')
	        $('#' + nome + 'removerVoto').css('display', 'block')
	        $('#' + nome + 'removerVoto').css('float', 'left')
	        $('#' + nome + 'removerVoto').css('margin-left', '4px')
	        $('#' + nome + 'removerVoto').css('margin-top', '150px')
	        clicado[nome] = 1
	    }
	    $('.listaPedidoMusica').append(criaNomeProduto[nome])

	    $('#' + nome + 'Count').text(produtoMusica[nome])

	    $('#' + nome + 'Votar').click(function () {
            
	        $('.listaPedidoMusica').show()
	        $('.listaAleatorio').hide()
	        votou[nome] = 1
	        produtoMusica[nome]++
	        totalVotos = totalVotos + 1
	        $('#' + nome + 'Count').text(produtoMusica[nome])
	        $('#' + nome + 'Votos').text(produtoMusica[nome])
	        $('.musicasLista').sort(sortEm).prependTo($('.listaPedidoMusica'));
	        $('#' + nome + 'RemoverVoto').show()
	        $('#' + nome + 'Votar').hide()
	        if (musicaInfoAberto == nome) {
	            $('#' + nome + 'removerVoto').show()
	            $('#' + nome + 'votar').hide()
	        }
	    })

	    $('#' + nome + 'RemoverVoto').click(function () {
	        
	        votou[nome] = 0
	        produtoMusica[nome]--
	        totalVotos = totalVotos - 1
	        if (totalVotos == 0) {
	            $('.listaPedidoMusica').hide()
	            $('.listaAleatorio').show()
	        }

	        $('#' + nome + 'Count').text(produtoMusica[nome])
	        $('#' + nome + 'Votos').text(produtoMusica[nome])
	        $('.musicasLista').sort(sortEm).prependTo($('.listaPedidoMusica'));
	        $('#' + nome + 'RemoverVoto').hide()
	        $('#' + nome + 'Votar').show()
	        if (musicaInfoAberto == nome) {
	            $('#' + nome + 'removerVoto').hide()
	            $('#' + nome + 'votar').show()
	        }
	        if (produtoMusica[nome] === 0)
	            $('#' + nome + 'Lista').hide()
	    })
		


	}

    /*NOVA MUSICA*/
	function novoMusica(nome, Nome, NomeCerto, NomeArtista) {
	    $('#' + nome + 'Votos').css('background-color','transparent')
	    $("#musicaPic").empty()
	    $(".votos").hide()
	    $(".votar").hide()
	    $(".removerVoto").hide()

        musicaInfoAberto = nome

	    $("#musicaArtista").empty()
	    $("#musicaNome").empty()
	    $("#artistaInfo").empty()

	    $("#musicaPic").prepend('<img style="width:100%; height:100%" src="pics/' + nome + '.jpg" />')
	    $("#musicaArtista").append(NomeArtista)
	    $("#musicaNome").append(NomeCerto)
	    $("#artistaInfo").prepend('<img style="width:100%; height:auto" src="pics/' + NomeArtista + 'Info.jpg" />')

	    if (votou[nome] == 1)
	        $('#' + nome + 'removerVoto').show()
	        
	    else 
	        $('#' + nome + 'votar').show()

	    

	    $('#' + nome + 'Votos').show()

	    /*vota*/
	    $('#' + nome + 'votar').unbind('click');
	    $('#' + nome + 'votar').click(function () {
	        $('.listaPedidoMusica').show()
	        $('.listaAleatorio').hide()
	        votou[nome] = 1
	        produtoMusica[nome]++
	        totalVotos = totalVotos + 1
	        $('#' + nome + 'Count').text(produtoMusica[nome])
	        $('#' + nome + 'Votos').text(produtoMusica[nome])	        
	        $('#' + nome + 'votar').hide()
	        $('#' + nome + 'Votar').hide()
	        $('#' + nome + 'removerVoto').show()
	        $('#' + nome + 'RemoverVoto').show()
	        $('.musicasLista').sort(sortEm).prependTo($('.listaPedidoMusica'));
	        $('#' + nome + 'Lista').show()
	    })
	    $('#' + nome + 'removerVoto').unbind('click');
	    $('#' + nome + 'removerVoto').click(function () {
	        if ($('.listaPedidoMusica > li').first().is(":hidden")) {
	            $('.listaPedidoMusica').hide()
	            $('.listaAleatorio').show()
	        }
	        votou[nome] = 0

	        produtoMusica[nome]--
	        totalVotos = totalVotos - 1
	        if (totalVotos == 0) {
	            $('.listaPedidoMusica').hide()
	            $('.listaAleatorio').show()
	        }
	        
	        $('#' + nome + 'Count').text(produtoMusica[nome])
	        $('#' + nome + 'Votos').text(produtoMusica[nome])        
	        $('#' + nome + 'removerVoto').hide()
	        $('#' + nome + 'RemoverVoto').hide()
	        $('#' + nome + 'Votar').show()
	        $('#' + nome + 'votar').show()
	        $('.musicasLista').sort(sortEm).prependTo($('.listaPedidoMusica'));
	        if (produtoMusica[nome] == 0)

	            $('#' + nome + 'Lista').hide()
	    })
	}

    /*INSERE PRODUTO NA LISTA DE A TOCAR*/
	$('.musicaLista').click(function () {
	    $('#divMusicasInfo').show()
	    novoMusica(this.id, produtoNome[this.id], produtoNomeCerto[this.id], produtoNomeArtista[this.id])
	})

    /*CRIA NOVA MUSICA*/
	function criaMusica(id, nomeProduto) {
	    if (produtoMusica[id] === 0){
	        var musica = '<li id="' + id + 'Lista" class="musicasLista" style="list-style-type:none; height:30px; display:none"<div></div><div class="naListaProduto"">' + nomeProduto + '</div></div><div class="naLista" style="width:13px"><span id="' + id + 'Count"></span></div><div class="naLista" id="' + id + 'Votar" style="margin-top:-6px"><button id="votar">Votar</button></div><div class="naLista" id="' + id + 'RemoverVoto" style="margin-top:-6px"><button id="removerVoto">Remover Voto</button></div></div></li>'
			
	    } else
	        var musica = '<li id="' + id + 'Lista" class="musicasLista" style="list-style-type:none; height:30px"<div></div><div class="naListaProduto"">' + nomeProduto + '</div></div><div class="naLista" style="width:13px"><span id="' + id + 'Count"></span></div><div class="naLista" id="' + id + 'Votar" style="margin-top:-6px"><button id="votar">Votar</button></div><div class="naLista" style="color:red; display:none" id="' + id + 'RemoverVoto" ><button id="removerVoto" style="margin-top:-6px">Remover Voto</button></div></div></li>'

        numeroMusicas++
	    return musica
	}

    /*REINICIAR*/
	function reiniciarMusicas() {
	    criaNomeProduto.splice(0, criaNomeProduto.length)
	    produto.splice(0, produto.length)
	    produtoPrecoBase.splice(0, produtoPrecoBase.length)
	    produtoPreco.splice(0, produtoPreco.length)
	    produtoNome.splice(0, produtoNome.length)
	    produtoNomeCerto.splice(0, produtoNomeCerto.length)

	    listaProdutosMusica()
	    total = 0
	    $('.produtoLista').css("border", "3px solid transparent")
	    $('#listaPedido').empty()
	    $('#listaConfirmacao').empty()
	}

    /*FUNCAO SORT - MUSICAS EM ORDEM DECRESCENTE DE VOTOS*/
	function sortEm(a, b) {
	    return parseInt($('span', a).text()) < parseInt($('span', b).text()) ? 1 : -1;
	}
	
	function removeRepetidos(id){
		/*var i = 0;
		while(i < 2){
			if(($('#'+id+'Count').text())==0){
				$('#'+id+'Lista').hide();
				i++;
			}
		}*/
	}









    /*LARGURAS*/

	function larguraMenu() {
	    var w = 0
	    var divActual = divMenuActual.attr('id');

	    switch(divActual)
	    {
	        case 'divMenuCervejas':
	            w = 136 * 6
	            break;
	        case 'divMenuCocktails':
	            w = 136 * 8
	            break;
	        case 'divMenuRefrigerantes':
	            w = 136 * 11
	            break;
	        default:
	            w = 136 * 4
	            break;
	    }
	    
        return w
	}

	window.onload = function () {

	    (function () {
	        var counter = 15;

	        setInterval(function () {
	            counter--;
	            if (counter >= 0) {
	                if (counter >= 10) {
	                    $('.timerN').text('00:')
	                }

	                if (counter < 10) {
	                    $('.timerN').text('00:0')
	                }
	                span = document.getElementById("count");
	                span.innerHTML = counter;
	                spann = document.getElementById("count2");
	                spann.innerHTML = counter;
	            }

	            if (counter === -1) {
	                $('.timerN').text('00:')
	                $('#count').text('15')
	                $('#count2').text('15')
	                counter = 15
                    trocaMusica()
	            }

	        }, 1000);

	    })();

	}


	function trocaMusica() {
	    var proxMusica = $('.listaPedidoMusica > li').first().attr('id').replace('Lista', '');
	    

	    if (totalVotos == 0) {        
	        if (i == totalMusicas)
                i = 1

	        if(proxMusica.localeCompare($('.listaPedidoMusica > li:nth-child(' + i + ')').attr('id').replace('Lista', '')) == 0) {
	            i++;
	        }
	        proxMusica = $('.listaPedidoMusica > li:nth-child(' + i + ')').attr('id').replace('Lista', '')

	        $('.musicaToca').text(produtoNomeArtista[proxMusica] + ' - ' + produtoNomeCerto[proxMusica])
	        $('#musicaTocaSom').attr('src', 'music/' + proxMusica + '.mp3')
	        $('#musicaFundo').load()
	        $('.cover').attr('src', 'pics/' + proxMusica + '.jpg')

	        totalVotos = totalVotos - produtoMusica[proxMusica]
	        produtoMusica[proxMusica] = 0

	        $('#' + proxMusica + 'Count').text(produtoMusica[proxMusica])
	        $('#' + proxMusica + 'Votos').text(produtoMusica[proxMusica])

	        $('.musicasLista').sort(sortEm).prependTo($('.listaPedidoMusica'))
	        $('#' + proxMusica + 'Lista').hide()
        
            i++
	    }
	    else {
	        $('.musicaToca').text(produtoNomeArtista[proxMusica] + ' - ' + produtoNomeCerto[proxMusica])
	        $('#musicaTocaSom').attr('src','music/'+ proxMusica + '.mp3')
	        $('#musicaFundo').load()
	        $('.cover').attr('src', 'pics/' + proxMusica + '.jpg')

	        totalVotos = totalVotos - produtoMusica[proxMusica]
	        produtoMusica[proxMusica] = 0

	        votou[proxMusica] = 0
	        $('#' + proxMusica + 'Count').text(produtoMusica[proxMusica])
	        $('#' + proxMusica + 'Votos').text(produtoMusica[proxMusica])
	        $('#' + proxMusica + 'RemoverVoto').hide()
	        $('#' + proxMusica + 'removerVoto').hide()
	        $('#' + proxMusica + 'Votar').show()
	        $('.musicasLista').sort(sortEm).prependTo($('.listaPedidoMusica'));
	        $('#' + proxMusica + 'Lista').hide()

	        /**/
	        $(".votar").hide()
	        $(".removerVoto").hide()


	        if (votou[musicaInfoAberto] == 1)
	            $('#' + musicaInfoAberto + 'removerVoto').show()

	        else
	            $('#' + musicaInfoAberto + 'votar').show()


	        $('#' + musicaInfoAberto + 'Votos').show()
            /**/

	        if (totalVotos == 0) {
	            $('.listaPedidoMusica').hide()
	            $('.listaAleatorio').show()
	        }
	    }
               

	   return
	}


	$("#ecraInicial").click(function (event) {
	    var div = $("#miniEcra");

	    if (((event.pageX + 300) > 900) && ((event.pageY + 206.6666666667) > 620)) {
	        div.css({
	            position: "absolute",
	            left: 900 - 300 - 3,
	            top: 620 - 206.6666666667 - 3,
	        });
	    }
	    else if ((event.pageY + 206.6666666667) > 620) {
	        div.css({
	            position: "absolute",
	            top: 620 - 206.6666666667 - 3,
	            left: event.pageX,
	        });        
	    }

	    else if ((event.pageX + 300) > 900) {
	        div.css({
	            position: "absolute",
	            left: 900 - 300 - 3,
	            top: event.pageY,
	        });
	    }
	   
	    else{
	        div.css({
	            position: "absolute",
	            top: event.pageY,
	            left: event.pageX,
	        });
	    }

        div.show()      

	    var delayTimer = setTimeout(function () {
	        window.location.href = "barista.html"
	    }, 1200);

	    
	    
	});

	



})
