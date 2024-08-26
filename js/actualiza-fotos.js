$(function () {

    /** Procesos de carga de pagina */
    cargaDatosUsuario(); // Carga los datos del usuario en el Header la pagina
    activaBotonMenu();


    var listaImagenes = new Array();
    var datosTblImgs = new Array();

    var conse_foto = 0;

    const $txtNumProp = $('#txtNumProp');

    const $inputImg = $('#input-img').change(function (files) {

        //fileUploader=null;

        const fileUploader = files.target.files[0];

        let img_url = URL.createObjectURL(fileUploader);

        $imgPreview.attr("src", img_url)


    });

    const $imgPreview = $('#img-preview');

    const $btnAgregaImg = $('#btnAgregaImg').click((e) => {

        conse_foto = 0;

        $inputImg.click();

    });

    const $btnGuardar = $('#btnGuardar').click((e) => {

        //console.log($inputImg.prop('files'))

        if ($inputImg.prop('files').length > 0) {

            guardarImagen();

        } else {
            console.log('Seleccione una iamgen')
        }


        e.preventDefault();
    });

    var $tblImagenes = $('#tblImagenes').DataTable({

        destroy: true,
        data: datosTblImgs,
        columns: [
            {
                data: 'conse',
                searchable: false,
                className: 'dt-center'

            },
            {
                data: 'imagen_url',
                render: function (data) {
                    return '<img src="' + data + '" width="100px"  height="100px">';
                },
                searchable: false,
                className: 'dt-center'

            },
            {
                defaultContent: '<button class="edita-img btn btn-primary me-2" data-bs-toggle="tooltip" title="Cambiar Imagen"><i class="bi bi-pen"></i></button>'
                    + '<button  class="elimina-img btn btn-danger" data-bs-toggle="tooltip" title="Genera PDF"><i class="bi bi-trash"></i></button>'

            }


        ],
        info: false,
        searching: false,
        ordering: false,
        language: lenguaje_data_table

    }); /// Fin de creacion de datatable


    $('#tblImagenes').on('click', 'button.edita-img', function () {

        let data = $tblImagenes.row($(this).parents('tr')).data();

        conse_foto = Number.parseInt(data.conse);

        $inputImg.click();


    });

    $('#tblImagenes').on('click', 'button.elimina-img', function () {

        let data = $tblImagenes.row($(this).parents('tr')).data();

        conse_foto = Number.parseInt(data.conse);
        
        if (conse_foto <= 6) {

            Swal.fire({ title: "No es permitido eliminar las primeras 6 fotos registradas\nUse la opcion de cambiar la imagen", icon: "warning" });
            return;

        }


    });


    function cargaNumeroPropiedad() {

        //limpiaCampos();

        let _numProp = readCookie('numero_propiedad');

        if (_numProp != null) {
            $txtNumProp.val(_numProp);

            llenaTablaFotos();

        }
    }


    async function guardarImagen() {

        const api_url = "./data/wsEnviaFoto.php";

        let req = new FormData();
        req.append("uploader_dir", sessionStorage.getItem('URL_API'));
        req.append("num_prop", Number.parseInt($txtNumProp.val()));
        req.append("conse_foto", conse_foto);
        req.append("archivo", $inputImg.prop('files')[0]); // En la posición 0; es decir, el primer elemento

        fetch(api_url, {
            method: 'POST',
            body: req,
        })
            .then(respuesta => respuesta.json())
            .then(decodificado => {

                console.log(decodificado)
                llenaTablaFotos();
            });

    }

    async function llenaTablaFotos() {

        $('#spinner').show();

        let req = new Object();
        req.w = 'apiMcc';
        req.r = 'lista_fotos';
        req.num_prop = Number.parseInt($txtNumProp.val());


        datosTblImgs = new Array();
        $tblImagenes.clear().draw();

        await fetch_postRequest(req,
            function (data) {

                $('#spinner').hide();

                //console.log(data)

                listaImagenes = data.resp.listaFotos;

                for (let i = 0; i < listaImagenes.length; i++) {

                    let imagen = new Object();
                    imagen.conse = listaImagenes[i].conse_foto;
                    imagen.imagen_url = listaImagenes[i].url_foto;

                    datosTblImgs.push(imagen);
                }

                $tblImagenes.rows.add(datosTblImgs).draw();

            });
    }

    cargaNumeroPropiedad();

});