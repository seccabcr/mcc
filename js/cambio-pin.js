$(function () {

    /** Procesos de carga de pagina */
    cargaDatosUsuario(); // Carga los datos del usuario en el Header la pagina
    activaBotonMenu();

    //** Constantes y variables globales de la página */

    $('#idPerfil').val(sessionStorage.getItem('ID_USUARIO'));
    $('#nomUsuPerfil').val(sessionStorage.getItem('NOM_USUARIO'));


    const $pinActual = $('#pinActual').val('');

    const $pinNuevo = $('#pinNuevo').val('');


    const $pinNuevoConf = $('#pinNuevoConf').val('');

    $('#btnCambiar').click((e) => {
        e.preventDefault();
        cambiaPin();

    });


    function cambiaPin() {

        let pinActual = $pinActual.val();
        let pinNuevo = $pinNuevo.val();
        let pinNuevoConf = $pinNuevoConf.val();

        if (pinNuevo.length < 4) {

            Swal.fire({ title: "El PIN nuevo debe tener de 4-8 digitos", icon: "error" });
            $pinNuevo.focus();
            return;
        }


        if (pinNuevo != pinNuevoConf) {

            Swal.fire({ title: "Error al validar el nuevo pin. Campos NO son iguales", icon: "error" });
            $pinNuevoConf.focus();
            return;
        }


        let req = new Object();
        req.w = "apiMcc";
        req.r = "cambia_pin";
        req.id_usuario = sessionStorage.getItem('ID_USUARIO');
        req.pin_actual = pinActual;
        req.nuevopin = pinNuevo;

        fetch_postRequest(req, function (data) {
            //console.log(data);


            if (data.resp.estadoRes == 0) {
                let msg = data.resp.msg;
                Swal.fire({ title: msg, icon: "error" });
                return;
            }

         
            $pinNuevo.val('');
            $pinNuevoConf.val('');
            $pinActual.val('').focus();
            
            Swal.fire({ title: data.resp.msg, icon: "success" });
          

        });


    }


});