
Te despiertas en medio de un oscuro bosque. El aire es frío y los árboles se extienden sin fin a tu alrededor.
* Seguir el sendero iluminado por la luna -> CAMINO_LUNA
* Adentrarte en el bosque oscuro -> BOSQUE_OSCURO

=== CAMINO_LUNA ===
Sigues el camino iluminado débilmente por la luz de la luna. Al poco tiempo, llegas a una bifurcación.
* Tomar el sendero que lleva hacia una cabaña con una luz tenue -> CABANA
* Tomar el sendero rocoso que sube la colina -> COLINA

=== BOSQUE_OSCURO ===
Te adentras en el bosque, donde las ramas parecen susurrar. Una sombra parpadea a lo lejos.
* Llamar a ver si hay alguien -> VOZ
* Esconderte y esperar en silencio -> OBSERVADOR

=== CABANA ===
Llamas a la puerta. Un anciano la abre y te invita a entrar.
* Aceptar su oferta de quedarte la noche -> FINAL_SEGURO
* Rechazar y seguir caminando -> FINAL_LOBOS

=== COLINA ===
Llegas a la cima y ves todo el bosque bajo la luz de la luna.
De repente, ves una piedra brillante en el suelo.
* Recoger la piedra brillante -> FINAL_PODER
* Dejarla y bajar por la colina -> FINAL_ESCAPE

=== VOZ ===
Una suave voz responde, llamándote a adentrarte más.
La sigues, pero pronto te das cuenta de que no es humana.
* Intentar huir -> FINAL_PERDIDO
* Plantarte y enfrentar lo que sea -> FINAL_ECO

=== OBSERVADOR ===
Una criatura pasa muy cerca de tu escondite, pero no te ve.
Cuando se aleja, logras escapar del bosque.
-> FINAL_LIBERTAD

=== FINAL_SEGURO ===
Te quedas en la cabaña. El anciano comparte historias junto al fuego. Encuentras paz. FIN.
-> DONE

=== FINAL_LOBOS ===
Al alejarte de la cabaña, una manada de lobos te rodea. No sobrevives. FIN.
-> DONE

=== FINAL_PODER ===
Tocas la piedra brillante y sientes un inmenso poder. Pero tu cuerpo se desvanece. FIN.
-> DONE

=== FINAL_ESCAPE ===
Bajas la colina y encuentras un camino que te saca del bosque. Eres libre. FIN.
-> DONE

=== FINAL_PERDIDO ===
Te pierdes siguiendo la voz y nunca más se sabe de ti. FIN.
-> DONE

=== FINAL_ECO ===
La voz ríe. Te has convertido en parte de los susurros del bosque. FIN.
-> DONE

=== FINAL_LIBERTAD ===
Logras salir del bosque al amanecer. Comienza un nuevo día. FIN.
-> DONE
