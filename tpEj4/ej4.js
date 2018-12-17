let userName = "";

let products = [];

var precios = products.precio;

const RECARGO_1_CUOTA = 1;
const RECARGO_12_CUOTA = 1.20;
const RECARGO_24_CUOTA = 1.45;
const RECARGO_36_CUOTA = 1.70;


/* creating tables
 */
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

/* buttons actions
 */

  $(".field .button").click(function () {
    $("div.login").hide();
    $("div.buttons-options").show();

    userName = $('.field input').val()
  })
 
function showBuyProcess () {
  $("div.form-product").show();
  $("div.loader").hide();
}
function loanding(){
  $("div.loader").show();
  let messageLoading = (`<div class="message-loanding' id="load"><span id ="message-loa"> En instantes sera atendido</span></div>`)
  $("div.loading").append(messageLoading)

  setTimeout(function showBuyProcess () {
    $("div.form-product").show();
    $("div.box").hide();
    $("div.loading").hide();
  }, 2000)

}
function addItem () {
  
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
 
  if (nameProduct && priceProduct) {
    $("div.table-shopList").show();
    $("a#button_debt").removeAttr("title").removeAttr("disabled")
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
}
/* calcular subtotal
 */
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
/* calcular precio final con medio de pago
 */
function formaDePago() {
  $("div.seleccionar-pago").show();
  $("div.finalPrice").show();
    /*   mensaje de precio final */
 
}

function precio (medioDePago) { 
  /* let theBox = $("div.finalPrice"); */
  let precioOriginal = subtotal();
  
    if(medioDePago === 'efectivo'){
        precioProducto = precioOriginal;
        console.log(precioProducto)
        let precioFinal = $(`<article class="media"><div class="media-content"><div class="content"><p>
        <strong>Precio Final ${precioProducto}</strong></p></div></div></article>`); 
        $('.box').html(precioFinal);
        
    }
    else if (medioDePago === 'debito') {
        precioProducto = (5*precioOriginal)/100 + precioOriginal
        console.log(precioProducto)
        let precioFinal = $(`<article class="media"><div class="media-content"><div class="content"><p>
        <strong>Precio Final ${precioProducto}</strong></p></div></div></article>`); 
        $('.box').html(precioFinal);
    }
    else if (medioDePago === 'credito'){
        precioProducto = (10*precioOriginal)/100 + precioOriginal;
        let recargoPayable = cuotas();
        console.log(recargoPayable)
        let finalPrice = precioProducto * recargoPayable
        console.log(finalPrice,125)
        /* $('.box').append(finalPrice); */
        
    }
    else if (medioDePago === 'cheque'){
        precioProducto = (20*precioOriginal)/100 + precioOriginal;
        console.log(precioProducto)
        let precioFinal = $(`<article class="media"><div class="media-content"><div class="content"><p>
        <strong>Precio Final ${precioProducto}</strong></p></div></div></article>`); 
        $('.box').html(precioFinal);
    }
  }
  
  function cuotas () {
      let cuotas = $(`<article class="media"><div class="media-content"><div class="content cuotas"><p>
      <strong>Elegir cuotas <select name="cuotas" id="cuotas">
      <option value="1">1</option>
      <option value="12">12</option>
      <option value="24">24</option>
      <option value="36">36</option>
      </select></strong></p></div></div></article>`); 
      $('.box').html(cuotas);
      let  payable = $("#cuotas").val()

      if (payable === '1') recargoPayable = RECARGO_1_CUOTA;
      if (payable === '12') recargoPayable = RECARGO_12_CUOTA;
      if (payable === '24') recargoPayable = RECARGO_24_CUOTA;
      if (payable === '36') recargoPayable = RECARGO_36_CUOTA;
      console.log(`el recargo es ${recargoPayable}`)

      return recargoPayable;
    }



createTable();