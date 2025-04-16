document.addEventListener("DOMContentLoaded", () => {
  const carrusel = document.getElementById("mas-escuchadas-carrusel");
  const cards = Array.from(carrusel.querySelectorAll(".card"));

  // carga de datos de clicks desde localStorage
  const clickData = JSON.parse(localStorage.getItem("clickData") || "{}");

  // agregar los listeners de clic a cada tarjeta
  cards.forEach(card => {
    const title = card.querySelector(".titulo-item").textContent;
    if (!clickData[title]) clickData[title] = 0;

    card.addEventListener("click", () => {
      clickData[title]++;
      localStorage.setItem("clickData", JSON.stringify(clickData));
      reorganizarCarrusel();
    });
  });

  // messiii ordenar el carrusel basado en los clics
  function reorganizarCarrusel() {
    // Obtenemos el estado de las cartas (el estado inicial)
    const state = cards.map(card => ({
      title: card.querySelector(".titulo-item").textContent,
      element: card,
    }));

    // uwu reordenar las cartas según el número de clics
    const sortedCards = [...cards].sort((a, b) => {
      const aTitle = a.querySelector(".titulo-item").textContent;
      const bTitle = b.querySelector(".titulo-item").textContent;
      return (clickData[bTitle] || 0) - (clickData[aTitle] || 0);
    });

    // aqui se añade un pequeño retraso para la animación
    setTimeout(() => {
      // Reemplazamos las cartas en el carrusel según el nuevo orden
      sortedCards.forEach(card => carrusel.appendChild(card));
    }, 900); // retraso de 300ms para que se vea el cambio

    // Agregar clase de animación
    cards.forEach(card => {
      card.classList.remove("selected");
      setTimeout(() => card.classList.add("selected"), 100);
    });
  }

  // Reorganizar al cargar la página
  reorganizarCarrusel();
});
