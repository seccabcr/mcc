// Constantes Globales
const nf_entero = new Intl.NumberFormat('en'); // Formato entero

const nf_decimal = new Intl.NumberFormat('en', {
  style: "decimal",
  minimumFractionDigits: 2
});


const pattern_entero = /^-?\d*(\.\d+)?$/;
const pattern_numero = /^\d*\.\d+$/;

const lenguaje_data_table = {
  decimal: '.',
  emptyTable: 'No hay información',
  info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
  infoEmpty: 'Mostrando 0 to 0 of 0 registros',
  infoFiltered: '(Filtrado de _MAX_ total registros)',
  infoPostFix: '',
  thousands: ',',
  lengthMenu: 'Mostrar _MENU_ registros',
  loadingRecords: 'Cargando...',
  processing: 'Procesando...',
  search: 'Buscar:',
  zeroRecords: 'Sin resultados encontrados',
  paginate: {
    first: 'Primero',
    last: 'Ultimo',
    next: 'Siguiente',
    previous: 'Anterior'
  }
}


function activaBotonMenu() {

  /**
* Sidebar toggle
*/
  $('.toggle-sidebar-btn').click(function (e) {

    document.querySelector('body').classList.toggle('toggle-sidebar');
  });


}


/*--
Funcion para agregar el header 
--*/
function addHeader() {

  $('#header').load('./templates/header.html');

}



/*--
Funcion para agregar el menú de ventas
--*/
function addMenu() {

  $('#sidebar-nav').load('./templates/sidebar.html');
}




// Obtiene el idUsuario en sessionStorage
function getDatosSessionUsu() {

  let usuario = [];
  usuario.idUsu = sessionStorage.getItem('ID_USUARIO');
  usuario.nomUsu = sessionStorage.getItem('NOM_USUARIO');
  usuario.tipoUsu = sessionStorage.getItem('TIPO_USUARIO');
  usuario.titUsu = sessionStorage.getItem('TIT_USUARIO');

  return usuario;
}

/*** Carga los datos del usuario en el Header de la pagina */

function cargaDatosUsuario() {

  let usuSession = getDatosSessionUsu();

  $('#nomUsuDrop span').text(usuSession.idUsu);
  $('#mnUsuario h6').text(usuSession.nomUsu);
  $('#mnUsuario span').text(usuSession.titUsu);
}

/** Funcion para verificar inicio de sesion del usuario */
function checkInicioSesion() {

  if (!sessionStorage.getItem("ID_USUARIO")) {

    window.location.href = './login.html';
  }
}

/** Funcion para obtener la fecha actual */
function obtieneFechaActual() {

  let fecha = new Date();
  let dia = fecha.getDate() > 9 ? fecha.getDate() : '0' + fecha.getDate();
  let mes = (fecha.getMonth + 1) > 9 ? fecha.getMonth() + 1 : '0' + (fecha.getMonth() + 1);
  let anio = fecha.getFullYear();


  var fechaInput = anio + "-" + mes + "-" + dia;

  return fechaInput;
}

function obtenerHoraActual() {
  let myDate = new Date();
  let hours = myDate.getHours();
  let minutes = myDate.getMinutes();
  let seconds = myDate.getSeconds();
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  let horaActual = hours + ":" + minutes + ":" + seconds;
  return horaActual;

}



/**********************************************/
/* Function para hacer request POST           */
/* Req request data, func success, func error */
/**********************************************/
function api_postRequest(req, success, error, timeout = 8000, times = 0) {
  //crLibreApi_debug("Making a post request to " + api_url);
  /*generate the form*/
  var _data = new FormData();
  for (var key in req) {
    var value = req[key];
    //crLibreApi_debug("Adding " + key + " -> " + value);
    _data.append(key, value);
  }

  const api_url = sessionStorage.getItem('URL_API') + 'api.php';

  var oReq = new XMLHttpRequest();
  oReq.open("POST", api_url, true);
  oReq.timeout = timeout;
  oReq.onload = function (oEvent) {
    if (oReq.status == 200) {
      var r = oReq.responseText;
      //console.log(r);
      r = JSON.parse(r);
      success(r);
      //crLibreApi_debug("Done!");
    } else {
      var r = oReq.responseText;
      //crLibreApi_debug("There was an error");
      error(r);
    }
  };
  oReq.ontimeout = function (e) {

    Swal.fire({ title: "Agotado el tiempo de espera con el servidor", icon: "error" });
  }
  oReq.send(_data);
}





/**********************************************/
/* Function para hacer request POST con Fetch */
/* Req request data, func success, func error */
/**********************************************/
async function fetch_postRequest(req, success) {

  const api_url = sessionStorage.getItem('URL_API') + 'api.php';

  await fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(req), // data can be `string` or {object}!
    //body: _data,
    headers: {
      'Content-Type': 'application/json'    
    }
  })
    .then(response => {
      if (response.ok)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      //console.log(data);
      let r = JSON.parse(data);
      success(r);
    })
    .catch(error => {
      //console.log(error);
      Swal.fire({ title: "Error de Conexión\n" + error, icon: "error" });
    });
}


async function fetch_request(req) {

  let api_url = sessionStorage.getItem('URL_API') + 'api.php';


  const request = await fetch(api_url,
    {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
      }
    });

  const response = await request.json();

  return response;


}




// Funcion para redirigir a otra pagina
function iGoTo(goTo) {
  $("body").hide();
  window.location.href = goTo;
}

/** Funcion para cerrar sesion del Usuario */
function cerrarSession() {

  sessionStorage.removeItem('ID_USUARIO');
  sessionStorage.removeItem('NOM_USUARIO');
  sessionStorage.removeItem('TIPO_USUARIO');
  sessionStorage.removeItem('TIT_USUARIO');
  sessionStorage.removeItem('URL_API');


  iGoTo('./login.html');

}




function accesoAdmGen(_pagina) {

  let tipoUsuario = sessionStorage.getItem('TIPO_USUARIO');

  if (tipoUsuario < 2) {
    Swal.fire({ title: "Usuario NO tiene acceso autorizado a esta opción", icon: "info" });
    return;
  }

  iGoTo(_pagina);

}

async function llenaComboTipoPropiedad() {

  let req = new Object();
  req.w = 'apiMcc';
  req.r = 'lista_tipos_prop';


  $('#cbTipoProp').empty();
  $('#cbTipoProp').append($("<option>", {
    value: '0',
    text: 'Seleccione una opcion'
  }));

  await fetch_postRequest(req,
    function (data) {

      //console.log(data)

      if (data.resp != null) {
        let tipos = data.resp.tiposProp;
        for (item in tipos) {

          let codTipo = tipos[item]['cod_tipo_prop'];
          let nomTipo = tipos[item]['nom_tipo_prop'];

          $('#cbTipoProp').append($("<option>", {
            value: codTipo,
            text: nomTipo
          }));
        }
      }
    });
}


async function llenaComboProvincias() {

  let req = new Object();
  req.w = 'apiSeccab';
  req.r = 'llena_provincias';

  $('#cbProvincias').empty();
  $('#spinnerProv').show();


  await fetch_postRequest(req,
    function (data) {
      $('#spinnerProv').hide();

      if (data.resp != null) {
        let provincias = data.resp.provincias;

        for (item in provincias) {

          let _codProv = provincias[item]['idProvincia'];
          let _nomProv = provincias[item]['nomProvincia'];

          $('#cbProvincias').append($("<option>", {
            value: _codProv,
            text: _nomProv
          }));
        }

      }

    });

}



async function llenaComboCantones() {

  let req = new Object();
  req.w = 'apiMcc';
  req.r = 'llena_cantones';
  req.idProvincia =  $('#cbProvincias').val();

  $('#cbCantones').empty();
  $('#spinnerCant').show();


  await fetch_postRequest(req,
    function (data) {
      $('#spinnerCant').hide();


      if (data.resp != null) {
        let cantones = data.resp.cantones;

        for (item in cantones) {

          let _codCanton = cantones[item]['idCanton'];
          let _nomCanton = cantones[item]['nomCanton'];

          $('#cbCantones').append($("<option>", {
            value: _codCanton,
            text: _nomCanton
          }));
        }

      }

    });

}

async function llenaComboDistritos() {

  let req = new Object();
  req.w = 'apiMcc';
  req.r = 'llena_distritos';
  req.idProvincia =  $('#cbProvincias').val();
  req.idCanton =$('#cbCantones').val();

  $('#cbDistritos').empty();
  $('#spinnerDist').show();


  await fetch_postRequest(req,
    function (data) {
      $('#spinnerDist').hide();


      if (data.resp != null) {
        let distritos = data.resp.distritos;

        for (item in distritos) {

          let _codDistrito = distritos[item]['idDistrito'];
          let _nomDistrito = distritos[item]['nomDistrito'];

          $('#cbDistritos').append($("<option>", {
            value: _codDistrito,
            text: _nomDistrito
          }));
        }

      }

    });

}

function readCookie(name) {

  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}


function validarEmail(email){
                
	// Get our input reference.
	//var emailField = document.getElementById('user-email');
	
	// Define our regular expression.
	var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

	// Using test we can check if the text match the pattern
	if( validEmail.test(email) ){
		//alert('Email is valid, continue with form submission');
		return true;
	}else{
		//alert('Email is invalid, skip form submission');
		return false;
	}
} 




