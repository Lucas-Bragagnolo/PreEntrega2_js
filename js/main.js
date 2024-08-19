class Producto {
    constructor(id, nombre, precio, marca, imagen, peso, stock) {
        this.id= id;
        this.nombre = nombre;
        this.precio = precio;
        this.marca = marca;
        this.imagen = imagen;
        this.peso = peso;
        this.stock = stock;
    }
    ingresarMercaderia(cantidad) {
        this.stock += cantidad;
    }
    mostrarInfo() {
        return `ID: ${this.id} | ${this.nombre} | ${this.marca} | $${this.precio} | Stock: ${this.stock}`;
    }

    retirarMercaderia(cantidad) {
        if (cantidad > this.stock) {
            alert(`No hay suficiente stock. Stock disponible: ${this.stock}`);
            return false;
        }
        this.stock -= cantidad;
        return true;
    }

}

const producto_1 = new Producto(1, "Lata Tomate Perita", 940, "Molto", "producto_1.jpg", "500g", 10);
const producto_2 = new Producto(2, "Puré Tomate", 850, "Molto", "producto_2.jpg", "530g", 10);
const producto_3 = new Producto(3, "Yerba mate sin palo", 3500, "Rosamonte", "producto_3.jpg", "1kg", 10);
const producto_4 = new Producto(4, "Coca Cola Original", 2800, "Cocacola", "producto_4.jpg", "2.25 lts", 10);
const producto_5 = new Producto(5, "Coca Cola Zero", 2800, "Cocacola", "producto_5.jpg", "2.25 lts", 10);

const productos=[producto_1,producto_2,producto_3,producto_4,producto_5];
let pinGuardado = "2802";
let ingresar=false;
let saldo = 10000;
const carrito=[];

alert("Bienvenido a la tienda, administrá tus productos!");

function recargar(valor) {
    saldo= saldo + valor;
}

function obtenerDatoValido(mensaje, tipo) {
    let valor;
    while (true) {
        valor = prompt(mensaje);
        if (tipo === 'number' && !isNaN(valor) && valor.trim() !== '') {
            return parseFloat(valor); // Para que sea un número y no un string
        } else if (tipo === 'string' && valor.trim() !== '') {
            return valor; // para que sea un string y no un numero
        } else {
            alert(`Por favor ingresa un valor válido para ${mensaje.toLowerCase()}.`);
        }
    }
}

function obtenerProximoId() {
    if (productos.length === 0) return 1; // Si no hay productos, el primer ID será 1
    let ids = productos.map(p => p.id);
    let maxId = Math.max(...ids);
    return maxId + 1;
}

function mostrarListaDeProductos() {
    let listaProductos = "Lista de productos disponibles:\n\n";
    productos.forEach(producto => {
        listaProductos += producto.mostrarInfo() + "\n";
    });
    alert(listaProductos);
}

function ingresarMercaderia() {
    
    mostrarListaDeProductos();
    let idProducto = obtenerDatoValido( "Ingresá el ID del producto al que deseas agregar mercadería", "number");
    let producto = productos.find(p => p.id === idProducto);

    if (producto) {
        let cantidad = obtenerDatoValido(`Ingresá la cantidad de ${producto.nombre} a agregar`, "number");
        producto.ingresarMercaderia(cantidad);
        alert(`Se han agregado ${cantidad} unidades al stock del ${producto.nombre}. Nuevo stock: ${producto.stock}`);
    } else {
        alert("El ID ingresado no corresponde a ningún producto existente.");
    }
}


function retirarMercaderia() {
    mostrarListaDeProductos(); // Muestra la lista antes de pedir el ID

    let idProducto = obtenerDatoValido("Ingresá el ID del producto del que deseas retirar mercadería", "number");
    let producto = productos.find(p => p.id === idProducto);

    if (producto) {
        let cantidad = obtenerDatoValido(`Ingresá la cantidad de ${producto.nombre} a retirar`, "number");
        let exito = producto.retirarMercaderia(cantidad);
        if (exito) {
            alert(`Se han retirado ${cantidad} unidades del stock del ${producto.nombre}. Stock restante: ${producto.stock}`);
        }
    } else {
        alert("El ID ingresado no corresponde a ningún producto existente.");
    }
}

function agregarProducto() {
    let nuevoProducto = new Producto(
        obtenerProximoId(), // ID automáticamente asignado
        obtenerDatoValido("Ingresá el nombre del producto", "string"),
        obtenerDatoValido("Ingresá el precio del producto", "number"),
        obtenerDatoValido("Ingresá la marca del producto", "string"),
        obtenerDatoValido("Ingresá la imagen del producto", "string"),
        obtenerDatoValido("Ingresá el peso del producto en Gramos", "number"),
        obtenerDatoValido("Ingresá el stock inicial del producto", "number")
    );

    productos.push(nuevoProducto);
    alert("¡Producto agregado con éxito! ID del producto: " + nuevoProducto.id);
}
//INICIO DEL PROGRAMA
for(let i = 3; i >= 1; i = i - 1) {
    let pinIngreso = prompt("Ingresá el PIN! Tienes "+ i +" intentos restantes"); 
    let validarIngreso = pinGuardado === pinIngreso;
    if(validarIngreso) {
        alert("Ingreso con exito")
        ingresar = true;  
        break;              
    } else {
        alert("Error PIN Incorrecto! PIN 2802");
    }
}

if(ingresar) {
    let opcion = prompt (
        "Elegí una opcion: \n1- Agregar Producto \n2- Ver todo el catálogo de Productos \n3- Ingresar stock \n4- Retirar stock \nPresioná X para salir"
    );
    while(opcion != "x") {
        switch (opcion) {
            case "1":
                // agrego un nuevo producto con validaciones de cada ingreso de datos 
                agregarProducto();

                break;
            case "2":
                //muestro por alert el nombre precio y stock de cada Producto en un solo alert
                let listaProductos = [];
                for (const producto of productos) {
                    listaProductos.push(producto.id+" | " + producto.nombre + " | $" + producto.precio + ".00" + " | Stock: " + producto.stock + "\n");
                }
                alert(listaProductos.join(""));
                break;
            case "3":
                //ingreso de mercadería seleccionando por id el producto y la cantidad a ingresar
                ingresarMercaderia();
                break;
            case "4":
                retirarMercaderia();
                break;    
            default:
                alert("Opcion incorrecta");
        }
        opcion = prompt (
        "Elegí una opcion: \n1- Agregar Producto \n2- Ver todo el catálogo de Productos \n3- Ingresar Mercadería \n4- Retirar mercadería \nPresioná X para salir"
        );
    }
            
} else {
    alert("Se te acabaron los intentos");
}









