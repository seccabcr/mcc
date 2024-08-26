$(function () {



    $('#idUsuario').val('')
        .focus(function () {
            $(this).select();
        })
        .keydown(function (e) {
            let code = e.keyCode || e.which;
            if (code == 13) {

                $('#pinUsuario').focus();
                e.preventDefault();
            }
        });

    $('#pinUsuario').val('').keydown(function (e) {
        let code = e.keyCode || e.which;
        if (code == 13) {

            $('#btnIngresar').focus();
            e.preventDefault();
        }
    });

    $('#btnIngresar').click(function (e) {
        e.preventDefault();
        loginUsuario();
    });


    async function loginUsuario() {

        if ($('#idUsuario').val().length == 0) {
            Swal.fire({ title: "Debe digitar un ID Usuario", icon: "error" });
            $('#idUsuario').focus();
            return;
        }



        let url = window.location.origin + '/mcc/'; // servidor remoto


        console.log(url)
        sessionStorage.setItem("URL_API", url);

        var req = Object();
        req.w = 'apiMcc';
        req.r = 'login_usuario';
        req.id_usuario = $('#idUsuario').val();
        req.pin_pass = $('#pinUsuario').val();

        await fetch_postRequest(req,
            function (data) {


                console.log(data)
                if (data.resp != null) {

                    if (data.resp.est_usuario == 0) {
                        Swal.fire({ title: "Usuario Inactivo", icon: "error" });
                        return;
                    }

                    if (data.resp.pin_pass != $('#pinUsuario').val()) {
                        Swal.fire({ title: "PIN Incorrecto", icon: "error" });
                        return;
                    }

                    let tipo_usuario = data.resp.tipo_usuario;                    
                    let nom_usuario = data.resp.nom_usuario;
                    let titUsuario=null;

                    switch (tipo_usuario) {
                        case '1':
                            titUsuario = 'Ejecutivo 1';
                            break;
                        case '2':
                            titUsuario = 'Ejecutivo Adm';
                            break;

                        default:
                            titUsuario = 'Indefinido';
                            break;
                    }


                    sessionStorage.setItem("ID_USUARIO", req.id_usuario);                    
                    sessionStorage.setItem("TIPO_USUARIO", tipo_usuario);
                    sessionStorage.setItem("TIT_USUARIO", titUsuario);
                    sessionStorage.setItem("NOM_USUARIO", nom_usuario);

                    iGoTo('./inicio.html');



                } else {
                    Swal.fire({ title: "Usuario NO encontrado", icon: "error" });

                }
            });
    }
});