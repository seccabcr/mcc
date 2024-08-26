$(function () {

    /** Procesos de carga de pagina */
    cargaDatosUsuario(); // Carga los datos del usuario en el Header la pagina
    activaBotonMenu();

    var listaUsuarios = new Array();


    const $txtIdUsu = $('#txtIdUsu');
    const $txtNomUsu = $('#txtNomUsu');
    const $cbTipoUsu = $('#cbTipoUsu');
    const $cbEstadoUsu = $('#cbEstadoUsu');


    var $tblUsuarios;


    const $btnBuscaUsu = $('#btnBuscaUsu');
    const $btnActualizar = $('#btnActualizar');
    const $btnCancelar = $('#btnCancelar');

    function ini_componentes() {

        $tblUsuarios = $('#tblUsuarios').DataTable({

            destroy: true,
            data: listaUsuarios,
            columns: [
                {
                    data: 'id_usu'
                },
                {
                    data: 'nombre_usu'

                },
                {
                    data: 'estado_usu',
                    className: 'dt-center',
                    searchable: false
                },
                {
                    defaultContent: '<button class="editar btn btn-primary mb-1"><i class="bi bi-pen"></i></button>',
                    className: 'dt-center'

                },


            ],
            info: false,
            ordering: false,
            language: lenguaje_data_table

        }); /// Fin de creacion de datatable


        $('#tblUsuarios').on('click', 'button.editar', function () {

            let fila = $tblUsuarios.row($(this).parents('tr')).index();

            //$('#modBuscaItems').modal('hide');

            $txtIdUsu.val(listaUsuarios[fila].id_usu);

            consultaUsuario();


        });


        $txtIdUsu.focus(function () {
            $(this).select();
            limpiaCampos();
            inactivaCampos();

        }).keydown(function (e) {
            let code = e.keyCode || e.which;
            if (code == 13 || code == 9) {

                if ($txtIdUsu.val().length > 0) {

                    consultaUsuario();
                }

                e.preventDefault();
            }
        });

        $txtNomUsu.focus(function () {
            $(this).select();

        }).keydown(function (e) {
            let code = e.keyCode || e.which;
            if (code == 13 || code == 9) {

                $cbTipoUsu.focus();
                e.preventDefault();
            }
        });


        $btnBuscaUsu.click(function (e) {
            e.preventDefault();

        });

        $btnActualizar.click((e) => {

            actualizaUsuario();

            e.preventDefault();
        });

        $btnCancelar.click((e) => {

            limpiaCampos();
            inactivaCampos();
            $txtIdUsu.focus();

            e.preventDefault();
        });



    } // Fin de Ini_componentes




    function limpiaCampos() {

        $txtNomUsu.val('');
        $cbEstadoUsu.val('1');
        $cbTipoUsu.val('1');


    }

    function inactivaCampos() {

        $txtNomUsu.prop('disabled', true);
        $cbTipoUsu.prop('disabled', true);
        $cbEstadoUsu.prop('disabled', true);
        $btnActualizar.prop('disabled', true);
    }

    function activaCampos() {

        $txtNomUsu.prop('disabled', false);
        $cbTipoUsu.prop('disabled', false);
        $cbEstadoUsu.prop('disabled', false);
        $btnActualizar.prop('disabled', false);
    }



    async function consultaUsuario() {

        $('#spinner').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'consulta_usuario';
        req.id_usuario = $txtIdUsu.val();



        await fetch_postRequest(req,
            function (data) {

                $('#spinner').hide();

                if (data.resp != null) {

                    $txtNomUsu.val(data.resp.nom_usuario);
                    $cbEstadoUsu.val(data.resp.est_usuario);
                    $cbTipoUsu.val(data.resp.tipo_usuario);


                } else {

                    limpiaCampos();
                }

                activaCampos();
                $txtNomUsu.focus();

            });


    }


    async function actualizaUsuario() {


        if ($txtNomUsu.val().length == 0) {

            $txtNomUsu.focus();
            Swal.fire({ title: "Nombre de usuario es requerido", icon: "error" });
            return;

        }


        $('#spinner').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'actualiza_usuario';
        req.id_usuario = $txtIdUsu.val();
        req.nom_usuario = $txtNomUsu.val();
        req.tipo_usuario = Number.parseInt($cbTipoUsu.val());
        req.est_usuario = Number.parseInt($cbEstadoUsu.val());

        await fetch_postRequest(req,
            function (data) {

                $('#spinner').hide();

                let msg = data.resp;

                Swal.fire({ title: msg, icon: "error" });

                limpiaCampos();
                inactivaCampos();
                $txtIdUsu.val('').focus();
                llenaTablaUsuarios();

            });

    }

    async function llenaTablaUsuarios() {

        $('#spinner').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'lista_usuarios';
        req.todos = true;


        listaUsuarios = new Array();
        $tblUsuarios.clear().draw();

        await fetch_postRequest(req,
            function (data) {

                $('#spinner').hide();

                let usuarios = data.resp.listaUsuarios;

                for (let i = 0; i < usuarios.length; i++) {

                    let usu = new Object();
                    usu.id_usu = usuarios[i].id_usuario;
                    usu.nombre_usu = usuarios[i].nom_usuario;

                    let estado = Number.parseInt(usuarios[i].est_usuario);
                    if (estado == 1) {

                        usu.estado_usu = 'Activo';
                    } else {
                        usu.estado_usu = 'Inactivo';

                    }

                    listaUsuarios.push(usu);
                }

                $tblUsuarios.rows.add(listaUsuarios).draw();

            });
    }

    ini_componentes();

    inactivaCampos();
    llenaTablaUsuarios();


});