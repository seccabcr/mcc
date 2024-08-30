$(function () {

    var num_prop = 0;

    var aTiposPub = ['Alquiler', 'Venta', 'Alquiler / Venta'];
    var aTiposContactos = ['Dueño', 'Intermediario', 'Corredor'];



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

        await fetch_postRequest(req,
            function (data) {

                $('#spinner').hide();



                let element = data.resp;

                console.log(element)

                _datos = element.datos;
                _fotos = element.fotos;

                let texto = '';

                texto = '# Referencia: ' + num_prop;
                $('#encabezado h3').text(texto);




                texto = aTiposPub[_datos.cat_publicacion - 1] + ' ' + _datos.nom_tipo_prop;
                $('#publicacion h5').text(texto);

                texto = _datos.titulo;;
                $('#titulo').text(texto);

                texto = '<strong>Ubicación: </strong>' + _datos.nomProvincia + ', ' + _datos.nomCanton + ', ' + _datos.nomDistrito + ', ' + _datos.otras_sennas;
                $('#ubicacion').append(texto);


                texto = '<strong>Ejecutivo: </strong>' + _datos.nom_usuario;
                $('#ejecutivo').append(texto);


                // LLena datos propiedad

                texto = '<strong>Area Construcción:</strong> ' + _datos.mts_const + ' m2';
                $('#mts-const').append(texto);

                texto = '<strong>Area Lote: </strong>' + _datos.mts_lote + ' m2';
                $('#mts-lote').append(texto);

                if (_datos.mts_frente.length > 0) {
                    texto = '<strong>Frente: </strong>' + _datos.mts_frente + ' mts';

                }

                if (_datos.mts_fondo.length > 0) {
                    texto = '<strong>Fondo: </strong>' + _datos.mts_fondo + ' mts';

                }

                texto = '<strong>Habitaciones / Oficinas: </strong> ' + _datos.can_hab_ofi;
                $('#hab-ofi').append(texto);

                texto = '<strong>Número Baños: </strong>' + _datos.can_bannos;
                $('#bannos').append(texto);

                if (_datos.can_pisos.length > 0) {
                    texto = '<strong>Número Pisos: </strong>' + _datos.can_pisos;

                }
                if (_datos.anio_const.length > 0) {
                    texto = '<strong>Año Construcción: </strong>' + _datos.anio_const;

                }

                texto = '<p><strong>Descripcion: </strong>' + _datos.det_prop + '</p>';
                $('#det-prop').append(texto);



                // Llena datos financieros

                if (_datos.cat_publicacion == 1) {
                    texto = 'Precio: ' + nf_entero.format(Number.parseInt(_datos.mon_alquiler)) + ' ' + _datos.tipo_moneda;


                } else if (_datos.cat_publicacion == 2) {
                    texto = 'Precio: ' + nf_entero.format(Number.parseInt(_datos.mon_venta)) + ' ' + _datos.tipo_moneda;

                } else {
                    texto = 'Precio: ' + nf_entero.format(Number.parseInt(_datos.mon_alquiler)) + ' / ' + nf_entero.format(Number.parseInt(_datos.mon_venta)) + ' ' + _datos.tipo_moneda;

                }

                $('#precio h5').text(texto);


                texto = '<strong>Comisión Alquiler: </strong> ' + _datos.com_alquiler + ' %';
                $('#com-alq').append(texto);

                texto = '<strong>Comisión Venta: </strong> ' + _datos.com_venta + ' %';
                $('#com-vta').append(texto);

                if(_datos.obs_fin_leg.length>0){

                    texto = '<strong>Observaciones: </strong> ' + _datos.obs_fin_leg ;
                    $('#obs-fin').append(texto);
    
                }


                // Llena datos contacto



                texto = '<strong>Nombre: </strong> ' + _datos.nom_contacto;
                $('#nom-contacto').append(texto);


                texto = '<strong>Teléfonos: </strong> ' + _datos.tel_contacto1;

                if(_datos.tel_contacto2.length>0){
                    texto+=' / '+_datos.tel_contacto2
                }

                $('#tels-contacto').append(texto);

                if(_datos.email_contacto.length>0){

                    texto = '<strong>Email: </strong> ' + _datos.email_contacto ;
                    $('#email-contacto').append(texto);
    
                }

                let tipo_contacto = Number.parseInt(_datos.rel_contacto);
                texto = '<strong>Relación: </strong> ' + aTiposContactos[tipo_contacto-1];
                $('#rel-contacto').append(texto);




                // Agrega fotos

                for (let i = 0; i < _fotos.length; i++) {

                    let foto = _fotos[i];

                    let img = '<div class="col-4"><img src="' + foto.url_foto + '" alt="foto"></div>';
                    $('#galeria .row').append(img);

                }




            });

    }

    cargaNumeroPropiedad();

});