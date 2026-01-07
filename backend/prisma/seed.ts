import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({
        data: [
            // Platos
            {
                name: "Lomo al verdeo con papas o batatas",
                description: "Lomo tierno en salsa de verdeo, acompañado con papas o batatas.",
                price: 4500,
                image: "/public/img/salado/lomo-verdeo.jpg",
                category: "platos"
            },
            {
                name: "Lomo al champiñon con papas o batatas",
                description: "Lomo tierno en salsa de champiñones, acompañado con papas o batatas.",
                price: 4500,
                image: "/public/img/salado/lomo-champi.jpg",
                category: "platos"
            },
            {
                name: "Arroz con pollo",
                description: "Arroz amarillo con pollo tierno y verduras salteadas, cocinado al estilo tradicional.",
                price: 4500,
                image: "/public/img/salado/arroz-con-pollo.jpg",
                category: "platos"
            },
            {
                name: "Pastel de papa",
                description: "Clásico pastel de papa como el de casa, con carne jugosa y puré dorado al horno.",
                price: 4500,
                image: "/public/img/salado/pastel-de-papa.jpg",
                category: "platos"
            },
            {
                name: "Pastel de pollo con calabaza",
                description: "Pastel de pollo jugoso con cremoso puré de calabaza, gratinado al horno hasta dorar.",
                price: 4500,
                image: "/public/img/salado/pastel-de-pollo-y-zapallo.jpg",
                category: "platos"
            },
            {
                name: "Milanesa con Puré",
                description: "Milanesa crocante acompañada con puré de papas casero, cremoso y suave.",
                price: 4500,
                image: "/public/img/salado/milanesa-pure.jpg",
                category: "platos"
            },
            {
                name: "Napolitana con papas y batatas",
                description: "Milanesa napolitana casera con salsa y queso gratinado, acompañada de papas y batatas.",
                price: 4500,
                image: "/public/img/salado/napolitana.jpg",
                category: "platos"
            },
            {
                name: "Fideos con estofado de carne",
                description: "Fideos caseros con estofado de carne tierno y bien condimentado.",
                price: 4500,
                image: "/public/img/salado/fideos-estofado-carne.jpg",
                category: "platos"
            },
            {
                name: "Fideos con estofado de pollo",
                description: "Fideos caseros con estofado de pollo.",
                price: 4500,
                image: "/public/img/salado/fideos-estofado-pollo.jpg",
                category: "platos"
            },
            {
                name: "Ravioles con salsa boloñesa",
                description: "Ravioles rellenos con salsa boloñesa casera.",
                price: 4500,
                image: "/public/img/salado/ravioles-boloniesa.jpeg",
                category: "platos"
            },
            {
                name: "Lasaña",
                description: "Lasaña casera con capas de pasta fresca, carne, salsa de tomate y mucho queso gratinado.",
                price: 4500,
                image: "/public/img/salado/lasagna.jpg",
                category: "platos"
            },
            {
                name: "Canelones",
                description: "Canelones caseros, con relleno a elección: carne, pollo, espinaca y ricota o jamón y queso. Se sirven gratinados con salsa y abundante queso.",
                price: 4500,
                image: "/public/img/salado/canelones.jpg",
                category: "platos"
            },
            {
                name: "Salteado de vegetales",
                description: "Mix de vegetales frescos salteados al wok con aceite de oliva y condimentos, liviano y lleno de sabor.",
                price: 4500,
                image: "/public/img/salado/salteado-vegetales.jpg",
                category: "platos"
            },
            {
                name: "Pollo al curry con verduras glaseadas",
                description: "Pollo al curry con verduras glaseadas.",
                price: 4500,
                image: "/public/img/salado/pollo-curry.jpg",
                category: "platos"
            },
            {
                name: "Guiso de lentejas",
                description: "Lentejas cocidas a fuego lento con carne suave, chorizo, papas, zanahoria y especias de la casa.",
                price: 4500,
                image: "/public/img/salado/guiso-lentejas.jpg",
                category: "platos"
            },
            {
                name: "Locro",
                description: "Locro criollo casero, con maíz, zapallo, porotos y cortes de carne cocidos a fuego lento.",
                price: 4500,
                image: "/public/img/salado/locro.jpg",
                category: "platos"
            },
            {
                name: "Ensalada César",
                description: "Clásica ensalada César con lechuga fresca, pollo grillado, croutones crocantes y queso rallado, acompañada con aderezo César.",
                price: 4500,
                image: "/public/img/salado/ensalada-cesar.jpg",
                category: "platos"
            },
            {
                name: "Ensalada a elección",
                description: "Ensalada armada a tu gusto. Elegí los ingredientes y el aderezo en la observación del pedido.",
                price: 4500,
                image: "/public/img/salado/ensalada-eleccion.jpg",
                category: "platos"
            },

            // Empanadas
            {
                name: "Empanada de carne",
                description: "Empanada casera rellena con carne picada, cebolla y condimentos tradicionales.",
                price: 1200,
                image: "/public/img/salado/empanada-carne.jpg",
                category: "empanadas"
            },
            {
                name: "Empanada de pollo",
                description: "Empanada casera de pollo desmenuzado, con cebolla, morrón y condimentos suaves.",
                price: 1200,
                image: "/public/img/salado/empanada-de-pollo.jpg",
                category: "empanadas"
            },
            {
                name: "Empanada de jamón y queso",
                description: "Empanada rellena con jamón y queso fundido, con masa casera dorada al horno.",
                price: 1200,
                image: "/public/img/salado/empanada-jyq.jpg",
                category: "empanadas"
            },
            {
                name: "Empanada de humita",
                description: "Empanada rellena con cremoso maíz dulce y salsa blanca.",
                price: 1200,
                image: "/public/img/salado/empanada-humita.jpg",
                category: "empanadas"
            },
            {
                name: "Empanada de verdura",
                description: "Empanada de verdura con una mezcla fresca de verduras salteadas.",
                price: 1200,
                image: "/public/img/vegano/empanada-verdura-vegana.jpg",
                category: "empanadas"
            },

            // Pizza
            {
                name: "Pizza muzzarella",
                description: "Clásica pizza con salsa de tomate, generosa muzzarella fundida y masa casera.",
                price: 5000,
                image: "/public/img/salado/pizza-mozzarella.jpg",
                category: "pizza"
            },
            {
                name: "Pizza jamón y morrón",
                description: "pizza con salsa de tomate, jamón, morrones frescos y muzzarella fundida sobre masa casera, horneada hasta quedar dorada y crocante.",
                price: 5000,
                image: "/public/img/salado/pizza-jamon-morron.jpg",
                category: "pizza"
            },
            {
                name: "Fugazzeta",
                description: "Clásica pizza argentina con abundante cebolla caramelizada, muzzarella fundida y masa casera bien esponjosa y dorada.",
                price: 5000,
                image: "/public/img/salado/fugazzeta.jpg",
                category: "pizza"
            },
            {
                name: "Fugazzeta rellena de jamón y queso",
                description: "Deliciosa fugazzeta con cebolla caramelizada, rellena de jamón y queso fundido.",
                price: 5000,
                image: "/public/img/salado/fugazzeta-jyq.jpg",
                category: "pizza"
            },
            {
                name: "Fainá",
                description: "Fainá de harina de garbanzo, dorada y crocante por fuera, suave por dentro. Ideal para acompañar tu pizza o disfrutar sola.",
                price: 5000,
                image: "/public/img/salado/faina.jpg",
                category: "pizza"
            },
            {
                name: "Fainá con verdeo",
                description: "Clásica fainá de harina de garbanzo, suave y dorada, coronada con fresco verdeo salteado.",
                price: 5000,
                image: "/public/img/salado/faina-verdeo.jpg",
                category: "pizza"
            },

            // Tartas
            {
                name: "Tarta de jamón y queso (Grande)",
                description: "Tarta casera rellena de jamón y queso.",
                price: 5000,
                image: "/public/img/salado/tarta-jyq.jpg",
                category: "tartas"
            },
            {
                name: "Tarta tricolor (Grande)",
                description: "Tarta casera rellena con tres sabores clásicos: calabaza, ricota y espinaca o acelga.",
                price: 5000,
                image: "/public/img/salado/tarta-tricolor.jpg",
                category: "tartas"
            },
            {
                name: "Tarta de verdura (Grande)",
                description: "Tarta casera rellena con tomate, espinaca, morrón y queso.",
                price: 5000,
                image: "/public/img/salado/tarta-verdura.jpg",
                category: "tartas"
            },
            {
                name: "Tarta de jamón y queso (Individual)",
                description: "Porción individual de tarta casera rellena de jamón y queso.",
                price: 5000,
                image: "/public/img/salado/tarta-jyq.jpg",
                category: "tartas"
            },
            {
                name: "Tarta tricolor (Individual)",
                description: "Porción individual de tarta casera rellena con tres sabores clásicos: calabaza, ricota y espinaca o acelga.",
                price: 5000,
                image: "/public/img/salado/tarta-tricolor.jpg",
                category: "tartas"
            },
            {
                name: "Tarta de verdura (Individual)",
                description: "Porción individual de tarta casera rellena con tomate, espinaca, morrón y queso.",
                price: 5000,
                image: "/public/img/salado/tarta-verdura.jpg",
                category: "tartas"
            },

            // Pan
            {
                name: "Pan de campo casero",
                description: "Pan artesanal de masa tradicional, con corteza crocante y miga suave y aireada. Ideal para acompañar cualquier comida casera o para disfrutar solo.",
                price: 5000,
                image: "/public/img/salado/pan-casero-campo.jpg",
                category: "pan"
            },
            {
                name: "Pan integral casero",
                description: "Pan suave y esponjoso, elaborado con harina integral.",
                price: 5000,
                image: "/public/img/salado/pan-integral.jpg",
                category: "pan"
            },
            {
                name: "Pan relleno de jamón y queso",
                description: "Pan artesanal suave, relleno con jamón de calidad y queso fundido.",
                price: 5000,
                image: "/public/img/salado/pan-relleno-jyq.jpg",
                category: "pan"
            },

            // Pastelería
            {
                name: "Budín de limón",
                description: "Budín casero de limón, húmedo y esponjoso, bañado con un glaseado de limón suave y brillante.",
                price: 5000,
                image: "/public/img/dulce/budin-limon.jpeg",
                category: "pasteleria"
            },
            {
                name: "Budín de banana y nuez",
                description: "Esponjoso budín casero con sabor natural a banana y trozos crocantes de nuez, ideal para acompañar tu café o merienda.",
                price: 5000,
                image: "/public/img/dulce/budin-banana-nuez.jpg",
                category: "pasteleria"
            },
            {
                name: "Budín de chocolate",
                description: "Delicioso budín casero, suave y húmedo, con intenso sabor a chocolate.",
                price: 5000,
                image: "/public/img/dulce/budinChocolate.jpg",
                category: "pasteleria"
            },
            {
                name: "Budin de banana, zanahoria y nuez",
                description: "Delicioso y nutritivo budín casero que combina la dulzura de la banana, la suavidad de la zanahoria y el toque crocante de las nueces.",
                price: 5000,
                image: "/public/img/dulce/budin-banana-zanahoria-nuez.jpg",
                category: "pasteleria"
            },
            {
                name: "Budin Navideño",
                description: "Tradicional budín casero, lleno de frutas secas, especias y un toque de aroma navideño. Perfecto para compartir en fechas especiales y disfrutar con familia y amigos.",
                price: 5000,
                image: "/public/img/dulce/budin-navideño.jpg",
                category: "pasteleria"
            },
            {
                name: "Pastafrola",
                description: "Clásica tarta casera de masa dulce y crocante, rellena con dulce de membrillo o batata. Perfecta para acompañar el mate o el café.",
                price: 5000,
                image: "/public/img/dulce/pastafrola-membrillo.jpg",
                category: "pasteleria"
            },
            {
                name: "Tarta de ricota y dulce de leche",
                description: "Masa casera rellena con ricota y dulce de leche. Un postre casero y delicioso para cualquier ocasión.",
                price: 5000,
                image: "/public/img/dulce/tarta-ricota-dulce_de_leche.jpg",
                category: "pasteleria"
            },
            {
                name: "Rosca de pascua",
                description: "Tradicional rosca casera, suave y esponjosa con crema pastelera, y decorada con cerezas glaseadas.",
                price: 5000,
                image: "/public/img/dulce/rosca-pascua.jpg",
                category: "pasteleria"
            },
            {
                name: "Pan dulce con frutos secos",
                description: "Clásico pan dulce casero y esponjoso con frutos secos.",
                price: 5000,
                image: "/public/img/dulce/pan-dulce-frutos-secos.jpg",
                category: "pasteleria"
            },
            {
                name: "Pan dulce con chips de chocolate",
                description: "Delicioso pan dulce casero, esponjoso y lleno de chips de chocolate, bañado con una capa irresistible de chocolate.",
                price: 5000,
                image: "/public/img/dulce/pan-dulce-chocolate.jpg",
                category: "pasteleria"
            },

            // Vegano
            {
                name: "Milanesa de berenjena con puré",
                description: "Crujiente milanesa de berenjena acompañada de un cremoso puré casero de papas.",
                price: 1200,
                image: "/public/img/vegano/milanesa-berenjena-pure.jpeg",
                category: "vegano"
            },
            {
                name: "Salteado de vegetales",
                description: "Mix de vegetales frescos salteados al wok con aceite de oliva y condimentos, liviano y lleno de sabor.",
                price: 4500,
                image: "/public/img/salado/salteado-vegetales.jpg",
                category: "vegano"
            },
            {
                name: "Empanada de verdura",
                description: "Empanada de verdura con una mezcla fresca de verduras salteadas.",
                price: 1200,
                image: "/public/img/vegano/empanada-verdura-vegana.jpg",
                category: "vegano"
            },
            {
                name: "Hamburguesa vegana",
                description: "Hamburguesa vegana casera con papas fritas, pan artesanal y vegetales frescos. Medallón a elección: Garbanzos, Lentejas, Soja, etc (aclarar en la observación).",
                price: 1200,
                image: "/public/img/vegano/hamburguesa-vegana.jpg",
                category: "vegano"
            },
            {
                name: "Pizza vegana con champiñones",
                description: "Deliciosa pizza con masa casera, salsa de tomate natural y champiñones frescos, acompañada de queso vegano fundido.",
                price: 1200,
                image: "/public/img/vegano/pizza-vegana-champinones.jpg",
                category: "vegano"
            },
            {
                name: "Guiso de lentejas vegano",
                description: "Reconfortante guiso casero hecho con lentejas, verduras frescas y especias naturales, 100% libre de ingredientes animales.",
                price: 1200,
                image: "/public/img/vegano/guiso-lentejas-vegano.jpg",
                category: "vegano"
            },
            {
                name: "Budín de limón",
                description: "Budín casero de limón, húmedo y esponjoso, bañado con un glaseado de limón suave y brillante.",
                price: 5000,
                image: "/public/img/dulce/budin-limon.jpeg",
                category: "vegano"
            },
            {
                name: "Budín de banana y nuez",
                description: "Esponjoso budín casero con sabor natural a banana y trozos crocantes de nuez, ideal para acompañar tu café o merienda.",
                price: 5000,
                image: "/public/img/dulce/budin-banana-nuez.jpg",
                category: "vegano"
            },
            {
                name: "Budin de banana, zanahoria y nuez",
                description: "Delicioso y nutritivo budín casero que combina la dulzura de la banana, la suavidad de la zanahoria y el toque crocante de las nueces.",
                price: 5000,
                image: "/public/img/dulce/budin-banana-zanahoria-nuez.jpg",
                category: "vegano"
            },
            {
                name: "Pan de campo casero",
                description: "Pan artesanal de masa tradicional, con corteza crocante y miga suave y aireada. Ideal para acompañar cualquier comida casera o para disfrutar solo.",
                price: 5000,
                image: "/public/img/salado/pan-casero-campo.jpg",
                category: "vegano"
            },
            {
                name: "Pan integral casero",
                description: "Pan suave y esponjoso, elaborado con harina integral.",
                price: 5000,
                image: "/public/img/salado/pan-integral.jpg",
                category: "vegano"
            }
        ],
    });

    console.log("Productos cargados ✔️");
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
