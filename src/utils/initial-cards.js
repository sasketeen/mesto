const karachaevsk = new URL("../images/card__img1.jpg", import.meta.url);
const niznov = new URL("../images/card__img2.jpg", import.meta.url);
const spb = new URL("../images/card__img3.jpg", import.meta.url);
const kungur = new URL("../images/card__img4.jpg", import.meta.url);
const manpup = new URL("../images/card__img5.jpg", import.meta.url);
const lenstol = new URL("../images/card__img6.jpg", import.meta.url);

export const initialCards = [
  {
    name: "Карачаевск",
    link: karachaevsk,
  },
  {
    name: "Нижний Новгород",
    link: niznov,
  },
  {
    name: "Санкт-Петербург",
    link: spb,
  },
  {
    name: "Кунгурская ледяная пещера",
    link: kungur,
  },
  {
    name: "Маньпупунёр",
    link: manpup,
  },
  {
    name: "Ленские столбы",
    link: lenstol,
  },
];
