$(function () {

    /** Procesos de carga de pagina */
    cargaDatosUsuario(); // Carga los datos del usuario en el Header la pagina
    activaBotonMenu();


    var aTiposProp = ['Alquiler', 'Venta', 'Alquiler / Venta'];
    var listaPropiedades = new Array();

    var datosTablaProp = new Array();



    const $btnNuevo = $('#btnNuevo').click((e) => {

        nuevoRegistro();
    });


    const $cbFiltrado = $('#cbFiltrado').val('1').change((e) => {

        consultaPropiedades();
    });



    var $tblPropiedades = $('#tblPropiedades').DataTable({

        destroy: true,
        data: datosTablaProp,
        columns: [
            {
                data: 'imagen_url',
                render: function (data) {
                    return '<img src="' + data + '" width="200px" height="200px">';
                },
                searchable: false,
                className: 'dt-center'

            },
            {
                defaultContent: '<button class="edita-prop btn btn-primary mb-1" data-bs-toggle="tooltip" title="Modifica Propiedad"><i class="bi bi-pen"></i></button><BR>' +
                    '<button  class="edita-img btn btn-info mb-1" data-bs-toggle="tooltip" title="Actualiza Imagenes"><i class="bi bi-image"></i></button><BR>'
                    + '<button  class="vista-previa btn btn-warning" data-bs-toggle="tooltip" title="Genera Reporte"><i class="bi bi-journal-album"></i></button>',
                className: 'dt-center'

            },
            {
                data: 'resumen'
            },
            {
                data: 'precio',
                className: 'dt-right',
            },
            {
                data: 'fecha_pub',
                className: 'dt-center',
                searchable: false
            },
            {
                data: 'nom_usu'

            }

        ],
        info: false,
        ordering: false,
        language: lenguaje_data_table

    }); /// Fin de creacion de datatable




    $('#tblPropiedades').on('click', 'button.edita-prop', function () {

        let fila = $tblPropiedades.row($(this).parents('tr')).index();

        let _idUsuario = listaPropiedades[fila].id_ejecutivo;


        if (_idUsuario != sessionStorage.getItem('ID_USUARIO') && sessionStorage.getItem('TIPO_USUARIO') != 2) {

            Swal.fire({ title: "Usuario No autorizado para modificar esta propiedad", icon: "warning" });
            return;
        }



        let _numPro = listaPropiedades[fila].num_prop;

        document.cookie = "numero_propiedad=" + _numPro + ";path=/"

        iGoTo('./actualiza-propiedades.html');
    });


    $('#tblPropiedades').on('click', 'button.edita-img', function () {

        let fila = $tblPropiedades.row($(this).parents('tr')).index();

        let _numPro = listaPropiedades[fila].num_prop;

        document.cookie = "numero_propiedad=" + _numPro + ";path=/"

        iGoTo('./actualiza-fotos.html');
    });

    $('#tblPropiedades').on('click', 'button.vista-previa', function () {

        let fila = $tblPropiedades.row($(this).parents('tr')).index();

        let _numPro = listaPropiedades[fila].num_prop;

        document.cookie = "numero_propiedad=" + _numPro + ";path=/"

        
        window.open("preview-propiedad.html");
        
        //iGoTo('./actualiza-fotos.html');
    });

    
    $('#tblPropiedades').on('click', 'img', function () {

        console.log('Pulso click sobre la imagen')

        let fila = $tblPropiedades.row($(this).parents('tr')).index();

        let _numPro = listaPropiedades[fila].num_prop;

        document.cookie = "numero_propiedad=" + _numPro + ";path=/"

        
        window.open("ficha-tecnica-agente.html");
        
        //iGoTo('./actualiza-fotos.html');
    });






    function nuevoRegistro() {

        document.cookie = "numero_propiedad=; path=/";

        iGoTo('./actualiza-propiedades.html');

    }



    async function consultaPropiedades() {

        listaPropiedades = new Array();
        datosTablaProp = new Array();
        $tblPropiedades.clear().draw();

        $('#spinner').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'lista_propiedades';
        req.estado = Number.parseInt($cbFiltrado.val());

        await fetch_postRequest(req,
            function (data) {

                $('#spinner').hide();

                //console.log(data)

                listaPropiedades = data.resp.listaPropiedades;

                for (let i = 0; i < listaPropiedades.length; i++) {


                    let element = listaPropiedades[i];

                    let url_img = element.url_foto!=null?element.url_foto:'./img/mcc_logo.jpeg';


                    let _detalle = '<strong>' + aTiposProp[Number.parseInt(element.cat_publicacion) - 1] + ' ' + element.nom_tipo_prop + '</strong><br>'

                    _detalle += element.titulo + '<br>' + '<strong>Ubicación: </strong>' + element.nomProvincia + ', ' + element.nomCanton + ', ' + element.nomDistrito + ', ' + element.otras_sennas + '<br><br># Referencia: ' + element.num_prop;

                    let _precio = '';

                    if (element.cat_publicacion == 1) {

                        _precio = nf_entero.format(element.mon_alquiler) + ' ' + element.tipo_moneda;

                    } else if (element.cat_publicacion == 2) {

                        _precio = nf_entero.format(element.mon_venta) + ' ' + element.tipo_moneda;

                    } else {

                        _precio = nf_entero.format(element.mon_alquiler) + ' ' + element.tipo_moneda + '<br>' + nf_entero.format(element.mon_venta) + ' ' + element.tipo_moneda;
                    }

                    let a_fecha = (element.fecha_publi).split('-');
                    let _fecha_publi = a_fecha[2] + '/' + a_fecha[1] + '/' + a_fecha[0];


                    let item = new Object();
                    item.imagen_url = url_img;
                    item.resumen = _detalle;
                    item.precio = _precio;
                    item.fecha_pub = _fecha_publi;
                    item.nom_usu = element.id_ejecutivo;


                    datosTablaProp.push(item);

                }


                $tblPropiedades.rows.add(datosTablaProp).draw();


            });


    }

    consultaPropiedades();

});