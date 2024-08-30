$(function () {

    var num_prop = 0;

    var aTiposPub = ['Alquiler', 'Venta', 'Alquiler / Venta'];


    function cargaNumeroPropiedad() {


        num_prop = Number.parseInt(readCookie('numero_propiedad'));

        consultaPropiedad();


    }


    async function consultaPropiedad() {


        $('#spinner').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'consulta_datos_preview';
        req.num_prop = num_prop;
        req.id_usuario = sessionStorage.getItem('ID_USUARIO');

        await fetch_postRequest(req,
            function (data) {

                $('#spinner').hide();



                let element = data.resp;

                console.log(element)

                _datos = element.datos;
                _fotos = element.fotos;
                _datosUsu = element.datos_usu;

                let texto = aTiposPub[_datos.cat_publicacion - 1] + ' ' + _datos.nom_tipo_prop;
                $('#encabezado h1').text(texto);

                texto = _datos.nomProvincia + ', ' + _datos.nomCanton + ', ' + _datos.nomDistrito;
                $('#encabezado h3').text(texto);

                texto = _datos.otras_sennas;
                $('#encabezado span').text(texto);

                if (_datos.cat_publicacion == 1) {
                    texto = 'Precio: ' + nf_entero.format(Number.parseInt(_datos.mon_alquiler)) + ' ' + _datos.tipo_moneda;


                } else if (_datos.cat_publicacion == 2) {
                    texto = 'Precio: ' + nf_entero.format(Number.parseInt(_datos.mon_venta)) + ' ' + _datos.tipo_moneda;

                } else {
                    texto = 'Precio: ' + nf_entero.format(Number.parseInt(_datos.mon_alquiler)) + ' / ' + nf_entero.format(Number.parseInt(_datos.mon_venta)) + ' ' + _datos.tipo_moneda;

                }
                $('#precio h2').text(texto);

                let num_fotos = _fotos.length;
                if (num_fotos > 6) {
                    num_fotos = 6;
                }


                // Agrega fotos

                for (let i = 0; i < num_fotos; i++) {

                    let foto = _fotos[i];

                    let img = '<div class="col-4"><img src="' + foto.url_foto + '" alt="foto"></div>';
                    $('#galeria .row').append(img);

                }



                texto = '# Referencia: ' + num_prop;
                $('#datos h5').text(texto);

                texto = '<p>Area Construcción: ' + _datos.mts_const + ' m2<br>Area Lote: ' + _datos.mts_lote + ' m2</p>';
                $('#col1').append(texto);

                texto = '<p>Habitaciones / Oficinas: ' + _datos.can_hab_ofi + '<br>Baños: ' + _datos.can_bannos + '</p>';
                $('#col2').append(texto);

                texto = '<p><strong>Descripcion: </strong>' + _datos.det_prop + '</p>';
                $('#det-prop').append(texto);

                
                
                texto = '<p><strong>' + _datosUsu.nom_usuario + '</strong>';

                if (_datosUsu.telefonos.length > 0) {
                    texto += '<br>' + _datosUsu.telefonos;
                }
                if (_datosUsu.email_usu.length > 0) {
                    texto += '<br>' + _datosUsu.email_usu;
                }
                texto += '</p>';

                $('#firma').append(texto);



            });

    }

    cargaNumeroPropiedad();

});