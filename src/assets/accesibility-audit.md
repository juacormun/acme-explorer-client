# Auditoría de accesibilidad para acme-explorer

## Página de listado

**Calificación obtenida: 95**

**Correcciones necesarias**

Resultado de Lighthouse:

- (Error) Contraste bajo en elementos textuales.
- (Error) Ausencia de la propiedad alternativa para el logo de la página.
- (Recomendación) Existen varios puntos donde mejorar la navegación.

Resultados de AXE:

- (Error) Los elementos deben tener un color de contraste suficiente.
- (Error) El elemento <object> debe tener un texto alternativo.

**Soluciones**

Contraste bajo

Este error es fácilmente corregible ya que se debe a los links que se encuentran en el footer. Bastaría con usar un color con un mayor contraste para todos los links de la aplicación. Sustituiríamos el color principal de la aplicación, #008a83, por #161086, el cual obtiene un 14.46 de puntuación de contraste.

También ocurre un problema en las ocasiones en las que se resalta la tarjeta de una trip, ya que la fecha aparece en un color con muy bajo contraste respecto al fondo. Cambiaríamos el color #008a83 de nuevo por #161086.

Texto alternativo

Simplemente se debe añadir al logo de la página el atributo "alt" con valor "Logo de acme-explorer".
