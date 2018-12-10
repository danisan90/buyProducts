/* a) En una tienda de ropa se cobra con varios medios de pago pero tienen diferencia de recargos, en efectivo se cobra 
el precio normal, con debito un 5%, con credito un 10% y cheque un 20%

b) Para una contestadora telefonica programar las siguientes opciones: 
Mostrar en pantalla 5 botones que muestren en un console log lo siguiente segun la opcion seleccionada: 
Opcion 1. conocer su deudad ->	Respuesta "su deuda es x " 
Opcion 2. comprar nuevos productos ->	Respuesta "sera atendido en instantes" 
Opcion 3. solicitar ayuda ->	Respuesta "todos los operadores se encuentran ocupados" 
Opcion 4. dar la baja ->	Respuesta "opcion invalida, ya vendiste tu alma al diablo Muajajaja LTA" 
Opcion 5. salir ->	Respuesta "gracias por usar nuestro servicio"

c) Se pide que la persona ingrese el monto a financiar y la cantidad de cuotas segun nuestra tabla 
1 cuota 0% 
12 cuotas	20% 
24 cuotas	45% 
36 cuotas	70% 

Como ejemplo si alguien ingresa como monto 1000 le queda a abonar en 
1 cuota	1000 
12 cuotas	100 
24 cuotas	60,41 
36 cuotas	47,22  */


let products = [];

var precios = products.precio;

function showOptions() {
  $("div.login").hide();
  $("div.form-product").show();

}

function createTable () {
  var myTable = $('<table id="tableShopList"></table>');
  var header = "<th>Producto</th><th>Precio</th>";
  myTable.append(header);

  var container = $("div.table-shopList");
  container.append(myTable);
  container.hide();
  render();
}
function limpiarTabla() {
  $(".fila").remove();
}


function addItem () {
  $("div.table-shopList").show();
  
  // agregar mensaje de error
  let inputName = $('.form-product input[name="nombre"]');
  let inputPrice = $('.form-product input[name="precio"]');

  // voy a obtener el valor del input
  let nameProduct = inputName.val();
  let priceProduct = parseInt(inputPrice.val());
  console.log(nameProduct,priceProduct);

  // creo un objeto con la informacion del input
  let newProduct= {
    nombre: nameProduct,
    precio: priceProduct,
  };

  // pusheo el objeto al array vacio
  products.push(newProduct);

  //limpio los ipunt
  inputName.val('');
  inputPrice.val('');

  //agregar validacio
  limpiarTabla();
  render();
  subtotal(precios);
 
}

function subtotal(precios) {
  precios = products.precio;
  let precioTotal = 0
  for(let i = 0; i< products.length; i++){
    var precio = products[i].precio;
   precioTotal = precioTotal + precio;
   
  }

  $('#subtotal').html(precioTotal);
  console.log(precioTotal, "este deberia ser el total");
  return precioTotal;
  
}
function render (productsToShow) {
  if(!productsToShow) {
    productsToShow = products;
  }

  var table = $("#tableShopList");
  for(let i = 0; i< products.length; i++){
    var nombre = products[i].nombre;
    var precio = products[i].precio;

    var tdNombre = "<td>" + nombre + "</td>";
    var tdPrecio = "<td>" + precio + "</td>";
    
    var fila = $('<tr class="fila"></tr>');

    fila.append(tdNombre);
    fila.append(tdPrecio);
    

    table.append(fila)
  }
  
  var fila = $('<tr class="fila"></tr>');
  var tdTotal = "<td>Subtotal</td><td id='subtotal'></td>";
fila.append(tdTotal);
table.append(fila);
}

function precio (medioDePago, precioOriginal) {
    if(medioDePago === 'efectivo'){
        precio = precioOriginal;
        return precio;
    }
    else if (medioDePago === 'debito') {
        precio = (5*precioOriginal)/100 + precioOriginal
        return precio
    }
    else if (medioDePago === 'credito'){
        precio = (10*precioOriginal)/100 + precioOriginal;
        return precio
    }
    else if (medioDePago === 'cheque'){
        precio = (20*precioOriginal)/100 + precioOriginal;
        return precio
    }


}
precio ("efectivo", 100)

createTable();
