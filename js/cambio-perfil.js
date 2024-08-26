$(function () {

    /** Procesos de carga de pagina */
    cargaDatosUsuario(); // Carga los datos del usuario en el Header la pagina
    activaBotonMenu();

    //** Constantes y variables globales de la página */

    const $txtIdUsu = $('#idPerfil').val(sessionStorage.getItem('ID_USUARIO'));
   
    const $nomUsu = $('#nomUsu')
        .val('')
        .focus(function () {
            $(this).select();
        });

    const $telefonos = $('#txtTels').val('')
        .focus(function () {
            $(this).select();
        });

    const $txtEmail = $('#txtEmail').val('')
        .focus(function () {
            $(this).select();
        });

    $('#btnCambiar').click((e) => {
        e.preventDefault();
        cambiaPerfil();

    });



    async function consultaUsuario() {

        $('#spinner').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'consulta_usuario';
        req.id_usuario = $txtIdUsu.val();



        await fetch_postRequest(req,
            function (data) {

                //console.log(data)

                $('#spinner').hide();

                $nomUsu.val(data.resp.nom_usuario);
                $telefonos.val(data.resp.telefonos);
                $txtEmail.val(data.resp.email_usu);

                $nomUsu.focus();

            });


    }



    function cambiaPerfil() {


        if ($nomUsu.val().length == 0) {
            $nomUsu.focus();
            Swal.fire({ title: "Nombre usuario es requerido", icon: "error" });
            return;
        }

        if ($txtEmail.val().length > 0 && !validarEmail($txtEmail.val())) {
            $txtEmail.focus();
            Swal.fire({ title: "Debe digitar un Email válido ", icon: "warning" });
            return;

        }


        let req = new Object();
        req.w = "apiMcc";
        req.r = "actualiza_perfil";
        req.id_usuario = sessionStorage.getItem('ID_USUARIO');
        req.nom_usuario = $nomUsu.val();
        req.telefonos = $telefonos.val();
        req.email_usu = $txtEmail.val();


        fetch_postRequest(req, function (data) {
            //console.log(data);
            
            $nomUsu.focus();

            Swal.fire({ title: data.resp, icon: "success" });
            


        });
    }

    consultaUsuario();


});