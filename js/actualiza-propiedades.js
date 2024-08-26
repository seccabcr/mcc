$(function () {

    /** Procesos de carga de pagina */
    cargaDatosUsuario(); // Carga los datos del usuario en el Header la pagina
    activaBotonMenu();


    var listaContactos = new Array();

    var datosTblContactos = new Array();


    var $tblContactos = $('#tblContactos').DataTable({

        destroy: true,
        data: datosTblContactos,
        columns: [
            {
                data: 'nombre'

            },
            {
                data: 'telefono'

            },
           
            {
                defaultContent: '<button class="seleccionar btn btn-light"><i class="bi bi-arrow-right-circle"></i></button>',
                className: 'dt-right'
            }

        ],
        info: false,
        ordering: false,
        language: lenguaje_data_table

    }); /// Fin de creacion de datatable

    //$tblContactos.clear().draw();


    $('#tblContactos').on('click', 'button.seleccionar', function () {

        //let fila = $tblContactos.row($(this).parents('tr')).index();

        let data = $tblContactos.row($(this).parents('tr')).data();

        //console.log(data)

        //$('#txtNomContacto').focus();

        $('#modBusContacto').modal('hide');

        //let aTelefonos = data.telefonos.split(',');

        $txtNomContacto.val(data.nombre);
        $txtTel1.val(data.telefono);
        //$txtTel2.val(aTelefonos[1]);
        //$txtEmail.val(data.email);



    });




    const $txtNumProp = $('#txtNumProp');

    const $txtTitulo = $('#txtTitulo')
        .focus(function () {
            $(this).select();
        });



    const $cbTipoPub = $('#cbTipoPub');
    const $cbTipoProp = $('#cbTipoProp');
    const $cbEstado = $('#cbEstado');
    const $txtFecPub = $('#txtFecPub').val(obtieneFechaActual());

    const $cbProvincias = $('#cbProvincias')
        .change(() => {

            llenaComboCantones();
        });

    const $cbCantones = $('#cbCantones')
        .change(() => {
            llenaComboDistritos();
        });

    const $cbDistritos = $('#cbDistritos');

    const $txtSennas = $('#txtSennas')
        .focus(function () {
            $(this).select();
        });

    const $txtUsoAct = $('#txtUsoAct')
        .focus(function () {
            $(this).select();
        });


    const $txtCanHab = $('#txtCanHab')
        .focus(function () {
            $(this).select();
        });



    const $txtBanios = $('#txtCanBanos')
        .focus(function () {
            $(this).select();
        });

    const $txtCanPisos = $('#txtCanPisos')
        .focus(function () {
            $(this).select();
        });


    const $txtMtsConst = $('#txtMtsConst')
        .focus(function () {
            $(this).select();
        });

    const $txtMtsLote = $('#txtMtsLote')
        .focus(function () {
            $(this).select();
        });

    const $txtMtsFrente = $('#txtMtsFrente')
        .focus(function () {
            $(this).select();
        });

    const $txtMtsFondo = $('#txtMtsFondo')
        .focus(function () {
            $(this).select();
        });

    const $txtAnioConst = $('#txtAnioConst')
        .focus(function () {
            $(this).select();
        });

    const $txtAnioRemo = $('#txtAnioRemo')
        .focus(function () {
            $(this).select();
        });

    const $txtDetProp = $('#txtDetProp')
        .focus(function () {
            $(this).select();
        });

    const $cbTipoMoneda = $('#cbTipoMoneda');


    const $txtPreAlq = $('#txtPreAlq').focus(function () {
        $(this).select();
    }).keydown(function (e) {
        let code = e.keyCode || e.which;
        if (code == 13 || code == 9) {

            e.preventDefault();

            let x = Number.parseInt($(this).val().replace(/,/g, ''));
            $(this).val(nf_entero.format(x));


            $txtPreVta.focus();
        }


    });

    const $txtPreVta = $('#txtPreVta').focus(function () {
        $(this).select();
    }).keydown(function (e) {
        let code = e.keyCode || e.which;
        if (code == 13 || code == 9) {

            e.preventDefault();

            let x = Number.parseInt($(this).val().replace(/,/g, ''));
            $(this).val(nf_entero.format(x));


            $txtComAlq.focus();
        }


    });

    const $txtComAlq = $('#txtComAlq').focus(function () {
        $(this).select();
    }).keydown(function (e) {
        let code = e.keyCode || e.which;
        if (code == 13 || code == 9) {

            e.preventDefault();

            let x = Number.parseInt($(this).val().replace(/,/g, ''));
            $(this).val(nf_entero.format(x));


            $txtComVta.focus();
        }


    });

    const $txtComVta = $('#txtComVta').focus(function () {
        $(this).select();
    }).keydown(function (e) {
        let code = e.keyCode || e.which;
        if (code == 13 || code == 9) {

            e.preventDefault();

            let x = Number.parseInt($(this).val().replace(/,/g, ''));
            $(this).val(nf_entero.format(x));

            $txtObsFin.focus();
        }


    });

    const $txtObsFin = $('#txtObsFin')
        .focus(function () {
            $(this).select();
        });


    const $txtNomContacto = $('#txtNomContacto')
        .focus(function () {
            $(this).select();
        }).keydown(function (e) {
            let code = e.keyCode || e.which;
            if (code == 13 || code == 9) {

                $txtTel1.focus();
                e.preventDefault();
            }


        });



    const $txtTel1 = $('#txtTel1')
        .focus(function () {
            $(this).select();
        }).keydown(function (e) {
            let code = e.keyCode || e.which;
            if (code == 13 || code == 9) {

                $txtTel2.focus();
                e.preventDefault();
            }


        });


    const $txtTel2 = $('#txtTel2')
        .focus(function () {
            $(this).select();
        }).keydown(function (e) {
            let code = e.keyCode || e.which;
            if (code == 13 || code == 9) {

                $txtEmail.focus();
                e.preventDefault();
            }


        });



    const $txtEmail = $('#txtEmail')
        .focus(function () {
            $(this).select();
        }).keydown(function (e) {
            let code = e.keyCode || e.which;
            if (code == 13 || code == 9) {

                $cbRelContacto.focus();
                e.preventDefault();
            }


        });

    const $cbRelContacto = $('#cbRelContacto');


    const $btnBusContacto = $('#btnBusContacto').click((e) => {

        llenaTablaContactos();

        e.preventDefault();
    });

    const $btnActualizar = $('#btnActualizar').click((e) => {

        actualizaPropiedad();
        e.preventDefault();
    });

    const $btnCancelar = $('#btnCancelar').click((e) => {

        iGoTo('./inicio.html');
    });

    function cargaNumeroPropiedad() {


        limpiaCampos();


        let _numProp = readCookie('numero_propiedad');

        if (_numProp != null) {
            $txtNumProp.val(_numProp);

            consultaPropiedad();

        } else {

            $txtNumProp.val('');
        }

    }

    function limpiaCampos() {

        $txtTitulo.val('');
        $cbTipoPub.val('0');
        $cbTipoProp.val('0');
        $txtFecPub.val(obtieneFechaActual());
        $cbEstado.val('1');
        $cbCantones.val('0');
        $cbDistritos.val('0');
        $txtSennas.val('');
        $txtUsoAct.val('');
        $txtCanHab.val('');
        $txtBanios.val('');
        $txtCanPisos.val('');
        $txtMtsConst.val('');
        $txtMtsLote.val('');
        $txtMtsFrente.val('');
        $txtMtsFondo.val('');
        $txtAnioConst.val('');
        $txtAnioRemo.val('');
        $txtDetProp.val('');
        $cbTipoMoneda.val('USD');
        $txtPreAlq.val('0');
        $txtPreVta.val('0');
        $txtComAlq.val('0');
        $txtComVta.val('0');
        $txtObsFin.val('');
        $txtNomContacto.val('');
        $txtTel1.val('');
        $txtTel2.val('');
        $txtEmail.val('');
        $cbRelContacto.val('0');
    }

    async function consultaPropiedad() {


        $('#spinner').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'consulta_propiedad';
        req.num_prop = Number.parseInt($txtNumProp.val());

        await fetch_postRequest(req,
            function (data) {

                $('#spinner').hide();

                //console.log(data)

                let element = data.resp;

                $txtTitulo.val(element.titulo);
                $cbTipoPub.val(element.cat_publicacion);
                $cbTipoProp.val(element.cat_propiedad);
                $txtFecPub.val(element.fecha_publi);
                $cbEstado.val(element.estado);

                $cbProvincias.val(element.idProvincia);
                llenaComboCantones().then(() => {
                    $cbCantones.val(element.idCanton);
                    llenaComboDistritos().then(() => {
                        $cbDistritos.val(element.idDistrito);
                    })
                })

                $txtSennas.val(element.otras_sennas);
                $txtUsoAct.val(element.uso_actual);
                $txtCanHab.val(element.can_hab_ofi);
                $txtBanios.val(element.can_bannos);
                $txtCanPisos.val(element.can_pisos);
                $txtMtsConst.val(element.mts_const);
                $txtMtsLote.val(element.mts_lote);
                $txtMtsFrente.val(element.mts_frente);
                $txtMtsFondo.val(element.mts_fondo);
                $txtAnioConst.val(element.anio_const);
                $txtAnioRemo.val(element.anio_remo);
                $txtDetProp.val(element.det_prop);
                $cbTipoMoneda.val(element.tipo_moneda);
                $txtPreAlq.val(nf_entero.format(element.mon_alquiler));
                $txtPreVta.val(nf_entero.format(element.mon_venta));
                $txtComAlq.val(nf_entero.format(element.com_alquiler));
                $txtComVta.val(nf_entero.format(element.com_venta));
                $txtObsFin.val(element.obs_fin_leg);

                $txtNomContacto.val(element.nom_contacto);
                $txtTel1.val(element.tel_contacto1);
                $txtTel2.val(element.tel_contacto2);
                $txtEmail.val(element.email_contacto);
                $cbRelContacto.val(element.rel_contacto);

            });

    }

    async function actualizaPropiedad() {

        // Validacion de campos

        if ($txtTitulo.val().length == 0) {


            $('#publicacion-tab').tab('show');
            //$txtTitulo.focus();
            Swal.fire({ title: "Titulo de la publicacion es requerido", icon: "warning" });
            return;
        }

        if ($cbTipoPub.val() == 0) {
            $('#publicacion-tab').tab('show');
            Swal.fire({ title: "Tipo de publicación es requerido", icon: "warning" });
            return;
        }

        if ($cbTipoProp.val() == 0) {
            $('#publicacion-tab').tab('show');
            Swal.fire({ title: "Tipo de propiedad es requerido", icon: "warning" });
            return;
        }

        if ($cbProvincias.val() == 0) {
            $('#ubicacion-tab').tab('show');
            Swal.fire({ title: "Debe seleccionar una provincia", icon: "warning" });
            return;
        }

        if ($cbCantones.val() == 0) {
            $('#ubicacion-tab').tab('show');
            Swal.fire({ title: "Debe seleccionar un cantón", icon: "warning" });
            return;
        }
        if ($cbDistritos.val() == 0) {
            $('#ubicacion-tab').tab('show');
            Swal.fire({ title: "Debe seleccionar un distrito", icon: "warning" });
            return;
        }

        if ($txtSennas.val().length == 0) {
            $('#ubicacion-tab').tab('show');
            Swal.fire({ title: "Otras señas en ubicacion son requeridas", icon: "warning" });
            return;
        }

        if ($txtCanHab.val().length == 0) {
            $('#propiedad-tab').tab('show');
            Swal.fire({ title: "Cantidad Habitaciones/Oficinas es requerido", icon: "warning" });
            return;
        }

        if ($txtBanios.val().length == 0) {
            $('#propiedad-tab').tab('show');
            Swal.fire({ title: "Cantidad de Baños es requerido", icon: "warning" });
            return;
        }

        if ($txtMtsConst.val().length == 0) {
            $('#propiedad-tab').tab('show');
            Swal.fire({ title: "Metros de construcción es requerido", icon: "warning" });
            return;
        }

        if ($txtMtsLote.val().length == 0) {
            $('#propiedad-tab').tab('show');
            Swal.fire({ title: "Metros de lote es requerido", icon: "warning" });
            return;
        }

        if ($txtDetProp.val().length == 0) {
            $('#propiedad-tab').tab('show');
            Swal.fire({ title: "Detalle de la propiedad es requerido", icon: "warning" });
            return;
        }

        if ($txtNomContacto.val().length == 0) {
            $('#contacto-tab').tab('show');
            Swal.fire({ title: "Nombre de contacto es requerido", icon: "warning" });
            return;
        }

        if ($txtTel1.val().length == 0 && $txtTel2.val().length == 0) {
            $('#contacto-tab').tab('show');
            Swal.fire({ title: "Se requier al menos un número de teléfono del contacto", icon: "warning" });
            return;
        }

        if ($txtEmail.val().length > 0 && !validarEmail($txtEmail.val())) {
            $txtEmail.focus();
            Swal.fire({ title: "Debe digitar un Email válido ", icon: "warning" });
            return;

        }

        if ($cbRelContacto.val() == 0) {
            $('#contacto-tab').tab('show');
            Swal.fire({ title: "Relaciòn del contacto es requerida", icon: "warning" });
            return;
        }


        $('#spinner').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'actualiza_propiedad';
        req.num_prop = $txtNumProp.val().length > 0 ? Number.parseInt($txtNumProp.val()) : 0;
        req.titulo = $txtTitulo.val();
        req.cat_publicacion = Number.parseInt($cbTipoPub.val());
        req.cat_propiedad = Number.parseInt($cbTipoProp.val());
        req.id_ejecutivo = sessionStorage.getItem('ID_USUARIO');
        req.estado = Number.parseInt($cbEstado.val());
        req.idProvincia = Number.parseInt($cbProvincias.val());
        req.idCanton = Number.parseInt($cbCantones.val());
        req.idDistrito = Number.parseInt($cbDistritos.val());
        req.otras_sennas = $txtSennas.val();
        req.uso_actual = $txtUsoAct.val();
        req.can_hab_ofi = $txtCanHab.val();
        req.can_bannos = $txtBanios.val();
        req.can_pisos = $txtCanPisos.val();
        req.mts_const = $txtMtsConst.val();
        req.mts_lote = $txtMtsLote.val();
        req.mts_frente = $txtMtsFrente.val();
        req.mts_fondo = $txtMtsFondo.val();
        req.anio_const = $txtAnioConst.val();
        req.anio_remo = $txtAnioRemo.val();
        req.det_prop = $txtDetProp.val();
        req.tipo_moneda = $cbTipoMoneda.val();
        req.mon_alquiler = Number.parseInt($txtPreAlq.val().replace(/,/g, ''));
        req.mon_venta = Number.parseInt($txtPreVta.val().replace(/,/g, ''));
        req.com_alquiler = Number.parseInt($txtComAlq.val());
        req.com_venta = Number.parseInt($txtComVta.val());
        req.obs_fin_leg = $txtObsFin.val();
        req.nom_contacto = $txtNomContacto.val();
        req.tel_contacto1 = $txtTel1.val();
        req.tel_contacto2 = $txtTel2.val();
        req.email_contacto = $txtEmail.val();
        req.rel_contacto = Number.parseInt($cbRelContacto.val());


        await fetch_postRequest(req,
            function (data) {

                $('#spinner').hide();

                $('#publicacion-tab').tab('show');

                let msg = data.resp.msg;

                $txtNumProp.val(data.resp.num_prop);

                Swal.fire({ title: msg, icon: "info" });

                //limpiaCampos();
                //inactivaCampos();
                //$txtIdUsu.val('').focus();

            });
    }

    async function llenaTablaContactos() {


        listaContactos = new Array();
        datosTblContactos = new Array();
        $tblContactos.clear().draw();

        $('#spinnerModCon').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'lista_contactos';


        await fetch_postRequest(req,
            function (data) {

                $('#spinnerModCon').show();

                listaContactos = data.resp.listaContactos;
                for (let i = 0; i < listaContactos.length; i++) {

                    let element = listaContactos[i];

                    let item = new Object();
                    item.nombre = element.nom_contacto;
                    item.telefono = element.tel_contacto1;
                    //item.email = element.email_contacto;

                    datosTblContactos.push(item);
                }

                $tblContactos.rows.add(datosTblContactos).draw();
            }
        )
    }


    llenaComboTipoPropiedad().then(() => {
        llenaComboProvincias().then(() => {
            cargaNumeroPropiedad();
        })
    })












});